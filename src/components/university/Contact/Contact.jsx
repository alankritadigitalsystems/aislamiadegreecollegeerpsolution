"use client";

import React, { Component } from "react";
import Swal from "sweetalert2";

import ToolTip from "../../common/toolTip";
import Dropzone from "../../common/DropzoneExample";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
} from "reactstrap";



export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      contacts: [
        {
          id: 1,
          name: "John Smith",
          phone: "+264-625-2583",
          email: "johnsmith@info.com",
          address: "455 S. Airport St. Moncks Corner, SC 29461",
          avatar: "../assets/images/xs/avatar4.jpg",
          starred: false,
          loved: false,
        },
        {
          id: 2,
          name: "Merri Diamond",
          phone: "+264-625-2583",
          email: "hermanbeck@info.com",
          address: "455 S. Airport St. Moncks Corner, SC 29461",
          avatar: "../assets/images/xs/avatar2.jpg",
          starred: true,
          loved: false,
        },
        {
          id: 3,
          name: "Sara Hopkins",
          phone: "+264-625-3333",
          email: "maryadams@info.com",
          address: "19 Ohio St. Snellville, GA 30039",
          avatar: "../assets/images/xs/avatar3.jpg",
          starred: false,
          loved: true,
        },
        // Add all remaining contacts here
      ],
      showAlert: false,
      contactToDelete: null,
    };
  }

  toggleTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleDelete = (contact) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will not be able to recover ${contact.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState((prevState) => ({
          contacts: prevState.contacts.filter(
            (c) => c.id !== contact.id
          ),
        }));
        Swal.fire("Deleted!", `${contact.name} has been deleted.`, "success");
      }
    });
  };

  toggleStar = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.map((c) =>
        c.id === contactId ? { ...c, starred: !c.starred } : c
      ),
    }));
  };

  render() {
    const { activeTab, contacts } = this.state;

    return (
      <>
        {/* Header */}
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <div className="header-action">
                <h1 className="page-title">Contact</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Amiruddaula Islamia Degree College</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol>
              </div>
              {/* Tabs */}
              <Nav tabs className="page-header-tab">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 1 })}
                    onClick={() => this.toggleTab(1)}
                  >
                    <i className="fa fa-list-ul"></i> List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 2 })}
                    onClick={() => this.toggleTab(2)}
                  >
                    <i className="fa fa-th"></i> Grid
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === 3 })}
                    onClick={() => this.toggleTab(3)}
                  >
                    <i className="fa fa-plus"></i> Add New
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="section-body mt-4">
          <div className="container-fluid">
            <TabContent activeTab={activeTab}>
              {/* List Tab */}
              <TabPane tabId={1} className={classnames(["fade show"])}>
                <div className="table-responsive" id="users">
                  <table className="table table-hover table-vcenter text-nowrap table_custom list">
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td className="width35 hidden-xs">
                            <a
                              href="#"
                              className={`mail-star ${contact.starred ? "active" : ""}`}
                              onClick={() => this.toggleStar(contact.id)}
                            >
                              <i className="fa fa-star"></i>
                            </a>
                          </td>
                          <td className="text-center width40">
                            <div className="avatar d-block">
                              <img className="avatar" src={contact.avatar} alt="Avatar" />
                            </div>
                          </td>
                          <td>
                            <div>
                              <a href="#">{contact.name}</a>
                            </div>
                            <div className="text-muted">{contact.phone}</div>
                          </td>
                          <td className="hidden-xs">
                            <div className="text-muted">{contact.email}</div>
                          </td>
                          <td className="hidden-sm">
                            <div className="text-muted">{contact.address}</div>
                          </td>
                          <td className="text-right">
                            <ToolTip id={`phone${contact.id}`} text="Phone" />
                            <ToolTip id={`mail${contact.id}`} text="Mail" />
                            <ToolTip id={`delete${contact.id}`} text="Delete" />
                            <a
                              className="btn btn-icon btn-sm"
                              href="#"
                              data-tip
                              data-for={`phone${contact.id}`}
                              title="Phone"
                            >
                              <i className="fa fa-phone"></i>
                            </a>
                            <a
                              className="btn btn-icon btn-sm"
                              href="#"
                              data-tip
                              data-for={`mail${contact.id}`}
                              title="Mail"
                            >
                              <i className="fa fa-envelope"></i>
                            </a>
                            <a
                              onClick={() => this.handleDelete(contact)}
                              className="btn btn-icon btn-sm text-danger hidden-xs js-sweetalert"
                              href="#"
                              data-tip
                              data-for={`delete${contact.id}`}
                              title="Delete"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPane>

              {/* Grid Tab */}
              <TabPane tabId={2} className={classnames(["fade show"])}>
                <div className="row row-deck">
                  {contacts.map((contact) => (
                    <div className="col-xl-4 col-md-6 col-sm-12" key={contact.id}>
                      <div className="card">
                        <div className="card-body">
                          <div className={`card-status ${contact.starred ? "bg-blue" : "bg-green"}`}></div>
                          <div className="mb-3">
                            <img src={contact.avatar.replace("xs", "sm")} className="rounded-circle w100" alt="" />
                          </div>
                          <div className="mb-2">
                            <h5 className="mb-0">{contact.name}</h5>
                            <p className="text-muted">{contact.email}</p>
                            <span>{contact.address}</span>
                          </div>
                          <span className="font-12 text-muted">Common Contact</span>
                          <ul className="list-unstyled team-info margin-0 pt-2">
                            <li><img src={contact.avatar} alt="Avatar" /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>

              {/* Add New Tab */}
              <TabPane tabId={3} className={classnames(["fade show"])}>
                <div className="card">
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Enter Name" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="number" className="form-control" placeholder="Enter Number" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="email" className="form-control" placeholder="Enter Email" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <textarea type="text" className="form-control" rows="4">Enter your Address</textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <Dropzone />
                      </div>
                      <div className="col-lg-12 mt-3">
                        <button type="submit" className="mr-1 btn btn-primary">Add</button>
                        <button type="submit" className="btn btn-default">Cancel</button>
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
