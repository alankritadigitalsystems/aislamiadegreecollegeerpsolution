"use client";

import React, { useEffect, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux";
import configureStore from "./store";
import {Toaster} from 'sonner'
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/style.min.css";
import "@/assets/css/default.css";
import "@/assets/plugins/nestable/jquery-nestable.css";
import "@/assets/css/login.css";
import "@/assets/css/adduser.css";
import "@/assets/css/popup.css";
import "@/assets/css/timetable.css";
import "./globals.css"; // Keep your global styles last

const { store } = configureStore();

interface RootState {
  settings: {
    isToggleRightBar: boolean;
    isToggleLeftBar: boolean;
    themeColor: string;
    isDarkMode: boolean;
    isDarkSidebar: boolean;
    isIconColor: boolean;
    isGradientColor: boolean;
    isBoxLayout: boolean;
    isRtl: boolean;
    isFont: string;
  };
}

const LayoutWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [closeRightbarClass, setCloseRightbarClass] =
    useState("close_rightbar");
  const leftSidebar = useRef<HTMLDivElement>(null);

  const {
    isBoxLayout,
    isDarkSidebar,
    isGradientColor,
    isIconColor,
    isDarkMode,
    isToggleLeftBar,
    isRtl,
    themeColor,
    isFont,
  } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    // Handle responsive layout toggle
    const ww = document.body.clientWidth;
    setCloseRightbarClass(ww >= 1531 ? "" : "close_rightbar");

    const handleClickOutside = (e: MouseEvent) => {
      if (
        leftSidebar.current &&
        leftSidebar.current.contains(e.target as Node)
      ) {
        // Add behavior if needed
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={leftSidebar}
      className={`
        ${isBoxLayout ? "boxlayout " : ""}
        ${isDarkSidebar ? "sidebar_dark " : ""}
        ${isGradientColor ? "gradient " : ""}
        ${isIconColor ? "iconcolor " : ""}
        ${isDarkMode ? "dark-mode " : ""}
        ${isToggleLeftBar ? "offcanvas-active " : ""} 
        right_tb_toggle 
        ${isRtl ? "rtl " : ""}
        ${isFont} 
        ${closeRightbarClass} 
        theme-${themeColor}
      `}
    >
      {children}
    </div>
  );
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html>
    <body>
      <Provider store={store}>
        <LayoutWrapper>{children}
          <Toaster richColors position="top-right" /></LayoutWrapper>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
