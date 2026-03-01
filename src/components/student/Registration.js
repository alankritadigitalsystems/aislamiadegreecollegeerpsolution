import React, { Fragment, useEffect } from "react";
import classnames from "classnames";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TabContent, TabPane } from "reactstrap";
import * as Yup from "yup";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stateDistrictList } from "./StateDistrictList";

const initialValues = {
  class: "",
  subjects: {
    first: "",
    second: "",
    third: "",
  },
  intermediate_board_name: "",
  //   intermediate_passing_year: "",
  intermediate_roll_number: "",
  full_name: {
    first_name: "",
    middle_name: "",
    last_name: "",
  },
  father_name: "",
  mother_name: "",
  date_of_birth: "",
  gender: "Male",
  religion: "",
  category: "",
  sub_category: "",
  other_category: "",
  isMinority: false,
  isEWS_category: false,
  nationality: "",
  annual_family_income: "",
  domicile: "",
  domicile_certitificate_number: "",
  isAadharAvailable: true,
  aadhar_number: "",
  special_category: "",
  //address
  state: "",
  district: "",
  address: "",
  pincode: "",
  isCorrespondenceAddressSame: false,
  correspondence_state: "",
  correspondence_district: "",
  correspondence_address: "",
  correspondence_pincode: "",
  mobile_number: "",
  email_id: "",

  //education
  high_school_passing_year: "",
  high_school_board: "",
  high_school_roll_number: "",
  high_school_max_marks: "",
  high_school_marks_obtained: "",

  intermediate_passing_status: "",
  intermediate_isPassed: true,
  intermediate_passing_year: "",

  intermediate_max_marks: "",
  intermediate_marks_obtained: "",
  intermediate_school_name: "",
  //uploaded docs
  passport_photo: "",
  signature: "",
  category_certificate: "",
  domicile_certificate: "",
  aadhar_card: "",
  special_category_certificate: "",
  EWS_category_certificate: "",
};
const phoneRegExp = /[6789]{1}[0-9]{9}$/;

export default function StudentRegistration(props = {}) {
  const {
    activeTab,
    isStaffLogin,
    createUser,
    updateUserProfile,
    dispatchVerifyActions,
    userProfile = {},
    creatingUser,
    updatingFaculty,
    verifyUser,
    verificationSuccess,
    isVerifyingUser,
    verifyApiCalled,
    permissions = {},
    isSuperAdmin,
  } = props;
  const navigate = useNavigate();
  const newValues = { ...initialValues };

  const validateSchema = Yup.object().shape({
    // fullName: Yup.string(),
    father_name: Yup.string(),
    mobile_number: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    faculty_id: Yup.string().required("College Id is required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: () => handleFormSubmit(),
  });

  const handleFormSubmit = () => {
    console.log("form submit handler");
  };
  const { values = {}, errors = {} } = formik;

  const renderPersonalInfoSection = () => {
    return (
      <Fragment>
        <div className="col-md-1 col-sm-12">
          Class:<span style={{ color: "red" }}>*</span>
        </div>
        <div className="col-md-2 col-sm-12">
          <div className="form-check">
            <Field
              name="class"
              className="form-check-input"
              type="radio"
              value="B.A"
            />
            <label>B.A.</label>
          </div>
        </div>
        <div className="col-md-2 col-sm-12">
          <div className="form-check">
            <Field
              name="class"
              className="form-check-input"
              type="radio"
              value="B.Com"
            />
            <label>B.Com.</label>
          </div>
        </div>
        <div className="col-md-2 col-sm-12">
          <div className="form-check">
            <Field
              name="class"
              className="form-check-input"
              type="radio"
              value="B.Sc.(Bio.)"
            />
            <label>B.Sc.(Bio.)</label>
          </div>
        </div>
        <div className="col-md-2 col-sm-12">
          <div className="form-check">
            <Field
              name="class"
              className="form-check-input"
              type="radio"
              value="B.Sc.(Maths)"
            />
            <label>B.Sc.(Maths)</label>
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          Subjects:<span style={{ color: "red" }}>*</span>
        </div>
        <div
          className="col-md-12 mt-2"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="col-md-2 col-sm-12">
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "0.5rem",
              }}
            >
              <label>1.</label>
              <Field
                name="subjects.first"
                className="form-control"
                placeholder="Subject 1"
                type="text"
                value={values.subjects.first}
              />
            </div>
          </div>
          <div className="col-md-2 col-sm-12 ">
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "0.5rem",
              }}
            >
              <label>2.</label>
              <Field
                name="subjects.second"
                className="form-control"
                placeholder="Subject 2"
                type="text"
                value={values.subjects.second}
              />
            </div>
          </div>
          <div className="col-md-2 col-sm-12">
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "0.5rem",
              }}
            >
              <label>3.</label>
              <Field
                name="subjects.third"
                className="form-control"
                placeholder="Subject 3"
                type="text"
                value={values.subjects.third}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>12th Board</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="intermediate_board_name"
              className="form-control"
              placeholder="12th Board name"
              type="text"
              value={values.intermediate_board_name}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>12th passing year</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="intermediate_passing_year"
              className="form-control"
              placeholder="12th passing year"
              type="text"
              value={values.intermediate_passing_year}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Roll no.</label>
            <span style={{ color: "red" }}>*</span>
            {/* <Field
              name="intermediate_roll_number"
              className="form-control"
              placeholder="12th Roll number"
              type="text"
              value={values.intermediate_roll_number}
            /> */}
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>First Name</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="full_name.first_name"
              className="form-control"
              placeholder="First Name"
              type="text"
              value={values.full_name.first_name}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Middle Name</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="full_name.middle_name"
              className="form-control"
              placeholder="Middle Name"
              type="text"
              value={values.full_name.middle_name}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Last Name</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="full_name.last_name"
              className="form-control"
              placeholder="Last Name"
              type="text"
              value={values.full_name.last_name}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Father &apos; s Name </label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="father_name"
              className="form-control"
              placeholder="Father's Name"
              type="text"
              value={values.father_name}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Mother &apos; s Name </label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="mother_name"
              className="form-control"
              placeholder="Mother's Name"
              type="text"
              value={values.mother_name}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>
              Date of Birth<span style={{ color: "red" }}>*</span>
            </label>
            <Field
              name="date_of_birth"
              className="form-control"
              placeholder="Date of Birth"
              type="date"
              value={values.date_of_birth}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>
              Gender<span style={{ color: "red" }}>*</span>
            </label>
            <Field
              as="select"
              name="gender"
              className="form-control"
              value={values.gender}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Religion</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="religion"
              className="form-control"
              placeholder="Religion"
              type="text"
              value={values.religion}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>
              Category<span style={{ color: "red" }}>*</span>
            </label>
            <Field
              as="select"
              name="category"
              className="form-control"
              value={values.category}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="general">General</option>
              <option value="scst">SC/ST</option>
              <option value="obc">OBC</option>
            </Field>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Attach certificate (only if SC/ST)</label>
            <div>
              <input
                disabled={!Boolean(values.category === "scst")}
                id="file"
                name="category_certificate"
                type="file"
                onChange={(event) => {
                  console.log(
                    "category_certificate file",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>
              Sub-Category<span style={{ color: "red" }}>*</span>
            </label>
            <Field
              as="select"
              name="sub_category"
              className="form-control"
              placeholder="Sub category"
              value={values.sub_category}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="girl">Girl</option>
              <option value="handicapped">Handicapped</option>
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>
              Other Category<span style={{ color: "red" }}>*</span>
            </label>
            <Field
              as="select"
              name="other_category"
              className="form-control"
              placeholder="Other category"
              value={values.other_category}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="kashmir">Kashmir</option>
              <option value="NA">Not applicable</option>
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Do you belong to minority category?</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="isMinority"
              className="form-control"
              placeholder="Minority?"
              value={values.isMinority}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Do you belong to EWS Category?</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="isEWS_category"
              className="form-control"
              value={values.isEWS_category}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Attach certificate (if Yes)</label>
            <div>
              <input
                disabled={Boolean(values.isEWS_category === "no")}
                id="file"
                name="EWS_category_certificate"
                type="file"
                onChange={(event) => {
                  console.log(
                    "EWS_category_certificate file",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Nationality</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="nationality"
              className="form-control"
              placeholder="Nationality"
              value={values.nationality}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="Indian">Indian</option>
              <option value="others">Others</option>
            </Field>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>
              Annual family income <span style={{ color: "red" }}>*</span>{" "}
              &nbsp;&#8377;
            </label>
            <Field
              name="annual_family_income"
              className="form-control"
              placeholder="Annual family income"
              type="text"
              value={values.annual_family_income}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Domicile(state)</label>
            <span style={{ color: "red" }}>*</span>
            {/* <Field
              as="select"
              name="domicile"
              className="form-control"
              value={values.domicile}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Field> */}
            <Field
              name="domicile"
              className="form-control"
              placeholder="Domicile"
              type="text"
              value={values.domicile}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Domicile certificate number</label>
            <Field
              name="domicile_certitificate_number"
              className="form-control"
              placeholder="Domicile certitificate no."
              type="text"
              value={values.domicile_certitificate_number}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Attach certificate</label>
            <div>
              <input
                id="file"
                name="domicile_certificate"
                type="file"
                onChange={(event) => {
                  console.log(
                    "domicile_certificate file",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Do you have aadhar card?</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="isAadharAvailable"
              className="form-control"
              value={values.isAadharAvailable}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Aadhar card number</label>
            <Field
              name="aadhar_number"
              className="form-control"
              placeholder="xxxx-xxxx-xxxx"
              type="text"
              maxLength="12"
              value={values.aadhar_number}
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Attach aadhar card</label>
            <div>
              <input
                disabled={Boolean(values.isAadharAvailable === "no")}
                id="file"
                name="aadhar_card"
                type="file"
                onChange={(event) => {
                  console.log("aadhar_card file", event.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Special Category</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="special_category"
              className="form-control"
              value={values.special_category}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="staff">Staff</option>
              <option value="cc">CC</option>
            </Field>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Attach certificate</label>
            <div>
              <input
                id="file"
                name="special_category_certificate"
                type="file"
                onChange={(event) => {
                  console.log(
                    "special_category_certificate file",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  useEffect(() => {
    if (values.isCorrespondenceAddressSame) {
      formik.setFieldValue("correspondence_state", values.state);
      formik.setFieldValue("correspondence_district", values.district);
      formik.setFieldValue("correspondence_address", values.address);
      formik.setFieldValue("correspondence_pincode", values.pincode);

    } else {
      formik.setFieldValue("correspondence_state", "");
      formik.setFieldValue("correspondence_district", "");
      formik.setFieldValue("correspondence_address", "");
      formik.setFieldValue("correspondence_pincode", "");
    }
  }, [values.isCorrespondenceAddressSame, values.state, values.district, values.address, values.pincode])

  const renderAddressSection = () => {
    return (
      <Fragment>
        <div className="card-header add">
          <h3 className="card-title">Address Information</h3>
        </div>
        <div className="col-md-12 mb-2" style={{ textDecoration: "underline" }}>
          Permanent Address
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>State</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="state"
              className="form-control"
              placeholder="State"
              value={values.state}
            >
              {stateDistrictList.map((item, index) => {
                return (
                  <option key={`_${index}__${item.state}`} value={item.state}>
                    {item.state}
                  </option>
                );
              })}
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>District</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="district"
              className="form-control"
              placeholder="District"
              value={values.district}
            >
              {stateDistrictList
                .filter((val) => val.state === values.state)[0]
                ?.districts?.map((item, index) => {
                  return (
                    <option key={`_${index}__${item}`} value={item}>
                      {item}
                    </option>
                  );
                })}
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Pincode</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="pincode"
              className="form-control"
              placeholder="Pincode"
              type="text"
              value={values.pincode}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label> Address</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="address"
              className="form-control"
              placeholder="Address"
              type="text"
              value={values.address}
            />
          </div>
        </div>
        <div className="col-md-12 mb-2" style={{ textDecoration: "underline" }}>
          Correspondence Address
        </div>
        <div className="col-md-12 mb-2" style={{ display: "flex" }}>
          <Field
            type="checkbox"
            name="isCorrespondenceAddressSame"
            className="mt-1 mr-2"
          />
          Same as permanent address?
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>State</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              disabled={values.isCorrespondenceAddressSame}
              as="select"
              name="correspondence_state"
              className="form-control"
              placeholder="State"
              value={values.correspondence_state}
            >
              {stateDistrictList.map((item, index) => {
                return (
                  <option key={`_${index}__${item.state}`} value={item.state}>
                    {item.state}
                  </option>
                );
              })}
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>District</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              disabled={values.isCorrespondenceAddressSame}
              name="correspondence_district"
              className="form-control"
              placeholder="District"
              value={values.correspondence_district}
            >
              {stateDistrictList
                .filter((val) => val.state === values.correspondence_state)[0]
                ?.districts?.map((item, index) => {
                  return (
                    <option key={`_${index}__${item}`} value={item}>
                      {item}
                    </option>
                  );
                })}
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Pincode</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              disabled={values.isCorrespondenceAddressSame}
              name="correspondence_pincode"
              className="form-control"
              placeholder="Pincode"
              type="text"
              value={values.correspondence_pincode}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label> Address</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              disabled={values.isCorrespondenceAddressSame}
              name="correspondence_address"
              className="form-control"
              placeholder="Address"
              type="text"
              value={values.correspondence_address}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Phone </label>
            <span style={{ color: "red" }}>*</span>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">+91</div>
              </div>
              <Field
                name="mobile_number"
                className="form-control"
                placeholder="99999 99999"
                type="text"
                maxLength="10"
                value={values.mobile_number}
              />
            </div>
            {values.mobile_number && errors?.mobile_number && (
              <div className="danger" style={{ color: "red" }}>
                Invalid Pattern
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Email Id</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="email_id"
              className="form-control"
              placeholder="johndoe@example.com"
              type="text"
              value={values.email_id}
            />
          </div>
        </div>
      </Fragment>
    );
  };

  const renderEducationSection = () => {
    return (
      <Fragment>
        <div className="card-header add">
          <h3 className="card-title">Educational Detail</h3>
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>High school passing year</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="high_school_passing_year"
              className="form-control"
              placeholder="YYYY"
              type="text"
              value={values.high_school_passing_year}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>High school board</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="high_school_board"
              className="form-control"
              placeholder="Board name"
              type="text"
              value={values.high_school_board}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>High school roll number</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="high_school_roll_number"
              className="form-control"
              placeholder="Roll no."
              type="text"
              value={values.high_school_roll_number}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>High school maximum marks</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="high_school_max_marks"
              className="form-control"
              placeholder="100"
              type="text"
              value={values.high_school_max_marks}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Marks obtained</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="high_school_marks_obtained"
              className="form-control"
              placeholder="100"
              type="text"
              value={values.high_school_marks_obtained}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Intermediate passing status</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              as="select"
              name="intermediate_passing_status"
              className="form-control"
              placeholder="YYYY"
              value={values.intermediate_passing_status}
            >
              <option default value="--Select--">
                --Select--
              </option>
              <option value="passed">Passed</option>
              <option value="appearing">Appearing</option>
            </Field>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Intermediate maximum marks</label>
            {values.intermediate_passing_status === "passed" && (
              <span style={{ color: "red" }}>*</span>
            )}
            <Field
              name="intermediate_max_marks"
              className="form-control"
              placeholder="100"
              type="text"
              value={values.intermediate_max_marks}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Marks obtained</label>
            {values.intermediate_passing_status === "passed" && (
              <span style={{ color: "red" }}>*</span>
            )}
            <Field
              name="intermediate_marks_obtained"
              className="form-control"
              placeholder="100"
              type="text"
              value={values.intermediate_marks_obtained}
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="form-group">
            <label>Intermediate school name</label>
            <span style={{ color: "red" }}>*</span>
            <Field
              name="intermediate_school_name"
              className="form-control"
              placeholder="School name"
              type="text"
              value={values.intermediate_school_name}
            />
          </div>
        </div>
      </Fragment>
    );
  };

  const renderPictureAndSignatureSection = () => {
    return (
      <Fragment>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Upload your passport sized picture</label>
            <span style={{ color: "red" }}>*</span>
            <div>
              <input
                id="file"
                name="passport_photo"
                type="file"
                onChange={(event) => {
                  console.log(
                    "passport_photo file",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group">
            <label>Upload your signature (scanned)</label>
            <span style={{ color: "red" }}>*</span>
            <div>
              <input
                id="file"
                name="signature"
                type="file"
                onChange={(event) => {
                  console.log("signature file", event.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderForm = () => {
    return (
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
          {renderPersonalInfoSection()}
          <hr className="section-hr" />
          {renderAddressSection()}
          <hr className="section-hr" />
          {renderEducationSection()}
          <hr className="section-hr" />
          {renderPictureAndSignatureSection()}
          <div className="col-sm-12 mt-2 mb-2">
            <button type="submit" className="mr-1 btn btn-primary">
              Register
            </button>
            <button
              type="reset"
              className="btn btn-outline-secondary"
              onClick={() => {
                console.log("register button submit handler", values);
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </FormikProvider>
    );
  };

  return (
    <Fragment>
      <div className="card-body">
        <div className="text-center">
          <div className="header-brand">
            <i className="fa fa-graduation-cap brand-logo"></i>
          </div>
          <div className="card-title mb-3 mt-3">Amiruddaula Islamia Degree College</div>
          <div className="mb-2">
            Pre-Registration UG - Entrance Examination Form 2021-22
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card" style={{ backgroundColor: "#dcdcdc70" }}>
              <div className="card-header">
                <h3 className="card-title">Personal Information</h3>
              </div>
              <div className="card-body mt-4">
                <div className="row clearfix">{renderForm()}</div>
              </div>
            </div>
            <div className="text-center mt-4" style={{ background: "none", border: "0" }}>
              Already having an account?
              <span className="text-primary" onClick={() => navigate("/")} style={{cursor: "pointer"}}>Login</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


