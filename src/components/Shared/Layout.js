"use client";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Login from "../Authentication/login";
import { useRouter, usePathname } from "next/navigation";

const Layout = ({ props = {} }) => {
  const router = useRouter();
  const pathname = usePathname();
  const state = useSelector((state) => state) || {};

  const {
    authenticationReducer: {
      isLoginSuccess,   // ✅ Correct key name
      isSuperAdmin,
      isDefaultPassword,
      passwordResetSuccess,
    } = {},
  } = state;

  const publicRoutes = [
    "/erp/login",
    "/erp/signup",
    "/erp/forgotpassword",
    "/erp/faculty/signup",
  ];

  // ✅ Don't wrap login routes in layout
  if (publicRoutes.includes(pathname)) {
    return <Fragment>{props.children}</Fragment>;
  }

  const renderContent = () => {
    if (
      isLoginSuccess && 
      (!isDefaultPassword || (isDefaultPassword && passwordResetSuccess))
    ) {
      return (
        <div id="main_content">
          <Menu {...props} router={router} isSuperAdmin={isSuperAdmin} />
        </div>
      );
    } else {
      return <Login navigate={router} />;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
};

export default Layout;
