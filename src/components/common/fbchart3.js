import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Fbchart3 extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{ data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46] }],
            options: {
                chart: {
                    type: 'area',
                    height: 160,
                    sparkline: {
                        enabled: true
                    },
                },
                stroke: {
                    width: 2
                },
                colors: ['#DCE6EC'],
                title: {
                    text: '18,254',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        cssClass: 'apexcharts-yaxis-title'
                    }
                },
                subtitle: {
                    text: 'Engaged User',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                        cssClass: 'apexcharts-yaxis-title'
                    }
                }
            },


        };
    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="area" />
        );
    }
}

export default Fbchart3;
