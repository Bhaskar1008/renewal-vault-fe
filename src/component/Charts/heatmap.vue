<template>
   <div>
        <apexcharts  type="heatmap" :options="chartOptionsHeatmap" :series="seriesHeatmap"></apexcharts>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
      apexcharts: VueApexCharts,
    },
    data: function() {
        return {
            chartOptionsHeatmap: {
                dataLabels: {
                    enabled: false
                },
                colors: ["#008FFB"],

                xaxis: {
                    type: 'category',
                },
                title: {
                    text: 'HeatMap Chart (Single color)'
                },
            },
            seriesHeatmap: [{
                name: 'Metric1',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric2',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric3',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric4',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric5',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric6',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric7',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric8',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                },
                {
                name: 'Metric9',
                data: this.generateHeatData(20, {
                    min: 0,
                    max: 90
                })
                }
            ],   
        }
    },
    methods:{
        generateHeatData(count, yrange) {
            var i = 0;
            var series = [];
            while (i < count) {
                var x = (i + 1).toString();
                var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                series.push({
                x: x,
                y: y
                });
                i++;
            }
            return series;
        }
    }
};
</script>
