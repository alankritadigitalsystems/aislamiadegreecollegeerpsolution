import React, { Component } from 'react';
import Gridviewcomponent from '../../common/gridviewcomponent';
import Profilecomponent from '../../common/profilecomponent';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import ToolTip from "../../common/toolTip";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import Dropzone from '../../common/DropzoneExample';
import classnames from 'classnames';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      joiningDate: new Date(),
      firstName: '',
      lastName: '',
      gender: '',
      department: '',
      position: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      behance: '',
      dribbble: '',
      message: ''
    };
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to recover this imaginary file!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your imaginary file has been deleted.', 'success');
      }
    });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ joiningDate: date });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', this.state);
    Swal.fire('Submitted!', 'Staff data has been submitted.', 'success');
  };

  render() {
    const { activeTab } = this.state;

    return (
      <>
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <div className="header-action">
                <h1 className="page-title">Staff</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Amiruddaula Islamia Degree College</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Staff</li>
                </ol>
              </div>
              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => this.toggleTab(1)}
                  >List View</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => this.toggleTab(2)}
                  >Grid View</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 3 })}
                    onClick={() => this.toggleTab(3)}
                  >Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 4 })}
                    onClick={() => this.toggleTab(4)}
                  >Add</NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>

        <div className="section-body mt-4">
          <div className="container-fluid">
            <TabContent activeTab={activeTab}>
              {/* LIST VIEW */}
              <TabPane tabId={1} className={classnames('fade', { show: activeTab === 1, active: activeTab === 1 })}>
                <div className="card">
                  <div className="table-responsive">
                    <table className="table table-hover table-vcenter text-nowrap table-striped mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Number</th>
                          <th>Designation</th>
                          <th>Email</th>
                          <th>Joining Date</th>
                          <th></th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Sample rows */}
                        <tr>
                          <td className="w60"><img className="avatar" src="../assets/images/xs/avatar3.jpg" alt="" /></td>
                          <td><div className="font-15">Ken Smith</div></td>
                          <td><span>(417) 646-8377</span></td>
                          <td><span className="text-muted">Peon</span></td>
                          <td>ken@gmail.com</td>
                          <td><strong>04 Jan, 2019</strong></td>
                          <td><span className="tag tag-success">Full-time</span></td>
                          <td>
                            <button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
                            <button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button>
                            <button onClick={this.handleDelete} type="button" className="btn btn-icon btn-sm" title="Delete">
                              <i className="fa fa-trash-o text-danger"></i>
                            </button>
                          </td>
                        </tr>
                        {/* More rows can be copied similarly */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPane>

              {/* GRID VIEW */}
              <TabPane tabId={2} className={classnames('fade', { show: activeTab === 2, active: activeTab === 2 })}>
                <Gridviewcomponent />
              </TabPane>

              {/* PROFILE VIEW */}
              <TabPane tabId={3} className={classnames('fade', { show: activeTab === 3, active: activeTab === 3 })}>
                <Profilecomponent />
              </TabPane>

              {/* ADD STAFF FORM */}
              <TabPane tabId={4} className={classnames('fade', { show: activeTab === 4, active: activeTab === 4 })}>
                <form onSubmit={this.handleSubmit}>
                  <div className="row clearfix">
                    {/* Left Column - Basic Info */}
                    <div className="col-lg-8 col-md-12 col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Basic Information</h3>
                        </div>
                        <div className="card-body">
                          <div className="row clearfix">
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" className="form-control"
                                  value={this.state.firstName} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" className="form-control"
                                  value={this.state.lastName} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Joining Date</label>
                                <DatePicker
                                  className="form-control"
                                  selected={this.state.joiningDate}
                                  onChange={this.handleDateChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <label>Gender</label>
                              <select className="form-control show-tick" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                                <option value="">-- Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" className="form-control"
                                  value={this.state.department} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Position</label>
                                <input type="text" name="position" className="form-control"
                                  value={this.state.position} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Phone</label>
                                <input type="text" name="phone" className="form-control"
                                  value={this.state.phone} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control"
                                  value={this.state.email} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group mt-2 mb-3">
                                <Dropzone />
                                <small id="fileHelp" className="form-text text-muted">Upload profile photo here.</small>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group mt-3">
                                <label>Messages</label>
                                <textarea rows="4" name="message" className="form-control no-resize" placeholder="Please type what you want..."
                                  value={this.state.message} onChange={this.handleInputChange}></textarea>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <button type="submit" className="mr-1 btn btn-primary">Submit</button>
                              <button type="button" className="btn btn-outline-secondary" onClick={() => this.setState({
                                firstName: '', lastName: '', gender: '', department: '',
                                position: '', phone: '', email: '', message: ''
                              })}>Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Account Info */}
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Account Information</h3>
                        </div>
                        <div className="card-body">
                          <div className="row clearfix">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label>User Name</label>
                                <input type="text" name="username" className="form-control"
                                  value={this.state.username} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control"
                                  value={this.state.password} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword" className="form-control"
                                  value={this.state.confirmPassword} onChange={this.handleInputChange} />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <button type="submit" className="mr-1 btn btn-primary">Submit</button>
                              <button type="button" className="btn btn-outline-secondary">Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Social Links</h3>
                        </div>
                        <div className="card-body">
                          <div className="form-group"><label>Facebook</label><input type="text" name="facebook" className="form-control" value={this.state.facebook} onChange={this.handleInputChange} /></div>
                          <div className="form-group"><label>Twitter</label><input type="text" name="twitter" className="form-control" value={this.state.twitter} onChange={this.handleInputChange} /></div>
                          <div className="form-group"><label>LinkedIn</label><input type="text" name="linkedin" className="form-control" value={this.state.linkedin} onChange={this.handleInputChange} /></div>
                          <div className="form-group"><label>Behance</label><input type="text" name="behance" className="form-control" value={this.state.behance} onChange={this.handleInputChange} /></div>
                          <div className="form-group"><label>Dribbble</label><input type="text" name="dribbble" className="form-control" value={this.state.dribbble} onChange={this.handleInputChange} /></div>
                          <button type="submit" className="mr-1 btn btn-primary">Submit</button>
                          <button type="button" className="btn btn-outline-secondary">Cancel</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </form>
              </TabPane>

            </TabContent>
          </div>
        </div>
      </>
    );
  }
}
