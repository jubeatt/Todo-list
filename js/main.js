import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

const app = new Vue({
  el: '#app',
  data: {
    tasks: [
      {
        id: createRandomNum(),
        name: 'Call the dentist',
        completed: false,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'Schedule a dinner with Peter',
        completed: false,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'Call the vet',
        completed: false,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'Kate\'s birthday present',
        completed: false,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'Zero inbox',
        completed: true,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'No alcohol today',
        completed: true,
        editBoard: false
      },
      {
        id: createRandomNum(),
        name: 'Check-in to flight',
        completed: true,
        editBoard: false
      },
    ],
    // 導覽菜單按鈕
    menuBtns: [
      {name: 'allTasks', iconClass: 'fas fa-list', active: true},
      {name: 'completedTasks', iconClass: 'far fa-calendar-check', active: false}
    ],
    // 暫存原始的任務內容
    oldTaskTemp: null,
    // 暫存新的任務內容
    newTaskTemp: null,
    // 編輯模式狀態
    isEditMode: false,
    // 添加新任務視窗開關
    isModalOn: false,
    // 警告訊息開關
    showWarning: false,
    // 警告訊息開關（視窗）
    modalShowWarning: false,
  },
  methods: {
    addTask: function() {
      // 如果有輸入內容才會添加新任務
      if(this.newTaskTemp) {
        // 把新任務加到任務列表中
        this.tasks.splice(0, 0, {
          id: createRandomNum(),
          name: this.newTaskTemp,
          completed: false,
          editBoard: false
        })
        // 把資料的內容初始化
        this.newTaskTemp = null
        // 關閉提示訊息（初始化）
        this.modalShowWarning = false
        // 關閉輸入視窗
        this.isModalOn = false
      } else {
        // 顯示提示訊息
        this.modalShowWarning = true
      }
    },
    removeTask: function (id) {
      // 不處於編輯模式時，才會執行
      if(!this.isEditMode) {
         // 根據 id 到任務列中尋找對應的索引值
        const index = this.tasks.findIndex((item) => item.id === id)
        // 如果有找到才會把任務給刪除
        if(index != -1) this.tasks.splice(index, 1)
      }
      
    },
    editTask: function(index) {
      // 不處於編輯模式時，才會執行
      if(!this.isEditMode) {
        // 進入編輯模式
        this.isEditMode = true
        // 儲存原本的任務名稱
        this.oldTaskTemp = this.tasks[index].name
        // 開啟指定任務的編輯面板
        this.tasks[index].editBoard = true
        // DOM 重新渲染後
        this.$nextTick(function() {
          // 利用 $refs 找到輸入框（回傳值為陣列）
          let elements = this.$refs.EditInput[0]
          // 聚焦到輸入框
          elements.focus()
        })
      }
    },
    finishEdit: function(index) {
      // 取得目前的輸入內容
      let content = this.$refs.EditInput[0].value
      // 檢查內容是否為空
      if(!content) {
        // 為空的話，跳出提示訊息
        this.showWarning = true
      } else {
        // 關閉編輯面板
        this.tasks[index].editBoard = false
        // 關閉提示訊息
        this.showWarning = false
        // 退出編輯模式
        this.isEditMode = false
      }      
    },
    cancelEdit: function(index) {
      // 取得目前的輸入內容
      let content = this.$refs.EditInput[0].value

      // 如果目前的內容與原本的內容不相同
      if(this.oldTaskTemp !== content) {
        // 把原本的內容設定回去
        this.tasks[index].name = this.oldTaskTemp
      }

      // 關閉編輯面板
      this.tasks[index].editBoard = false
      // 退出編輯模式
      this.isEditMode = false 
      // 關閉提示訊息
      this.showWarning = false
    },
    changeBtnStatus: function(index) {
      // 不處於編輯模式時，才會執行
      if(!this.isEditMode) {
        // 如果打開的按鈕，不做事
        if(this.menuBtns[index].active) return

        // 把所有按鈕的狀態關閉
        for(let btn of this.menuBtns) {
          btn.active = false
        }
        // 把目前點擊按鈕的狀態打開
        this.menuBtns[index].active = true
      }
    },
    openModal: function() {
      // 不處於編輯模式時，才會執行
      if(!this.isEditMode) {
         this.isModalOn = true
        // DOM 重新渲染後
        this.$nextTick(function() {
          // 聚焦到輸入框
          this.$refs.newTaskInput.focus()
        })
      }
    },
    closeModal: function() {
      // 如果有輸入新的任務內容
      if(this.newTaskTemp) {
        // 把資料的內容初始化
        this.newTaskTemp = null
      }
      // 若提示訊息是打開的狀態
      if(this.modalShowWarning) {
        // 關閉提示訊息（初始化）
        this.modalShowWarning = false
      }
      // 關閉輸入視窗
      this.isModalOn = false
    }
  },
  computed: {
    currentPage() {
      // 找到目前按鈕的狀態為「開啟」的索引值
      let index = this.menuBtns.findIndex((btn) => btn.active)
      // 回傳目前的按鈕名稱
      return this.menuBtns[index].name
    },
    loadTasks: function() {
      // 如果目前的頁面為「所有任務」
      if(this.currentPage === 'allTasks') {
        // 回傳所有任務的資料
        return this.tasks
      } else {
        // 回傳已完成的任務資料
        return this.tasks.filter((tasks) => tasks.completed)
      }
    }, 
  }
})

// 產生亂數
function createRandomNum() {
  return new Date() * 1 + Math.floor(Math.random() * 99999)
}

