import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Radarchart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Sales',
                data: [80, 50, 30, 40, 100, 20],
            }, {
                name: 'Income',
                data: [20, 30, 40, 80, 20, 80],
            }, {
                name: 'Expense',
                data: [44, 76, 78, 13, 43, 10],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'radar',
                    dropShadow: {
                        enabled: true,
                        blur: 1,
                        left: 1,
                        top: 1
                    }
                },
                colors: ['#17a2b8', '#6435c9', '#45aaf2'],
                stroke: {
                    width: 0
                },
                fill: {
                    opacity: 0.4
                },
                markers: {
                    size: 0
                },
                labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun']
            }
        };
    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={350} />
        );
    }
}

export default Radarchart;
