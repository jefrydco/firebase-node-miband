<template>
  <v-container fill-height="" fluid="">
    <v-layout row="" wrap="">
      <v-flex xs12="">
        <v-chart :options="option" auto-resize=""></v-chart>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

const db = firebase.initializeApp({
  apiKey: "AIzaSyA7T5hmaeOQLqkYvm_Sl8X89BX_feyV7ok",
  authDomain: "drowatch-f94b1.firebaseapp.com",
  databaseURL: "https://drowatch-f94b1.firebaseio.com",
  projectId: "drowatch-f94b1",
  storageBucket: "drowatch-f94b1.appspot.com",
  messagingSenderId: "489075385590",
  appId: "1:489075385590:web:cdb5e48194635772"
}).database()

  export default {
    data() {
      return {
        values: []
      }
    },
    firebase: {
      values: db.ref('values')
    },
    computed: {
      option() {
        return {
            series: [{
                type: 'liquidFill',
                radius: '70%',
                data: [this.values.length > 0 ? this.values[0] / 100 : 0],
                label: {
                  formatter({value}) {
                    return `${value * 100} BPM`
                  }
                }
            }]
        }
      },
      options() {
        return {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
              type: 'category',
              // eslint-disable-next-line
              data: Array.from({length: this.values.length}, (v, k) => this.values.length - k)
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: this.values,
              type: 'line'
          }, {
            data: Array.from({length: this.values.length}, () => 74),
            type: 'line'
          }]
      }
      }
    }
  }
</script>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100% !important;
  height: 100% !important;
}
/* .chart-style{
  width: 50%
} */
</style>