"use client";
import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from "classnames";
import dynamic from "next/dynamic";

const Flotchart = dynamic(() => import("../../common/flotchart"), {
  ssr: false,
});
const Fbchart = dynamic(() => import("../../common/fbchart"), { ssr: false });
const Fbchart2 = dynamic(() => import("../../common/fbchart2"), { ssr: false });
const Fbchart3 = dynamic(() => import("../../common/fbchart3"), { ssr: false });
const YoutubeChart = dynamic(() => import("../../common/YoutubeChart"), {
  ssr: false,
});
const LinkedinChart = dynamic(() => import("../../common/LinkedinChart"), {
  ssr: false,
});
export default class SocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }
  render() {
    const { activeTab } = this.state;
    return (
      <>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Social</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.history.back();
                        }
                      }}
                      className="text-blue-500 font-bold"
                    >
                      Amiruddaula Islamia Degree College
                    </button>
                  </li>
                  <li className="breadcrumb-item">
                    <button onClick={() => {
                        if (typeof window !== "undefined") {
                          window.history.back();
                        }
                      }} >App</button>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Social
                  </li>
                </ol>
              </div>
              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => this.setState({ activeTab: 1 })}
                  >
                    Social
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => this.setState({ activeTab: 2 })}
                  >
                    Campaigns
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>
        <div className="section-body mt-4">
          <div className="container-fluid">
            <TabContent activeTab={activeTab} className={classnames(["mt-3"])}>
              <TabPane tabId={1} className={classnames(["fade show"])}>
                <div className="row clearfix">
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card w_social_state2">
                          <div className="card-header">
                            <h2 className="card-title">Instagram</h2>
                            <div className="card-options">
                              <label className="custom-switch m-0">
                                <input
                                  type="checkbox"
                                  value="1"
                                  className="custom-switch-input"
                                />
                                <span className="custom-switch-indicator"></span>
                              </label>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="icon instagram">
                              <i className="fa fa-instagram fa-2x"></i>
                            </div>
                            <div className="content">
                              <div className="text">Followers</div>
                              <h4 className="mb-0">231</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card w_social_state2">
                          <div className="card-header">
                            <h2 className="card-title">Twitter</h2>
                            <div className="card-options">
                              <label className="custom-switch m-0">
                                <input
                                  type="checkbox"
                                  value="1"
                                  className="custom-switch-input"
                                />
                                <span className="custom-switch-indicator"></span>
                              </label>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="icon twitter">
                              <i className="fa fa-twitter fa-2x"></i>
                            </div>
                            <div className="content">
                              <div className="text">Followers</div>
                              <h5 className="mb-0">31</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card w_social_state2">
                          <div className="card-header">
                            <h2 className="card-title">Facebook</h2>
                            <div className="card-options">
                              <label className="custom-switch m-0">
                                <input
                                  type="checkbox"
                                  value="1"
                                  className="custom-switch-input"
                                />
                                <span className="custom-switch-indicator"></span>
                              </label>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="icon facebook">
                              <i className="fa fa-facebook fa-2x"></i>
                            </div>
                            <div className="content">
                              <div className="text">Like</div>
                              <h5 className="mb-0">123</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card w_social_state2">
                          <div className="card-header">
                            <h2 className="card-title">Linkedin</h2>
                            <div className="card-options">
                              <label className="custom-switch m-0">
                                <input
                                  type="checkbox"
                                  value="1"
                                  className="custom-switch-input"
                                />
                                <span className="custom-switch-indicator"></span>
                              </label>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="icon linkedin">
                              <i className="fa fa-linkedin fa-2x"></i>
                            </div>
                            <div className="content">
                              <div className="text">Followers</div>
                              <h5 className="mb-0">2510</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">Metrics Statistics</h2>
                        <div className="card-options">
                          <a
                            
                            className="card-options-fullscreen"
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </a>
                          <a
                            
                            className="card-options-remove"
                            data-toggle="card-remove"
                          >
                            <i className="fe fe-x"></i>
                          </a>
                          <div className="item-action dropdown ml-2">
                            <a  data-toggle="dropdown">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-eye"></i> View
                                Details{" "}
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                                Share{" "}
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                                Download
                              </a>
                              <div className="dropdown-divider"></div>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-copy"></i>{" "}
                                Copy to
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-folder"></i>{" "}
                                Move to
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-edit"></i>{" "}
                                Rename
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-trash"></i>{" "}
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div>Real Time Campaign</div>
                        <p className="text-muted">
                          The global and country campaign stats show how
                          popular.
                        </p>
                        {/* <div id="flotChart" style={{ height: "310px" }} ></div> */}
                        <Flotchart />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">Facebook Engaged Users</h2>
                        <div className="card-options">
                          <label className="custom-switch m-0">
                            <input
                              type="checkbox"
                              value="1"
                              className="custom-switch-input"
                            />
                            <span className="custom-switch-indicator"></span>
                          </label>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-md-flex justify-content-between">
                          <div>
                            <h6 className="mb-1">
                              Feb 21, 2019 to Feb 28 2019
                            </h6>
                            <span className="text-muted">
                              Note Enim omittam, ex quo dictas complectitur
                            </span>
                          </div>
                          <div>
                            <div className="selectgroup w250">
                              <label className="selectgroup-item">
                                <input
                                  type="radio"
                                  name="intensity"
                                  value="low"
                                  className="selectgroup-input"
                                />
                                <span className="selectgroup-button">
                                  7 Day
                                </span>
                              </label>
                              <label className="selectgroup-item">
                                <input
                                  type="radio"
                                  name="intensity"
                                  value="medium"
                                  className="selectgroup-input"
                                />
                                <span className="selectgroup-button">
                                  15 Day
                                </span>
                              </label>
                              <label className="selectgroup-item">
                                <input
                                  type="radio"
                                  name="intensity"
                                  value="high"
                                  className="selectgroup-input"
                                />
                                <span className="selectgroup-button">
                                  30 Day
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-12 mt-4">
                            <Fbchart />
                            {/* <div id="apex-chart-Facebook-1"></div> */}
                          </div>
                          <div className="col-lg-4 col-md-12 mt-4">
                            <Fbchart2 />
                            {/* <div id="apex-chart-Facebook-2"></div> */}
                          </div>
                          <div className="col-lg-4 col-md-12 mt-4">
                            <Fbchart3 />
                            {/* <div id="apex-chart-Facebook-3"></div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">YouTube Subscribers</h2>
                        <div className="card-options">
                          <a
                            
                            className="card-options-fullscreen"
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </a>
                          <a
                            
                            className="card-options-remove"
                            data-toggle="card-remove"
                          >
                            <i className="fe fe-x"></i>
                          </a>
                          <div className="item-action dropdown ml-2">
                            <a  data-toggle="dropdown">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-eye"></i> View
                                Details{" "}
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                                Share{" "}
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                                Download
                              </a>
                              <div className="dropdown-divider"></div>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-copy"></i>{" "}
                                Copy to
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-folder"></i>{" "}
                                Move to
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-edit"></i>{" "}
                                Rename
                              </a>
                              <a  className="dropdown-item">
                                <i className="dropdown-icon fa fa-trash"></i>{" "}
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <YoutubeChart />
                        {/* <div id="apex-YouTube-Subscribers"></div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title">Linkedin Key Metrics</h2>
                      </div>
                      <div className="card-body">
                        <LinkedinChart />
                        {/* <div id="apex-linkedin-metrics"></div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId={2} className={classnames(["fade show"])}>
                <div className="row clearfix row-deck">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Email Campaigns</h3>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover mb-0">
                            <tbody>
                              <tr>
                                <td>
                                  <a >Defecting Buyers Email 1</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">1.3MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "45%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "20%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        37.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        12.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Defecting Buyers Email 2</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">11.3MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "45%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "20%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        37.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        12.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Defecting Buyers Email 3</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">8.3MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "63%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "24%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        63.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        24.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Defecting Buyers Email 4</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">12.1MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "71%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "8%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        71.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        8.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Defecting Buyers Email 5</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">7.6MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "23%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "41%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        23.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        41.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Facebook Campaigns list 2019</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">1.3MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "45%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "20%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        37.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        12.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a >Twitter Campaigns at Newyork</a>
                                  <p className="mb-0 text-muted">
                                    Sent on 23-Feb-2019 11:38am
                                  </p>
                                </td>
                                <td className="text-right">
                                  <h6 className="font-14 mb-0">11.3MB</h6>
                                  <span className="text-muted">
                                    Emails deliverd
                                  </span>
                                </td>
                                <td className="w350">
                                  <div className="progress progress-xs">
                                    <div
                                      className="progress-bar bg-azura"
                                      style={{ width: "45%" }}
                                    ></div>
                                    <div
                                      className="progress-bar bg-cyan"
                                      style={{ width: "20%" }}
                                    ></div>
                                  </div>
                                  <div className="d-flex bd-highlight mt-2">
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-blue"></i>{" "}
                                        37.2% Clicks
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square text-info"></i>{" "}
                                        12.2% Opens
                                      </small>
                                    </div>
                                    <div className="flex-fill bd-highlight">
                                      <small>
                                        <i className="fa fa-check-square"></i>{" "}
                                        Deliveries
                                      </small>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  }
}
