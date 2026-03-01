import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Columnchart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Fees',
                type: 'column',
                data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
            }, {
                name: 'Donation',
                type: 'line',
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#7568a7', '#fed284'],
                stroke: {
                    width: [0, 4]
                },
                // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [{
                    title: {
                        text: 'Fees',
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Donation'
                    }
                }]
            }
        };
    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
        );
    }
}

export default Columnchart;
