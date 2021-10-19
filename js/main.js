import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

const app = new Vue({
  el: '#app',
  data: {
    tasks: [
      {
        id: createRandomNum(),
        name: 'Call the dentist',
        completed: false
      },
      {
        id: createRandomNum(),
        name: 'Schedule a dinner with Peter',
        completed: false
      },
      {
        id: createRandomNum(),
        name: 'Dailyui 43',
        completed: false
      },
      {
        id: createRandomNum(),
        name: 'Call the vet',
        completed: false
      },
      {
        id: createRandomNum(),
        name: 'Kate\'s birthday present',
        completed: false
      },
      {
        id: createRandomNum(),
        name: 'Zero inbox',
        completed: true
      },
      {
        id: createRandomNum(),
        name: 'No alcohol today',
        completed: true
      },
      {
        id: createRandomNum(),
        name: 'Check-in to flight',
        completed: true
      },
    ]
  }
})

function createRandomNum() {
  return new Date() * 1 + Math.floor(Math.random() * 99999)
}