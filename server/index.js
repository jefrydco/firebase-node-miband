'use strict'

const MiBand = require('./miband')
const bluetooth = require('webbluetooth').bluetooth
const firebase = require('firebase-admin')
const _initial = require('lodash.initial')
const serviceAccount = require('./service-account')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://drowatch-f94b1.firebaseio.com/'
})

const values = firebase.database().ref('values')


bluetooth.requestDevice({
  filters: [
    { services: [ MiBand.advertisementService ] }
  ],
  optionalServices: MiBand.optionalServices
})
  .then(device => {
    console.log(device.name)
    if (device.id === 'ca:90:43:d0:d9:b2') {
      return device.gatt.connect()
    }
    return false
  })
  .then(async server => {
    if (server) {
      const miband = new MiBand(server)
      const keys = []
      await miband.init()
      miband.on('heart_rate', async rate => {
        const res = await values.push(rate)
        keys.push(res.key)
        if (keys.length > 2) {
          const deletedKeys = _initial(keys)
          await Promise.all(deletedKeys.map(key => values.child(key).remove()))
        }
        if (rate < 80) {
          await miband.showNotification('message')
          await console.log('Alert')
        }
        await console.log(rate)
      })
      await miband.hrmStart()
      // await delay(60 * 60 * 1000)
      // await miband.hrmStop()
    }
  })