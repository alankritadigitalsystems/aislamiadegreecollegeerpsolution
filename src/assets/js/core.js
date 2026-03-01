"use strict";

import $ from "jquery";
import "jquery-sparkline";
import "metismenu";
import "bootstrap";
import "list.js";

/** Constant div card */
const DIV_CARD = "div.card";

setTimeout(() => {
  $(".page-loader-wrapper").fadeOut();
}, 50);

$(".dropdown-menu").on("click", (e) => {
  e.stopPropagation();
});

/** Initialize tooltips */
$('[data-toggle="tooltip"]').tooltip();

/** Initialize popovers */
$('[data-toggle="popover"]').popover({
  html: true,
});

/** Remove card */
$('[data-toggle="card-remove"]').on("click", (e) => {
  const card = $(e.currentTarget).closest(DIV_CARD);
  card.remove();
  e.preventDefault();
});

/** Collapse card */
$('[data-toggle="card-collapse"]').on("click", (e) => {
  const card = $(e.currentTarget).closest(DIV_CARD);
  card.toggleClass("card-collapsed");
  e.preventDefault();
});

/** Fullscreen card */
$('[data-toggle="card-fullscreen"]').on("click", (e) => {
  const card = $(e.currentTarget).closest(DIV_CARD);
  card.toggleClass("card-fullscreen").removeClass("card-collapsed");
  e.preventDefault();
});

/** Sparkline init */
if ($("[data-sparkline]").length) {
  const generateSparkline = ($elem, data, params) => {
    $elem.sparkline(data, {
      type: $elem.attr("data-sparkline-type"),
      height: "100%",
      barColor: params.color,
      lineColor: params.color,
      fillColor: "transparent",
      spotColor: params.color,
      spotRadius: 0,
      lineWidth: 2,
      highlightColor: params.color,
      highlightLineColor: "#666",
      defaultPixelsPerValue: 5,
    });
  };

  $("[data-sparkline]").each((_, el) => {
    const chart = $(el);
    generateSparkline(
      chart,
      JSON.parse(chart.attr("data-sparkline") || "[]"),
      { color: chart.attr("data-sparkline-color") }
    );
  });
}

/** Circle charts */
if ($(".chart-circle").length) {
  $(".chart-circle").each((_, el) => {
    const circle = $(el);
    circle.circleProgress({
      fill: { color: "indigo" },
      size: circle.height(),
      startAngle: -Math.PI / 4 * 2,
      emptyFill: "#F4F4F4",
      lineCap: "round",
    });
  });
}

/** block-header bar chart */
$(".bh_income").sparkline("html", {
  type: "bar",
  height: "30px",
  barColor: "#6435c9",
  barWidth: 5,
});

$(".bh_traffic").sparkline("html", {
  type: "bar",
  height: "30px",
  barColor: "#e03997",
  barWidth: 5,
});

const alterClass = () => {
  const ww = document.body.clientWidth;
  if (ww < 1530) $("body").addClass("close_rightbar");
  else $("body").removeClass("close_rightbar");
};

$(window).on("resize", alterClass);
alterClass();

$("a.right_tab").on("click", () => {
  $("body").toggleClass("right_tb_toggle");
});

/** Skin changer */
$(".choose-skin li").on("click", (e) => {
  const body = $("body");
  const el = $(e.currentTarget);

  const existTheme = $(".choose-skin li.active").data("theme");

  $(".choose-skin li").removeClass("active");
  body.removeClass("theme-" + existTheme);
  el.addClass("active");
  body.addClass("theme-" + el.data("theme"));
});

/** table-filter */
$(document).ready(() => {
  $(".star").on("click", (e) => {
    $(e.currentTarget).toggleClass("star-checked");
  });

  $(".ckbox label").on("click", (e) => {
    $(e.currentTarget).parents("tr").toggleClass("selected");
  });

  $(".btn-filter").on("click", (e) => {
    const target = $(e.currentTarget).data("target");
    if (target !== "all") {
      $(".table tr").hide();
      $(`.table tr[data-status="${target}"]`).fadeIn("slow");
    } else {
      $(".table tr").hide().fadeIn("slow");
    }
  });
});

/** Sidebar Setting */
$(function () {
  $(".sidebar-nav").metisMenu();

  $(".menu_toggle").on("click", () => {
    $("body").toggleClass("offcanvas-active");
  });

  $(".chat_list_btn").on("click", () => {
    $(".chat_list").toggleClass("open");
  });

  $(".menu_option").on("click", () => {
    $(".metismenu").toggleClass("grid");
    $(".menu_option").toggleClass("active");
  });

  $(".user_btn").on("click", () => {
    $(".user_div").toggleClass("open");
  });

  $(".right_chat li a, .user_chatbody .chat_close").on("click", () => {
    $(".user_chatbody").toggleClass("open");
  });

  $("a.settingbar").on("click", () => {
    $(".right_sidebar").toggleClass("open");
  });

  $("a.theme_btn").on("click", () => {
    $(".theme_div").toggleClass("open");
  });

  $(".page").on("click", () => {
    $(".theme_div, .right_sidebar").removeClass("open");
    $(".user_div").removeClass("open");
  });

  $(".theme_switch").on("click", () => {
    $("body").toggleClass("theme-dark");
  });
});

/** Search list */
$(function () {
  const options = {
    valueNames: ["name", "born"],
  };
  new List("users", options);
});

window.anchor = {
  colors: {
    "theme1-one": "#6435c9",
    "theme1-two": "#f66d9b",
    blue: "#467fcf",
    indigo: "#6435c9",
    purple: "#a55eea",
    pink: "#f66d9b",
    red: "#e74c3c",
    orange: "#fd9644",
    yellow: "#f1c40f",
    lime: "#7bd235",
    green: "#5eba00",
    teal: "#2bcbba",
    cyan: "#17a2b8",
    gray: "#868e96",
    "gray-100": "#E8E9E9",
    "gray-200": "#D1D3D4",
    "gray-300": "#BABDBF",
    "gray-400": "#808488",
    "gray-500": "#666A6D",
    "gray-600": "#4D5052",
    "gray-700": "#333537",
    "gray-800": "#292b30",
    "gray-900": "#1C1D1E",
  },
};
