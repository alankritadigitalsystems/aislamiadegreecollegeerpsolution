import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class YoutubeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                    name: 'Galned',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }, {
                    name: 'Lost',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                colors: ['#6435c9', '#f66d9b'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                },
                fill: {
                    opacity: 1

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }

            },
        };
    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
        );
    }
}

export default YoutubeChart;
