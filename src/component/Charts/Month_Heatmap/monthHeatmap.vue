<template>
  <div class="vuejs-heatmap" :class="selector"></div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import * as d3 from 'd3'
import { calendarHeatmap } from './calendar-heatmap.js'

export default {
  props: ['entries', 'colorRange', 'tooltipEnabled', 'tooltipUnit', 'locale', 'max', 'onClick', 'selector'],
  name: 'vuejs-heatmap',
  mounted() {
    this.renderHeatMap()
  },
  watch: {
    entries() {
      this.renderHeatMap()
    }
  }, 
  methods: {
    renderHeatMap() {
      // let entries = this.entries || [{"counting":2070,"created_at":"2017-06-21"},{"counting":3493,"created_at":"2017-06-22"}]
      let entries = [
        {"counting":2070,"created_at":"2018-04-21"},
        {"counting":3493,"created_at":"2018-04-22"},
        {"counting":2070,"created_at":"2018-04-23"},
        {"counting":2070,"created_at":"2018-04-24"},
        {"counting":3493,"created_at":"2018-04-25"},
        {"counting":2070,"created_at":"2018-04-26"},
        {"counting":2070,"created_at":"2018-04-27"},
        {"counting":3493,"created_at":"2018-04-28"},
        {"counting":2070,"created_at":"2018-04-29"},
        {"counting":2070,"created_at":"2018-04-01"},
        {"counting":3493,"created_at":"2018-04-02"},
        {"counting":2070,"created_at":"2018-04-03"},
        {"counting":2070,"created_at":"2018-04-11"},
        {"counting":3493,"created_at":"2018-04-12"},
        {"counting":2070,"created_at":"2018-04-17"},
        {"counting":2070,"created_at":"2018-04-18"},
        {"counting":3493,"created_at":"2018-04-19"},
        {"counting":2070,"created_at":"2018-04-20"},
        {"counting":2070,"created_at":"2018-04-13"},
        {"counting":3493,"created_at":"2018-06-20"},
        {"counting":2070,"created_at":"2018-06-21"},
        {"counting":2070,"created_at":"2018-06-22"},
        {"counting":3493,"created_at":"2018-06-23"},
        {"counting":2070,"created_at":"2018-06-24"},
        {"counting":2070,"created_at":"2018-06-25"},
        {"counting":3493,"created_at":"2018-06-26"},
        {"counting":2000,"created_at":"2018-06-27"},
        {"counting":1500,"created_at":"2018-06-28"},
        {"counting":1000,"created_at":"2018-06-29"},
        {"counting":1500,"created_at":"2018-06-30"},
        {"counting":1500,"created_at":"2018-06-01"},
        {"counting":1000,"created_at":"2018-06-02"},
        {"counting":1500,"created_at":"2018-06-03"},
        {"counting":2070,"created_at":"2018-06-04"},
        {"counting":1000,"created_at":"2018-06-05"},
        {"counting":2070,"created_at":"2018-06-06"},
        {"counting":2070,"created_at":"2018-06-07"},
        {"counting":1000,"created_at":"2018-06-08"},
        {"counting":2070,"created_at":"2018-06-09"},
        ]


      let now = moment().endOf('day').toDate()
      let yearAgo = moment().startOf('day').subtract(1, 'year').toDate()

      let data = d3.time.days(yearAgo, now).map((dateElement) => {
        let entry = ((dateElement) => {
          let heatmapEntry = _.find(entries, {created_at: moment(dateElement).format('YYYY-MM-DD')})
          if(!heatmapEntry) {
            return { counting: 0 }
          } else {
            return heatmapEntry
          }
        })(dateElement)

        return {
          date: dateElement,
          count: entry.counting,
          entry: entry
        }
      })

      let heatmap = calendarHeatmap.init().data(data).selector('.vuejs-heatmap')

      if( typeof this.selector !== 'undefined') heatmap.selector(`.${this.selector}`)
      if( typeof this.colorRange !== 'undefined' ) heatmap.colorRange(this.colorRange)
      if( typeof this.tooltipEnabled !== 'undefined' ) heatmap.tooltipEnabled(this.tooltipEnabled)
      if( typeof this.tooltipUnit !== 'undefined' ) heatmap.tooltipUnit(this.tooltipUnit)
      if( typeof this.locale !== 'undefined' ) heatmap.locale(this.locale)
      if( typeof this.width !== 'undefined' ) heatmap.width(this.width)
      if( typeof this.height !== 'undefined' ) heatmap.height(this.height)
      if( typeof this.max !== 'undefined' ) heatmap.max(this.max)
      if( typeof this.onClick !== 'undefined' ) heatmap.onClick(this.onClick)

      heatmap()  // render the chart
    }
  }
}
</script>

<style>
.vuejs-heatmap text.month-name,
.vuejs-heatmap text.calendar-heatmap-legend-text,
.vuejs-heatmap text.day-initial {
  font-size: 10px;
  fill: inherit;
  font-family: Helvetica, arial, 'Open Sans', sans-serif;
}
.vuejs-heatmap rect.day-cell:hover {
  stroke: #555555;
  stroke-width: 1px;
}
.vuejs-heatmap .day-cell-tooltip {
  position: absolute;
  z-index: 9999;
  padding: 5px 9px;
  color: #bbbbbb;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  text-align: center;
}
.vuejs-heatmap .day-cell-tooltip > span {
  font-family: Helvetica, arial, 'Open Sans', sans-serif
}
.vuejs-heatmap .calendar-heatmap {
  box-sizing: initial;
}
</style>
