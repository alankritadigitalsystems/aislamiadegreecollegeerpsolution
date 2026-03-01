import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class Flotchart extends Component {
    constructor(props) {
        super(props);
        this.state = {

            series: [
                {
                    color: '#6435c9',
                    shadowSize: 0,
                    data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46],
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: { colors: [{ opacity: 0 }, { opacity: 0.5 }] }
                    }
                }
            ],
            options: {
                chart: {
                    type: 'lines',
                    height: 160
                },
                crosshair: {
                    mode: 'x',
                    color: "indigo-light"
                },
                grid: { borderWidth: 0 },
                yaxis: {
                    min: 0,
                    max: 100,
                    color: 'rgba(0,0,0,.06)',
                    font: {
                        size: 10,
                        color: '#808488',
                        family: 'Arial'
                    },
                    tickSize: 15
                },
                xaxis: { show: false }
            }
        };
    }
    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="290px"/>
        );
    }
}

export default Flotchart;
