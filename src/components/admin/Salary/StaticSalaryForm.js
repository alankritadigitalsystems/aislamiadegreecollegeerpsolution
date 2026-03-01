import React, { Fragment, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

function addScript(url) {
    const script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    document.head.appendChild(script);
}
addScript('https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');

const StaticSalaryForm = ({ salarySlipData: values, selectedMonth, selectedYear, profileData }) => {
  const onButtonClick = () => {
    // verifyAndSearchUser(values.faculty_id);
    alert("on button click handler");
  };

  const renderAbbr = () => {
    return (
      <Fragment>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">PF:</div>
          <div className="bd-highlight">Providient Fund</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">HRA:</div>
          <div className="bd-highlight">House Rent Allowance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">DA:</div>
          <div className="bd-highlight">Dearness allowance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">CA:</div>
          <div className="bd-highlight">City Allowance</div>
        </div>

        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GPF:</div>
          <div className="bd-highlight">General Provident Fund</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">LIC:</div>
          <div className="bd-highlight">Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GPFL:</div>
          <div className="bd-highlight">General Provident Fund Loan</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GLIC:</div>
          <div className="bd-highlight">Group Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">GSLI:</div>
          <div className="bd-highlight">Group Scheme Life Insurance</div>
        </div>
        <div className="d-flex bd-highlight">
          <div className="w-10 bd-highlight">ITax:</div>
          <div className="bd-highlight">Income Tax</div>
        </div>
      </Fragment>
    );
  };

  const downloadBtnClickHandler = () => {
    var target = document.getElementById('salary-static-form');
    target.title = `${selectedMonth} ${selectedYear}`;
    var printContents = target.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  const renderContent = () => {
    return (
      <div className="card">
        <div
          className="card-header"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 className="card-title">
              Below is the salary slip for:&nbsp;
              <span
                className="font-weight-bold"
                style={{ textDecoration: "underline" }}
              >
                {selectedMonth}&apos;{selectedYear}
              </span>
            </h3>
          </div>
          <div onClick={() => downloadBtnClickHandler()}>
            <h6 style={{ float: "right", cursor: "pointer" }}>
              Download pdf
              <DownloadIcon />
            </h6>
          </div>
        </div>
        <div className="card-body">
          {renderSalaryForm2()}
          <hr className="section-hr" />
          <div className="mt-4">
            {renderAbbr()}
            <div onClick={() => downloadBtnClickHandler()}>
              <h6
                style={{ float: "left", paddingTop: "2rem", cursor: "pointer" }}
              >
                Download pdf
                <DownloadIcon />
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSalaryForm2 = () => {
    return (
      <Box sx={{ display: "contents" }} id="salary-static-form">
        <div id="top" style={{ display: "flex", flexDirection: "row" }}>
          <div
            id="left"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>College ID:</label>
              {values.faculty_id}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>First Name:</label>
              {profileData.full_name.first_name}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Last Name:</label>
              {profileData.full_name.last_name}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Department:</label>
              {profileData.department}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Joining Date:</label>
              {profileData.date_of_joining && new Date(profileData.date_of_joining)?.toISOString().substring(0, 10)}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Email:</label>
              {profileData.email_id}
            </div>
          </div>
          <div
            id="right"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Gender:</label>
              {profileData.gender}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Teaching/Non-teaching:</label>
              {profileData.is_technical ? "Teaching" : "Non-Teaching" || "-"}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Date of birth:</label>
              {profileData.date_of_birth && new Date(profileData.date_of_birth)?.toISOString().substring(0, 10)}
            </div>
            <div className="form-group">
              <label style={{ width: "25%", cursor: "pointer" }}>Phone:</label>
              {profileData.mobile_number}
            </div>
          </div>
        </div>
        <hr className="section-hr" />
        <Typography variant="subtitle1">Earnings:</Typography>
        <br />
        {values.earnings?.length > 0 && (<div id="middle" style={{ display: "flex", flexDirection: "row" }}>
          <div
            id="left"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label title="Basic salary" style={{ width: "25%", cursor: "pointer" }}>
                Basic pay:&nbsp;&#8377;
              </label>
              {values.earnings.filter(val => val.category === "basic")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label title="Dearness allowance" style={{ width: "25%", cursor: "pointer" }}>
                DA:&nbsp;({values.earnings.filter(val => val.category === "DA")[0].percentage}%)
              </label>
              {values.earnings.filter(val => val.category === "DA")[0].calculated_amount}
            </div>
          </div>
          <div
            id="right"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label title="House Rent Allowance" style={{ width: "25%", cursor: "pointer" }}>
                HRA:&nbsp;({values.earnings.filter(val => val.category === "HRA")[0].percentage}%)
              </label>
              {values.earnings.filter(val => val.category === "HRA")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label title="City Allowance" style={{ width: "25%", cursor: "pointer" }}>
                CA:&nbsp;({values.earnings.filter(val => val.category === "CA")[0].percentage}%)
              </label>
              {values.earnings.filter(val => val.category === "CA")[0].calculated_amount}
            </div>
          </div>
        </div>)}
        <hr className="section-hr" />
        <Typography variant="subtitle1">Deductions:</Typography>
        <br />
        {values.deductions?.length > 0 && (<div id="bottom" style={{ display: "flex", flexDirection: "row" }}>
          <div
            id="left"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label title="Provident Fund" style={{ width: "25%", cursor: "pointer" }}>
                PF:&nbsp;({values.deductions.filter(val => val.category === "PF")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "PF")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label title="Life Insurance" style={{ width: "25%", cursor: "pointer" }}>
                LIC:&nbsp;({values.deductions.filter(val => val.category === "LIC")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "LIC")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label title="Group Life Insurance" style={{ width: "25%", cursor: "pointer" }}>
                GLIC:&nbsp;({values.deductions.filter(val => val.category === "GLIC")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "GLIC")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label title="Income Tax" style={{ width: "25%", cursor: "pointer" }}>
                ITax:&nbsp;({values.deductions.filter(val => val.category === "ITax")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "ITax")[0].calculated_amount}
            </div>
          </div>
          <div
            id="right"
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="form-group">
              <label title="General Provident Fund" style={{ width: "25%", cursor: "pointer" }}>
                GPF:&nbsp;({values.deductions.filter(val => val.category === "GPF")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "GPF")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label
                title="General Provident Fund Loan"
                style={{ width: "25%", cursor: "pointer" }}
              >
                GPFL:&nbsp;({values.deductions.filter(val => val.category === "GPFL")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "GPFL")[0].calculated_amount}
            </div>
            <div className="form-group">
              <label
                title="Group Scheme Life Insurance"
                style={{ width: "25%", cursor: "pointer" }}
              >
                GSLI:&nbsp;({values.deductions.filter(val => val.category === "GSLI")[0].percentage}%)
              </label>
              {values.deductions.filter(val => val.category === "GSLI")[0].calculated_amount}
            </div>
          </div>
        </div>)}
        <hr className="section-hr" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">
            Total Earnings: &#8377; 
            {values.total_earnings}
          </Typography>
          <br />
          <Typography variant="subtitle1">
            Total Deductions: &#8377; 
            {values.total_deductions}
          </Typography>
          <br />
          <Typography variant="subtitle1">
            Total net: &#8377; 
            {values.total_net} 
          </Typography>
          <br />
        </div>
      </Box>
    );
  };

  return <Fragment>{renderContent()}</Fragment>;
};

export default StaticSalaryForm;
