import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import {
  notificationMenuAction,
  languageMenuAction,
  authMenuAction,
  pagesMenuAction,
  mailMenuAction,
  profileMenuAction,
  darkModeAction,
  darkHeaderAction,
  darkSidebarAction,
  darkMinSidebarAction,
} from "../../actions/settingsAction";
import axiosInstance from "@/lib/axiosInstance";
import useAuthStore from "@/store/useAuthStore";

function Header(props) {
  const {
    fixNavbar,
    darkHeader,
    notificationMenu,
    notificationMenuAction,
    mailMenu,
    profileMenu,
    mailMenuAction,
    profileMenuAction,
    boxShadow,
    userProfile,
    authMenuAction,
    pagesMenuAction,
    languageMenuAction,
    darkModeAction,
    darkHeaderAction,
    darkSidebarAction,
    darkMinSidebarAction,
    isDarkMode,
    isDarkHeader,
    isDarkSidebar,
    isMinSidebar,
  } = props;

  const { user } = useAuthStore();
  // console.log("Logged in user:", user);

  const [mode, setMode] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const leftSidebar = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      // console.log("notification", res.data);
      setNotifications(res.data.body || []);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", hideLeftSidebarProxy, false);
    fetchNotifications();
    return () => {
      document.removeEventListener("mousedown", hideLeftSidebarProxy, false);
    };
  }, []);

  const hideLeftSidebarProxy = (e) => {
    if (leftSidebar.current && !leftSidebar.current.contains(e.target)) {
      authMenuAction(false);
      pagesMenuAction(false);
      languageMenuAction(false);
      mailMenuAction(false);
      notificationMenuAction(false);
      profileMenuAction(false);
    }
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    darkModeAction(!isDarkMode);
    darkHeaderAction(!isDarkHeader);
    darkMinSidebarAction(!isMinSidebar);
    darkSidebarAction(!isDarkSidebar);
  };

  const { full_name = {}, profile_picture = "" } = userProfile || {};
  const { first_name = "", last_name = "" } = full_name;

  return (
    <div
      ref={leftSidebar}
      className={`section-body ${fixNavbar ? "sticky-top" : ""} ${darkHeader ? "top_dark" : ""
        }`}
      id="page_top"
    >
      <div className="container-fluid">
        <div className="page-header">
          <div className="left">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="What you want to find"
              />
              <div className="input-group-append">
                <button
                  className={`btn btn-outline-secondary${boxShadow ? " box_shadow" : ""
                    }`}
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="notification d-flex">
              {/* Mail Dropdown */}
              <div
                className={`dropdown d-flex${mailMenu ? " show" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    mailMenuAction(!mailMenu);
                    notificationMenuAction(false);
                    profileMenuAction(false);
                  }}
                >
                  <i className="fa fa-envelope"></i>
                  <span className="badge badge-success nav-unread"></span>
                </span>
                <div
                  className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow${mailMenu ? " show dMail" : ""
                    }`}
                >
                  <ul className="right_chat list-unstyled w350 px-4">
                    <li className="online">
                      <Link href="/" className="media">
                        <img
                          className="media-object"
                          src="../assets/images/xs/avatar4.jpg"
                          alt="avatar"
                        />
                        <div className="media-body">
                          <span className="name">Donald Gardner</span>
                          <div className="message">
                            It is a long established fact that a reader
                          </div>
                          <small>11 mins ago</small>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </Link>
                    </li>

                    <li className="offline">
                      <Link href="/" className="media">
                        <img
                          className="media-object "
                          src="../assets/images/xs/avatar2.jpg"
                          alt="avatar"
                        />
                        <div className="media-body">
                          <span className="name">Matt Rosales</span>
                          <div className="message">
                            Contrary to popular belief, Lorem Ipsum is not
                            simply
                          </div>
                          <small>27 mins ago</small>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </Link>
                    </li>
                    <li className="online">
                      <Link href="/" className="media">
                        <img
                          className="media-object "
                          src="../assets/images/xs/avatar3.jpg"
                          alt="avatar"
                        />
                        <div className="media-body">
                          <span className="name">Phillip Smith</span>
                          <div className="message">
                            It has roots in a piece of classical Latin
                            literature from 45 BC
                          </div>
                          <small>33 mins ago</small>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <div className="dropdown-divider"></div>
                  <Link
                    href="/"
                    className="dropdown-item text-center text-muted-dark readall"
                  >
                    Mark all as read
                  </Link>
                </div>
              </div>

              {/* Notifications Dropdown */}
              <div className={`dropdown d-flex${notificationMenu ? " show" : ""}`}>
                <span
                  className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    notificationMenuAction(!notificationMenu);
                    mailMenuAction(false);
                    profileMenuAction(false);
                  }}
                >
                  <i className="fa fa-bell"></i>
                  <span className="badge badge-primary nav-unread"></span>
                </span>

                <div
                  className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow${notificationMenu ? " show dNoti" : ""}`}
                >
                  <ul className="list-unstyled feeds_widget">
                    {(() => {

                      const userNotifications = notifications.filter(
                        (n) => n.teacherId === user?._id || n.senderId === user?._id
                      );


                      const uniqueNotifications = Array.from(
                        new Map(userNotifications.map((n) => [n.enquiryId, n])).values()
                      );

                      if (uniqueNotifications.length === 0) {
                        return (
                          <li className="text-center text-muted py-2">
                            No notifications yet
                          </li>
                        );
                      }


                      return uniqueNotifications.map((n) => (
                        <li key={n._id}>
                          <div className="feeds-left">
                            <span className="avatar avatar-blue">
                              <i className="fa fa-bell"></i>
                            </span>
                          </div>
                          <div className="feeds-body ml-3">
                            <p className="text-muted mb-0">{n.message}</p>
                            <small className="text-gray">
                              {new Date(n.createdAt).toLocaleString()}
                            </small>
                          </div>
                        </li>
                      ));
                    })()}
                  </ul>

                  <div className="dropdown-divider"></div>
                  <span className="dropdown-item text-center text-muted-dark readall">
                    Mark all as read
                  </span>
                </div>
              </div>


              {/* Profile Dropdown */}
              <div
                className={`dropdown d-flex${profileMenu ? " show" : ""}`}
              >
                <span
                  className="chip ml-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    profileMenuAction(!profileMenu);
                    mailMenuAction(false);
                    notificationMenuAction(false);
                  }}
                >
                  <img className="avatar" src={profile_picture} alt="" />
                  {`${first_name} ${last_name}`}
                </span>
                <div
                  className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow${profileMenu ? " show dProfile" : ""
                    }`}
                >
                  <Link className="dropdown-item" href="/viewuser">
                    <i className="dropdown-icon fe fe-user"></i> Profile
                  </Link>
                  <Link className="dropdown-item" href="/email">
                    <span className="float-right">
                      <span className="badge badge-primary">6</span>
                    </span>
                    <i className="dropdown-icon fe fe-mail"></i> Inbox
                  </Link>
                  <span className="dropdown-item">
                    <i className="dropdown-icon fe fe-send"></i> Message
                  </span>
                  <div className="dropdown-divider"></div>
                  <span className="dropdown-item">
                    <i className="dropdown-icon fe fe-help-circle"></i> Need
                    help?
                  </span>
                  <Link className="dropdown-item" href="/login">
                    <i className="dropdown-icon fe fe-log-out"></i> Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Redux connections
const mapStateToProps = (state) => ({
  boxShadow: state.settings.isBoxShadow,
  profileMenu: state.settings.isProfileMenu,
  pagesMenu: state.settings.isPagesMenu,
  mailMenu: state.settings.isMailMenu,
  languageMenu: state.settings.isLanguageMenu,
  authMenu: state.settings.isAuthMenu,
  fixNavbar: state.settings.isFixNavbar,
  darkHeader: state.settings.isDarkHeader,
  notificationMenu: state.settings.isNotificationMenu,
  isDarkMode: state.settings.isDarkMode,
  isDarkHeader: state.settings.isDarkHeader,
  isDarkSidebar: state.settings.isDarkSidebar,
  isMinSidebar: state.settings.isMinSidebar,
  userProfile: state.authenticationReducer.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  authMenuAction: (e) => dispatch(authMenuAction(e)),
  notificationMenuAction: (e) => dispatch(notificationMenuAction(e)),
  languageMenuAction: (e) => dispatch(languageMenuAction(e)),
  mailMenuAction: (e) => dispatch(mailMenuAction(e)),
  profileMenuAction: (e) => dispatch(profileMenuAction(e)),
  pagesMenuAction: (e) => dispatch(pagesMenuAction(e)),
  darkModeAction: (e) => dispatch(darkModeAction(e)),
  darkHeaderAction: (e) => dispatch(darkHeaderAction(e)),
  darkSidebarAction: (e) => dispatch(darkSidebarAction(e)),
  darkMinSidebarAction: (e) => dispatch(darkMinSidebarAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
