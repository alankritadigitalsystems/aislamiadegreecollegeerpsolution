import React, { Component } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Define your markers
const markers = [
  { name: "INDIA : 350", coordinates: [78.0, 21.0] },
  { name: "Australia : 250", coordinates: [151.0, -33.0] },
  { name: "USA : 250", coordinates: [-119.41, 36.77] },
  { name: "UK : 250", coordinates: [-3.41, 55.37] },
  { name: "UAE : 250", coordinates: [55.27, 25.2] },
];

export default class OurCentre extends Component {
  render() {
    return (
      <>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <div className="header-action">
                <h1 className="page-title">Our Centres</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Amiruddaula Islamia Degree College</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Our Centres
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="section-body mt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <ComposableMap
                      projectionConfig={{ scale: 150 }}
                      width={800}
                      height={400}
                      style={{ width: "100%", height: "400px" }}
                    >
                      <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                          geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="#4D5052"
                              stroke="#fff"
                              strokeWidth={0.25}
                            />
                          ))
                        }
                      </Geographies>

                      {markers.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates}>
                          <circle
                            r={5}
                            fill="#fff"
                            stroke="#000"
                            strokeWidth={1}
                            strokeOpacity={0.4}
                          />
                          <text
                            textAnchor="middle"
                            y={-10}
                            style={{
                              fontFamily: "Arial",
                              fill: "#000",
                              fontSize: 12,
                            }}
                          >
                            {name}
                          </text>
                        </Marker>
                      ))}
                    </ComposableMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
