"use client";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TabContent,
  TabPane,
  Nav,
  NavLink as TabLink,
  NavItem,
} from "reactstrap";
import Link from "next/link";
import DefaultLink from "./DefaultLink";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Route";
import { Menu as ReactMenu, MenuItem, SubMenu , MenuButton} from '@szhsin/react-menu';
import Cookies from "js-cookie";
import '@szhsin/react-menu/dist/index.css';
import {
  openLeftSidebarAction,
  openRightSidebarAction,
  openSettingbarAction,
  changeThemeColorAction,
  fontAction,
  darkModeAction,
  fixNavbarAction,
  darkHeaderAction,
  iconColorAction,
  darkSidebarAction,
  gradientColorAction,
  boxShadowAction,
  boxLayoutAction,
  darkMinSidebarAction,
  rtlAction,
  menuGridAction,
} from "../../actions/settingsAction";
import { superAdminMenu, teacherMenu, studentMenu, getClientMenu , universityAdminMenu} from "./metisMenu";

import classnames from "classnames";
import { usePathname } from "next/navigation";
import collegeLogo from "../../../public/assets/images/college-logo.jpeg"
class Menu extends Component {

  constructor(props) {
  const role = Cookies.get("userRole") || "guest";
    super(props);
    this.state = {
      menuTitle: "Amiruddaula Islamia Degree College",
      settingTab: "Settings",
      rightTab: "statistics",
      menuType: false,
      toggleThemeBar: false,
      openChatBar: false,
      isMenuSet: false,
      superAdminMenu: [],
      uniMenu: [],
      role
    };
  }
componentDidMount() {
  // Build default menus on first load
  this.buildMenus();
}

componentDidUpdate(prevProps) {
  // Rebuild menus when permissions change
  if (
    JSON.stringify(prevProps.permissions) !== JSON.stringify(this.props.permissions) ||
    prevProps.isSuperAdmin !== this.props.isSuperAdmin
  ) {
    this.buildMenus();
  }
}

buildMenus = () => {
  const { permissions = {}, isSuperAdmin } = this.props;
  const adMenu = getClientMenu(); 
  const newUniMenu = this.getMetisMenu(permissions);
 const role = Cookies.get("userRole") || "guest";
  this.setState({
    role,
    superAdminMenu: adMenu,
    uniMenu: newUniMenu,
    isMenuSet: true,
  });
};
  closeBar = () => {
    // this.props.openRightSidebarAction(false);
    this.setState({ toggleThemeBar: false });
  };
  openThemeBarAction = () => {
    this.setState({ toggleThemeBar: !this.state.toggleThemeBar });
  };
  openChatBarAction = () => {
    this.setState({ openChatBar: !this.state.openChatBar });
  };
  toggleAction = () => {
    const { menuGrid, menuGridAction } = this.props;
    this.setState({ menuType: false });
    menuGridAction(!menuGrid);
  };

 getMetisMenu = (permissions = {}) => {
  const menu = [];
  
  universityAdminMenu.forEach((menuItem, idx) => {
    const { permission_code = '', displayToAll = false, checkEdit = false } = menuItem;
    
    if (displayToAll) {
      menuItem.id = idx + 1;
      menu.push(menuItem);
    }

    if (permission_code && permissions[permission_code] && permissions[permission_code].read && !displayToAll) {
      if (checkEdit) {
        if (permissions[permission_code].update) {
          menuItem.id = idx + 1;
          menu.push(menuItem);
        }
      } else {
        menuItem.id = idx + 1;
        menu.push(menuItem);
      }
    }
  });
  return menu;
};


  getAdminMenu = (permissions = {}) => {
    const menu = [];
    superAdminMenu.forEach((menuItem, idx) => {
      const {permission_code = '', displayToAll = false} = menuItem;
      if (displayToAll) {
        menuItem.id = idx + 1;
        menu.push(menuItem);
      }
      if (permission_code && permissions[permission_code] && permissions[permission_code].read && !displayToAll) {
        menuItem.id = idx + 1;
        menu.push(menuItem);
      }
    });

    return menu;
  }

  render() {
    
    const {
      openRightSidebarAction,
      toggleRightBar,
      openSettingbarAction,
      toggleSettingbar,
      openLeftSidebarAction,
      toggleLeftBar,
      changeThemeColorAction,
      themeColor,
      fontAction,
      darkModeAction,
      isDarkMode,
      fixNavbarAction,
      isFixNavbar,
      darkHeaderAction,
      isDarkHeader,
      iconColorAction,
      isIconColor,
      gradientColorAction,
      isGradientColor,
      darkSidebarAction,
      isDarkSidebar,
      darkMinSidebarAction,
      isMinSidebar,
      boxShadowAction,
      isBoxShadow,
      boxLayoutAction,
      isBoxLayout,
      rtlAction,
      isRtl,
      menuGrid,
      permissions = {},
      isSuperAdmin,
      
    } = this.props;
    const { menuType, openChatBar, settingTab, rightTab, superAdminMenu: newSuperAdminMenu = [], uniMenu = [] ,role } = this.state;
   
   function renderMenuItems(items) {
    
  return items.map((item, index) => {
    
    if(item.content && item.content.length > 0) {
      // submenu case
      return (
        <SubMenu
          key={index}
          label={
            <>
              <i className={`fa fa-${item.icon}`} /> {item.label}
            </>
          }
        >
          {renderMenuItems(item.content)}
        </SubMenu>
      );
    } else {
      // single menu item
      return (
        <MenuItem key={index}>
          <DefaultLink href={item.to || '#'}>{item.icon && <i className={`fa fa-${item.icon}`} />} {item.label}</DefaultLink>
        </MenuItem>
      );
    }
  });
  
}
    function AppContent({ permissions, isSuperAdmin, navigate }) {
     const pathname = usePathname();
     const currentRoute = AppRoutes.find((r) => r.path === pathname) || AppRoutes.find((r) => r.path === "/");
      if (!currentRoute) return null;
      const { component: Component, permission_code = "" } = currentRoute;
  const accountPermissions = permissions[permission_code] || {};
  return (
    <Component
      isSuperAdmin={isSuperAdmin}
      navigate={navigate}
      permissions={accountPermissions}
    />
  );
}
 
const { role : userRole } = this.state;
    return (
      <>
        <div id="main_content">
          <div
            id="header_top"
            className={`header_top ${isMinSidebar ? "dark" : ""}`}
          >
            <div className="container">
              <div className="hleft">
                <Link className="header-brand" href= "/">
                <img src={collegeLogo.src}className="rounded-full"></img>
                  {/* <i className="fa fa-graduation-cap brand-logo"></i> */}
                </Link>
                <div className="dropdown">
                  <span
                    onClick={() => openLeftSidebarAction(!toggleLeftBar)}
                    className="nav-link icon menu_toggle"
                  >
                    <i className="fe fe-align-center"></i>
                  </span>
                  <Link href= "email" className="nav-link icon app_inbox">
                    <i
                      className="fe fe-inbox"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Inbox"
                    ></i>
                  </Link>
                  <Link
                    href= "filemanager"
                    className="nav-link icon app_file xs-hide"
                  >
                    <i
                      className="fe fe-folder"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="File Manager"
                    ></i>
                  </Link>
                  <Link href= "socialMedia" className="nav-link icon xs-hide">
                    <i
                      className="fe fe-share-2"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Social Media"
                    ></i>
                  </Link>
                </div>
              </div>
              <div className="hright">
                {false && (<span
                  onClick={() => openRightSidebarAction(!toggleRightBar)}
                  className="nav-link icon right_tab"
                >
                  <i className="fe fe-align-right"></i>
                </span>)}
                <Link href= "login" className="nav-link icon settingbar">
                  <i className="fe fe-power"></i>
                </Link>
              </div>
            </div>
          </div>
          {false && (<div
            id="rightsidebar"
            className={`right_sidebar ${toggleSettingbar ? "open" : ""}`}
          >
            <span
              onClick={() => openSettingbarAction(false)}
              className="p-3 settingbar float-right"
            >
              <i className="fa fa-close"></i>
            </span>
            <Nav tabs>
              <NavItem>
                <TabLink
                  className={classnames({ active: settingTab === "Settings" })}
                  onClick={() => this.setState({ settingTab: "Settings" })}
                >
                  Settings
                </TabLink>
              </NavItem>
              <NavItem>
                <TabLink
                  className={classnames({ active: settingTab === "activity" })}
                  onClick={() => this.setState({ settingTab: "activity" })}
                >
                  Activity
                </TabLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={settingTab}>
              <TabPane
                tabId="Settings"
                className={classnames(["vivify", "fadeIn"])}
              >
                <div className="mb-4">
                  <h6 className="font-14 font-weight-bold text-muted">
                    Theme Colorss
                  </h6>
                  <ul className="choose-skin list-unstyled mb-0">
                    <li
                      data-theme="azure"
                      onClick={() => changeThemeColorAction("azure")}
                    >
                      <div className="azure"></div>
                    </li>
                    <li
                      data-theme="indigo"
                      className={themeColor === "indigo" ? "active" : ""}
                      onClick={() => changeThemeColorAction("indigo")}
                    >
                      <div className="indigo"></div>
                    </li>
                    <li
                      data-theme="purple"
                      className={themeColor === "purple" ? "active" : ""}
                      onClick={() => changeThemeColorAction("purple")}
                    >
                      <div className="purple"></div>
                    </li>
                    <li
                      data-theme="orange"
                      className={themeColor === "orange" ? "active" : ""}
                      onClick={() => changeThemeColorAction("orange")}
                    >
                      <div className="orange"></div>
                    </li>
                    <li
                      data-theme="green"
                      className={themeColor === "green" ? "active" : ""}
                      onClick={() => changeThemeColorAction("green")}
                    >
                      <div className="green"></div>
                    </li>
                    <li
                      data-theme="cyan"
                      className={themeColor === "cyan" ? "active" : ""}
                      onClick={() => changeThemeColorAction("cyan")}
                    >
                      <div className="cyan"></div>
                    </li>
                    <li
                      data-theme="blush"
                      className={themeColor === "blush" ? "active" : ""}
                      onClick={() => changeThemeColorAction("blush")}
                    >
                      <div className="blush"></div>
                    </li>
                    <li
                      data-theme="white"
                      className={themeColor === "white" ? "active" : ""}
                      onClick={() => changeThemeColorAction("white")}
                    >
                      <div className="bg-white"></div>
                    </li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h6 className="font-14 font-weight-bold text-muted">
                    Font Style
                  </h6>
                  <div className="custom-controls-stacked font_setting">
                    <label className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="font"
                        value="font-muli"
                        onChange={() => fontAction("font-muli")}
                      />
                      <span className="custom-control-label">
                        Muli Google Font
                      </span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="font"
                        value="font-montserrat"
                        onChange={() => fontAction("font-montserrat")}
                      />
                      <span className="custom-control-label">
                        Montserrat Google Font
                      </span>
                    </label>
                    <label className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="font"
                        value="font-poppins"
                        onChange={() => fontAction("font-poppins")}
                      />
                      <span className="custom-control-label">
                        Poppins Google Font
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <h6 className="font-14 font-weight-bold mt-4 text-muted">
                    General Settings
                  </h6>
                  <ul className="setting-list list-unstyled mt-1 setting_switch">
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Night Mode
                        </span>
                        <input
                          onChange={() => darkModeAction(!isDarkMode)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-darkmode"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Fix Navbar top
                        </span>
                        <input
                          onChange={() => fixNavbarAction(!isFixNavbar)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-fixnavbar"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Header Dark
                        </span>
                        <input
                          onChange={() => darkHeaderAction(!isDarkHeader)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-pageheader"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Min Sidebar Dark
                        </span>
                        <input
                          onChange={() => darkMinSidebarAction(!isMinSidebar)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-min_sidebar"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Sidebar Dark
                        </span>
                        <input
                          onChange={() => darkSidebarAction(!isDarkSidebar)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-sidebar"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Icon Color
                        </span>
                        <input
                          onChange={() => iconColorAction(!isIconColor)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-iconcolor"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Gradient Color
                        </span>
                        <input
                          onChange={() => gradientColorAction(!isGradientColor)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-gradient"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Box Shadow
                        </span>
                        <input
                          onChange={() => boxShadowAction(!isBoxShadow)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-boxshadow"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          RTL Support
                        </span>
                        <input
                          onChange={() => rtlAction(!isRtl)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-rtl"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                    <li>
                      <label className="custom-switch">
                        <span className="custom-switch-description">
                          Box Layout
                        </span>
                        <input
                          onChange={() => boxLayoutAction(!isBoxLayout)}
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input btn-boxlayout"
                        />
                        <span className="custom-switch-indicator"></span>
                      </label>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className="form-group">
                  <label className="d-block">
                    Storage <span className="float-right">77%</span>
                  </label>
                  <div className="progress progress-sm">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="77"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "77%" }}
                    ></div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Upgrade Storage
                  </button>
                </div>
              </TabPane>
              <TabPane
                tabId="activity"
                className={classnames(["vivify", "fadeIn"])}
              >
                <ul className="new_timeline mt-3">
                  <li>
                    <div className="bullet pink"></div>
                    <div className="time">11:00am</div>
                    <div className="desc">
                      <h3>Attendance</h3>
                      <h4>Computer Class</h4>
                    </div>
                  </li>
                  <li>
                    <div className="bullet pink"></div>
                    <div className="time">11:30am</div>
                    <div className="desc">
                      <h3>Added an interest</h3>
                      <h4>â€œVolunteer Activitiesâ€</h4>
                    </div>
                  </li>
                  <li>
                    <div className="bullet green"></div>
                    <div className="time">12:00pm</div>
                    <div className="desc">
                      <h3>Developer Team</h3>
                      <h4>Hangouts</h4>
                      <ul className="list-unstyled team-info margin-0 p-t-5">
                        <li>
                          <img
                            src="../assets/images/xs/avatar1.jpg"
                            alt="Avastar"
                          />
                        </li>
                        <li>
                          <img
                            src="../assets/images/xs/avatar2.jpg"
                            alt="Avatar"
                          />
                        </li>
                        <li>
                          <img
                            src="../assets/images/xs/avatar3.jpg"
                            alt="Avatar"
                          />
                        </li>
                        <li>
                          <img
                            src="../assets/images/xs/avatar4.jpg"
                            alt="Avatar"
                          />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="bullet green"></div>
                    <div className="time">2:00pm</div>
                    <div className="desc">
                      <h3>Responded to need</h3>
                      <span>â€œIn-Kind Opportunityâ€</span>
                    </div>
                  </li>
                  <li>
                    <div className="bullet orange"></div>
                    <div className="time">1:30pm</div>
                    <div className="desc">
                      <h3>Lunch Break</h3>
                    </div>
                  </li>
                  <li>
                    <div className="bullet green"></div>
                    <div className="time">2:38pm</div>
                    <div className="desc">
                      <h3>Finish</h3>
                      <h4>Go to Home</h4>
                    </div>
                  </li>
                </ul>
              </TabPane>
            </TabContent>
          </div>)}
          {/* <!-- Start Quick menu with more functio --> */}
          {false && (<div className="user_div">
            <Nav tabs>
              <NavItem>
                <TabLink
                  className={classnames({ active: rightTab === "statistics" })}
                  onClick={() => this.setState({ rightTab: "statistics" })}
                >
                  Statistics
                </TabLink>
              </NavItem>
              <NavItem>
                <TabLink
                  className={classnames({ active: rightTab === "result" })}
                  onClick={() => this.setState({ rightTab: "result" })}
                >
                  Result
                </TabLink>
              </NavItem>
              <NavItem>
                <TabLink
                  className={classnames({ active: rightTab === "students" })}
                  onClick={() => this.setState({ rightTab: "students" })}
                >
                  Student
                </TabLink>
              </NavItem>
              <NavItem>
                <TabLink
                  className={classnames({ active: rightTab === "todo" })}
                  onClick={() => this.setState({ rightTab: "todo" })}
                >
                  Todo
                </TabLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={rightTab} className="tab-content mt-3">
              <TabPane tabId="statistics" className={classnames(["fade show"])}>
                <div className="card">
                  <div className="card-body">
                    <div>Total Revenue</div>
                    <div className="py-3 m-0 text-center h1 text-success">
                      $79,452
                    </div>
                    <div className="d-flex">
                      <span className="text-muted">Income</span>
                      <div className="ml-auto">
                        <i className="fa fa-caret-up text-success"></i>4%
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>$43,320</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Bank of America
                            </small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-azure"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="42"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>$36,132</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Wells Fargo</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-yellow">
                      <i className="fa fa-users"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Total Student</span>
                      <h5 className="number mb-0">2,051</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-gray">
                      <i className="fa fa-sitemap"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Department</span>
                      <h5 className="number mb-0">14</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-dark">
                      <i className="fa fa-black-tie"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Total Teacher</span>
                      <h5 className="number mb-0">27</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-azure">
                      <i className="fa fa-tags"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Total Courses</span>
                      <h5 className="number mb-0">31</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-pink">
                      <i className="fa fa-credit-card"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Expense</span>
                      <h5 className="number mb-0">$7,254</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-green">
                      <i className="fa fa-bank"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Total Income</span>
                      <h5 className="number mb-0">$27,852</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-cyan">
                      <i className="fa fa-map-o"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Our Center</span>
                      <h5 className="number mb-0">52</h5>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body top_counter">
                    <div className="icon bg-indigo">
                      <i className="fa fa-smile-o"></i>{" "}
                    </div>
                    <div className="content">
                      <span>Smiley Face</span>
                      <h5 className="number mb-0">10K</h5>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="result" className={classnames(["fade show"])}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Result 2019</h3>
                    <div className="card-options">
                      <span>
                        <i
                          className="fa fa-file-excel-o"
                          data-toggle="tooltip"
                          title="Export Excel"
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>87%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Art & Design</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-azure"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="42"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>80%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Fashion</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>63%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Sports Science</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-orange"
                            role="progressbar"
                            style={{ width: "63%" }}
                            aria-valuenow="36"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>91%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Computers</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-indigo"
                            role="progressbar"
                            style={{ width: "91%" }}
                            aria-valuenow="6"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>35%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Biological Sciences
                            </small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-pink"
                            role="progressbar"
                            style={{ width: "35%" }}
                            aria-valuenow="6"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <div className="row text-center">
                      <div className="col-6 border-right">
                        <label className="mb-0">Total Pass</label>
                        <div className="font-20 font-weight-bold">1,052</div>
                      </div>
                      <div className="col-6">
                        <label className="mb-0">Total Fail</label>
                        <div className="font-20 font-weight-bold">198</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Result 2018</h3>
                    <div className="card-options">
                      <span>
                        <i
                          className="fa fa-file-excel-o"
                          data-toggle="tooltip"
                          title="Export Excel"
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>80%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Fashion</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>87%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Art & Design</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-azure"
                            role="progressbar"
                            style={{ width: "87%" }}
                            aria-valuenow="42"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>91%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Computers</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-indigo"
                            role="progressbar"
                            style={{ width: "91%" }}
                            aria-valuenow="6"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>35%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Biological Sciences
                            </small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-pink"
                            role="progressbar"
                            style={{ width: "35%" }}
                            aria-valuenow="6"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                      <li>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>63%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Sports Science</small>
                          </div>
                        </div>
                        <div className="progress progress-xxs">
                          <div
                            className="progress-bar bg-orange"
                            role="progressbar"
                            style={{ width: "63%" }}
                            aria-valuenow="36"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <div className="row text-center">
                      <div className="col-6 border-right">
                        <label className="mb-0">Total Pass</label>
                        <div className="font-20 font-weight-bold">845</div>
                      </div>
                      <div className="col-6">
                        <label className="mb-0">Total Fail</label>
                        <div className="font-20 font-weight-bold">142</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="students" className={classnames(["fade show"])}>
                <div id="users">
                  <div className="input-group mt-2 mb-2">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Search Student"
                    />
                  </div>
                  <ul
                    className="right_chat list-unstyled list"
                    onClick={() => this.openChatBarAction(!openChatBar)}
                  >
                    <li className="alfabet">A</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar1.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Abigail Churchill</span>
                          <span className="message">Art & Design</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar2.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Alexandra Carr</span>
                          <span className="message">Fashion</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar3.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Alison Berry</span>
                          <span className="message">Fashion</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">B</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar4.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Bella Alan</span>
                          <span className="message">Sports Science</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">C</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar5.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Caroline Alan</span>
                          <span className="message">Sports Science</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar6.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Connor Campbell</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar7.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Charles Campbell</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">D</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar8.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Donna Hudson</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar9.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Dylan Jones</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">G</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar8.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Gordon Hudson</span>
                          <span className="message">Sports Science</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar9.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Gabrielle Walker</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar10.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Gavin North</span>
                          <span className="message">Computers</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">S</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar1.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">Stephanie Hudson</span>
                          <span className="message">Sports Science</span>
                        </div>
                      </Link>
                    </li>
                    <li className="alfabet">W</li>
                    <li>
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar1.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <span className="name">William Paige</span>
                          <span className="message">Fashion</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className={`user_chatbody chat_app ${openChatBar ? "open" : ""
                    }`}
                >
                  <div className="card-header bline pt-1 pl-0 pr-0">
                    <h3 className="card-title">
                      Abigail Churchill <small>Online</small>
                    </h3>
                    <div className="card-options">
                      <span className="p-1" data-toggle="dropdown">
                        <i className="fa fa-cog"></i>
                      </span>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <span className="dropdown-item active">Online</span>
                        <span className="dropdown-item">Away</span>
                        <span className="dropdown-item">Do not disturb</span>
                        <span className="dropdown-item">Invisible</span>
                      </div>
                      <span
                        className="p-1 chat_close"
                        onClick={() => this.openChatBarAction(false)}
                      >
                        <i className="fa fa-close"></i>
                      </span>
                    </div>
                  </div>
                  <div className="chat_windows">
                    <ul className="mb-0">
                      <li className="other-message">
                        <img
                          className="avatar mr-3"
                          src="../assets/images/xs/avatar1.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <p className="bg-light-blue">Are we meeting today?</p>
                          <span className="time">10:10 AM, Today</span>
                        </div>
                      </li>
                      <li className="other-message">
                        <img
                          className="avatar mr-3"
                          src="../assets/images/xs/avatar1.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <p className="bg-light-blue">
                            Hi Aiden, how are you? How is the project coming
                            along?
                          </p>
                          <p className="bg-light-blue">Are we meeting today?</p>
                          <span className="time">10:15 AM, Today</span>
                        </div>
                      </li>
                      <li className="my-message">
                        <div className="message">
                          <p className="bg-light-gray">
                            Project has been already finished and I have results
                            to show you.
                          </p>
                          <div className="file_folder">
                            <span>
                              <div className="icon">
                                <i className="fa fa-file-excel-o text-success"></i>
                              </div>
                              <div className="file-name">
                                <p className="mb-0 text-muted">
                                  Report2017.xls
                                </p>
                                <small>Size: 68KB</small>
                              </div>
                            </span>
                          </div>
                          <span className="time">10:17 AM, Today</span>
                        </div>
                      </li>
                      <li className="other-message">
                        <img
                          className="avatar mr-3"
                          src="../assets/images/xs/avatar1.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <div className="media_img">
                            <img
                              src="../assets/images/gallery/1.jpg"
                              className="w100 img-thumbnail"
                              alt=""
                            />
                            <img
                              src="../assets/images/gallery/2.jpg"
                              className="w100 img-thumbnail"
                              alt=""
                            />
                          </div>
                          <span className="time">10:15 AM, Today</span>
                        </div>
                      </li>
                      <li className="other-message">
                        <img
                          className="avatar mr-3"
                          src="../assets/images/xs/avatar1.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <p className="bg-light-blue">
                            Are we meeting today I have results?
                          </p>
                          <span className="time">10:18 AM, Today</span>
                        </div>
                      </li>
                      <li className="my-message">
                        <div className="message">
                          <p className="bg-light-gray">
                            Well we have good budget for the project
                          </p>
                          <span className="time">10:25 AM, Today</span>
                        </div>
                      </li>
                    </ul>
                    <div className="chat-message clearfix">
                      <span>
                        <i className="icon-camera"></i>
                      </span>
                      <span>
                        <i className="icon-camcorder"></i>
                      </span>
                      <span>
                        <i className="icon-paper-plane"></i>
                      </span>
                      <div className="input-group mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="todo" className={classnames(["fade show"])}>
                <ul className="list-unstyled mb-0 todo_list">
                  <li>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="example-checkbox1"
                        value="option1"
                      />
                      <span className="custom-control-label">
                        Report Panel Usag
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="example-checkbox1"
                        value="option1"
                      />
                      <span className="custom-control-label">
                        Report Panel Usag
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="example-checkbox1"
                        value="option1"
                      />
                      <span className="custom-control-label">
                        New logo design for Angular Admin
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="example-checkbox1"
                        value="option1"
                      />
                      <span className="custom-control-label">
                        Design PSD files for Angular Admin
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="example-checkbox1"
                        value="option1"
                      />
                      <span className="custom-control-label">
                        New logo design for Angular Admin
                      </span>
                    </label>
                  </li>
                </ul>
              </TabPane>
            </TabContent>
          </div>)}

          {/* <!-- Start Main leftbar navigation --> */}
          <div id="left-sidebar" className="sidebar">
            <h5 className="brand-name">
              {this.state.menuTitle}
             
            </h5>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <span
                  className={`nav-link ${!menuType ? " active" : ""}`}
                  data-toggle="tab"
                  onClick={() => this.setState({ menuType: false })}
                >
                  University
                </span>

              </li>
              {( userRole === "superadmin") && (
    <li className="nav-item">
      <span
        className={`nav-link ${this.state.menuType ? "active" : ""}`}
        data-toggle="tab"
        onClick={() => this.setState({ menuType: true })}
      >
        Super Admin
      </span>
    </li>
  )}
              {( userRole === "admin") && (
    <li className="nav-item">
      <span
        className={`nav-link ${this.state.menuType ? "active" : ""}`}
        data-toggle="tab"
        onClick={() => this.setState({ menuType: true })}
      >
         Administrator 
      </span>
    </li>
  )}
  {userRole === "student" && (
    <li className="nav-item">
      <span
        className={`nav-link ${this.state.menuType ? "active" : ""}`}
        data-toggle="tab"
        onClick={() => this.setState({ menuType: true })}
      >
        Student
      </span>
    </li>
  )}
  {userRole === "teacher" && (
    <li className="nav-item">
      <span
      className={`nav-link ${this.state.menuType ? "active" : ""}`}
      data-toggle="tab"
      onClick={() => this.setState({ menuType: true })}
      >
        Faculty
        </span>
        </li>
      )}
            </ul>
            <div className="mt-3 ps-3">
              {!this.state.menuType ? (
                this.state.uniMenu.length > 0 ? (
                <ul className="list-unstyled">
                  {this.state.uniMenu.map((item) => (
                    <li key={item.id} className="mb-2">
                      <Link 
                      href={item.to}
                      className="d-flex align-items-center text-decoration-none text-dark"
                      >
                        {item.icon?.includes('/') ? (
                          <img
                          src={item.icon} 
                          alt={item.label}
                          style={{ width: 20, height: 20, objectFit: 'contain', marginRight: 8 }}
                          />
                        ) : (
                        <i className={`fa fa-${item.icon}`} style={{ marginRight: 8 }}></i>
                        )}
                        {item.label}
                        </Link>
                        </li>
                      ))}
                      </ul>
                    ) : (
                    <p className="text-muted small">No University Menu</p>
                  )
                ) : (
                  this.state.superAdminMenu.length > 0 ? (
                  <ul className="list-unstyled">
                    {this.state.superAdminMenu.map((item) => (
                      <li key={item.id} className="mb-2">
                        <Link
                        href={item.to}
                        className="d-flex align-items-center text-decoration-none text-dark"
                        >
                          {item.icon?.includes('/') ? (
                          <img
                          src={item.icon}
                          alt={item.label}
                          style={{ width: 20, height: 20, objectFit: 'contain', marginRight: 8 }}
                          />
                        ) : (
                        <i className={`fa fa-${item.icon}`} style={{ marginRight: 8 }}></i>
                        )}
                        {item.label}
                        </Link>
                        </li>
                      ))}
                      </ul>
                      ) : (
                      <p className="text-muted small">No Admin Menu</p>
                    )
                    )}
                    </div>
            {menuGrid ? (
              <>
                <div className="tab-content mt-3">
                  <div
                    className={`tab-pane fade${!menuType ? " show active" : ""
                      }`}
                    id="menu-uni"
                    role="tabpanel"
                  >
                    <nav className="sidebar-nav">
                     <ReactMenu 
                      menuButton={<MenuButton > </MenuButton> } 
                      className="metismenu grid">
                      {renderMenuItems(isSuperAdmin ? universityAdminMenu : uniMenu)}
                      </ReactMenu >
                    </nav>
                  </div>
                  <div
                    className={`tab-pane fade${menuType ? " show active" : ""}`}
                    id="menu-admin"
                    role="tabpanel"
                  >
                    <nav className="sidebar-nav">
                      <ReactMenu 
                      menuButton={<MenuButton></MenuButton>}
                      className="metismenu grid">
                      {renderMenuItems(isSuperAdmin ? superAdminMenu : newSuperAdminMenu)}
                      </ReactMenu >
                    </nav>
                  </div>
                </div>
              </>
            ) : (
              <div className="tab-content mt-3">
                <div
                  className={`tab-pane fade${!menuType ? " show active" : ""}`}
                  id="menu-uni"
                  role="tabpanel"
                >
                  <nav className="sidebar-nav">
                    <ReactMenu
                    menuButton={<MenuButton></MenuButton>}
                      className="sidebar-nav">
                    {renderMenuItems(isSuperAdmin ? adminMenu : newSuperAdminMenu)}
                    </ReactMenu >
                  </nav>
                </div>
                <div
                  className={`tab-pane fade${menuType ? " show active" : ""}`}
                  id="menu-admin"
                  role="tabpanel"
                >
                  <nav className="sidebar-nav">
                    <ReactMenu
                    menuButton={<MenuButton></MenuButton>}
                    className="metismenu sidebar-nav"
                    >
                      {renderMenuItems(isSuperAdmin ? adminMenu : newSuperAdminMenu)}
                      </ReactMenu>
                  </nav>
                </div>
              </div>
            )}
          </div>
          <div className="page" onClick={() => this.closeBar()}>
            <Header />
         
             <AppContent
  permissions={permissions}
  isSuperAdmin={this.props.isSuperAdmin}
  navigate={this.props.navigate}
/>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // darkMinSidebar: state.settings.isMinSidebar,
  toggleLeftBar: state.settings.isToggleLeftBar,
  toggleRightBar: state.settings.isToggleRightBar,
  toggleSettingbar: state.settings.isOpenSettingBar,
  themeColor: state.settings.themeColor,
  isDarkMode: state.settings.isDarkMode,
  isFixNavbar: state.settings.isFixNavbar,
  isDarkHeader: state.settings.isDarkHeader,
  isDarkSidebar: state.settings.isDarkSidebar,
  isGradientColor: state.settings.isGradientColor,
  isIconColor: state.settings.isIconColor,
  isBoxShadow: state.settings.isBoxShadow,
  isBoxLayout: state.settings.isBoxLayout,
  isMinSidebar: state.settings.isMinSidebar,
  menuGrid: state.settings.isMenuGrid,
  isRtl: state.settings.isRtl,
  permissions: state.authenticationReducer.userProfile.permissions
});

const mapDispatchToProps = (dispatch) => ({
  openLeftSidebarAction: (e) => dispatch(openLeftSidebarAction(e)),
  openRightSidebarAction: (e) => dispatch(openRightSidebarAction(e)),
  openSettingbarAction: (e) => dispatch(openSettingbarAction(e)),
  changeThemeColorAction: (e) => dispatch(changeThemeColorAction(e)),
  fontAction: (e) => dispatch(fontAction(e)),
  darkModeAction: (e) => dispatch(darkModeAction(e)),
  fixNavbarAction: (e) => dispatch(fixNavbarAction(e)),
  darkHeaderAction: (e) => dispatch(darkHeaderAction(e)),
  iconColorAction: (e) => dispatch(iconColorAction(e)),
  darkSidebarAction: (e) => dispatch(darkSidebarAction(e)),
  darkMinSidebarAction: (e) => dispatch(darkMinSidebarAction(e)),
  boxShadowAction: (e) => dispatch(boxShadowAction(e)),
  boxLayoutAction: (e) => dispatch(boxLayoutAction(e)),
  gradientColorAction: (e) => dispatch(gradientColorAction(e)),
  menuGridAction: (e) => dispatch(menuGridAction(e)),
  rtlAction: (e) => dispatch(rtlAction(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

