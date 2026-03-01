import React, { Component } from "react";
import { Circle } from "rc-progress";
import Nestable from "react-nestable";
import ToolTip from "../../common/toolTip";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from "classnames";

export default class Taskboard extends Component {
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
        {/* HEADER */}
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">TaskBoard</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Amiruddaula Islamia Degree College</a>
                  </li>
                  <li className="breadcrumb-item active">TaskBoard</li>
                </ol>
              </div>

              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => this.setState({ activeTab: 1 })}
                  >
                    Task List
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => this.setState({ activeTab: 2 })}
                  >
                    Scrum Type
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 3 })}
                    onClick={() => this.setState({ activeTab: 3 })}
                  >
                    Add Task
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="section-body mt-4">
          <div className="container-fluid">
            <TabContent activeTab={activeTab}>
              {/* TAB 1 — TASK LIST */}
              <TabPane tabId={1} className="fade show">
                <div className="row clearfix mt-2">
                  {/* KPI CARDS */}
                  {[
                    { label: "Planned", percent: 23, color: "#2185d0" },
                    { label: "In progress", percent: 43, color: "#f2711c" },
                    { label: "Completed", percent: 83, color: "#21ba45" },
                    { label: "Incomplete", percent: 12, color: "#e03997" },
                  ].map((item, i) => (
                    <div className="col-lg-3 col-md-6" key={i}>
                      <div className="card">
                        <div className="card-body text-center">
                          <h6>{item.label}</h6>
                          <Circle
                            percent={item.percent}
                            strokeWidth={5}
                            strokeColor={item.color}
                            trailColor="#eee"
                            strokeLinecap="round"
                            style={{ width: 90, height: 90 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TASK TABLE */}
                <div className="table-responsive mt-3">
                  <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Team</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th className="w200">Progress</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        {
                          id: "01",
                          title: "New code Update on github",
                          status: "Planned",
                          percent: 0,
                        },
                        {
                          id: "02",
                          title: "Design Events",
                          status: "Completed",
                          percent: 100,
                        },
                        {
                          id: "03",
                          title: "Feed Details on Dribbble",
                          status: "In progress",
                          percent: 35,
                        },
                        {
                          id: "04",
                          title: "Angular App Design bug",
                          status: "Planned",
                          percent: 35,
                        },
                      ].map((task, i) => (
                        <tr key={i}>
                          <td>{task.id}</td>
                          <td>
                            <h6 className="mb-0">{task.title}</h6>
                            <span>
                              It is a long established fact that a reader will
                              be distracted...
                            </span>
                          </td>

                          <td>
                            <ul className="list-unstyled team-info mb-0 w150">
                              <ToolTip id={i.toString()} text="Avatar" />
                              <li>
                                <img
                                  src="../assets/images/xs/avatar1.jpg"
                                  alt="avatar"
                                />
                              </li>
                            </ul>
                          </td>

                          <td>
                            <div className="text-info">Start: 3 Jun 2019</div>
                            <div className="text-pink">End: 15 Jun 2019</div>
                          </td>

                          <td>
                            <span className="tag tag-orange">
                              {task.status}
                            </span>
                          </td>

                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>{task.percent}%</strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">Progress</small>
                              </div>
                            </div>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-azure"
                                style={{ width: `${task.percent}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPane>

              {/* TAB 2 — SCRUM */}
              <TabPane tabId={2} className="fade show">
                <div className="row clearfix mt-2">
                  {[
                    { label: "Planned", percent: 23, color: "#2185d0" },
                    { label: "In progress", percent: 43, color: "#f2711c" },
                    { label: "Completed", percent: 83, color: "#21ba45" },
                    { label: "Incomplete", percent: 12, color: "#e03997" },
                  ].map((item, i) => (
                    <div className="col-lg-3 col-md-6" key={i}>
                      <div className="card">
                        <div className="card-body text-center">
                          <h6>{item.label}</h6>
                          <Circle
                            percent={item.percent}
                            strokeWidth={5}
                            strokeColor={item.color}
                            trailColor="#eee"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>

              {/* TAB 3 — ADD TASK */}
              <TabPane tabId={3} className="fade show">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add Task</h3>
                  </div>

                  <form className="card-body">
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label">
                        Task no.
                      </label>
                      <div className="col-md-7">
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-3 col-form-label">
                        Job title
                      </label>
                      <div className="col-md-7">
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-3 col-form-label">
                        Description
                      </label>
                      <div className="col-md-7">
                        <textarea rows="4" className="form-control"></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-7 offset-md-3">
                        <button className="btn btn-primary mr-2">Submit</button>
                        <button className="btn btn-outline-secondary">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  }
}
