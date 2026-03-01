import React, { Fragment, useEffect } from "react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { TabPane } from "reactstrap";
import classnames from 'classnames';
import CustomSelect from './CustomSelect';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    department: '---',
    year: 2022,
    course_name: '',
    course_type: 'Bachelors',
    start_date: '',
    course_duration: 4,
    course_id: '',
    class_of: '',
    created_at: '',
    updated_at: '',
    email_id: '',
    no_of_semesters: '',
    syllabus: '',
    category: 'Self Funded',
    main_subjects: [],
    additional_subjects: []
};

const CreateClass = ({ getAllSubjects, subjectList = [], createClass, creatingClass, permissions = {}, isSuperAdmin, fetchingSubjects = false }) => {

    useEffect(() => {
        getAllSubjects();
    }, []);

    const validateSchema = Yup.object().shape({
        department: Yup.string().required("Department is required,"),
        year: Yup.number().required("Year is required."),
        course_name: Yup.string().required("Course Name is required."),
        syllabus: Yup.string().required('Syllabus is mandatory.'),
        start_date: Yup.date().required("Start Date is mandatory."),
        course_duration: Yup.string().required("Course duration is mandatory."),
        course_id: Yup.string().required("Course Id is mandatory."),
        no_of_semesters: Yup.number().required("Mandatory")
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: () => handleFormSubmit()
    });

    const handleFormSubmit = () => {
        const payload = { ...values };
        payload.class_of = getClassValue();
        createClass(payload, apiCallback);
    };

    const apiCallback = (isSuccess) => {
        if (isSuccess) {
            notify();
            formik.resetForm();
        } else {
            notifyFailure();
        }
    }

    const notify = () => toast.success(`Class created successfully.`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const notifyFailure = () => toast.error("Unable to create. Please try again....", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    });

    const { values = {} } = formik;
    const mainSubjects = subjectList.filter((subject) => {
        if (!values.additional_subjects.includes(subject.value)) {
            return 1;
        }
        return 0;
    });
    const additionalSubject = subjectList.filter((subject) => {
        if (!values.main_subjects.includes(subject.value)) {
            return 1;
        }
        return 0;
    });

    const getClassValue = () => {
        const { start_date, course_duration } = values || {};
        if (start_date && course_duration) {
            const startDate = new Date(values.start_date);
            const year = startDate.getFullYear();
            const classOf = year + course_duration;
            return classOf;
        }

        return "-";
    }

    const renderForm = () => {
        return (
            <Form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Department</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field as="select" name="department" className="form-control" value={values.department}>
                            <option value="---">---</option>
                            <option value="English">English</option>
                            <option value="History">History</option>
                            <option value="Political Science">Political Science</option>
                            <option value="Economics">Economics</option>
                            <option value="Sanskrit">Sanskrit</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Philosophy">Philosophy</option>
                            <option value="Geography" >Geography</option>
                            <option value="Sociology">Sociology</option>
                            <option value="Education">Education</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Law">LaW</option>
                            <option value="Physical Education">Physical Education</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics">Physics</option>
                            <option value="Botany">Botany</option>
                            <option value="Zoology">Zoology</option>
                            <option value="Office and Library">Office and Library</option>
                            <option value="Fourth Grade">Fourth Grade</option>
                        </Field>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Year</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="year"
                            className="form-control"
                            placeholder="Year"
                            type="number"
                            value={values.year}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Course Name</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="course_name"
                            className="form-control"
                            placeholder="Course Name"
                            type="text"
                            value={values.course_name}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Course Type</label>
                        <Field as="select" name="course_type" className="form-control" value={values.course_type}>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                        </Field>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Course Id</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="course_id"
                            className="form-control"
                            placeholder="Course Id"
                            type="text"
                            value={values.course_id}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>{`Course Duration (Years)`}</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="course_duration"
                            className="form-control"
                            placeholder="Duration"
                            type="number"
                            value={values.course_duration}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Category</label>
                        <Field as="select" name="category" className="form-control" value={values.category}>
                            <option value="Self Funded">Self Funded</option>
                            <option value="Government Aided">Government Aided</option>
                        </Field>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Start Date</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="start_date"
                            className="form-control"
                            placeholder=""
                            type="date"
                            value={values.start_date}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Department Email Id</label>
                        <Field
                            name="email_id"
                            className="form-control"
                            placeholder="cse@college.com"
                            type="text"
                            value={values.email_id}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Number of Semesters</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="no_of_semesters"
                            className="form-control"
                            placeholder=""
                            type="number"
                            value={values.no_of_semesters}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Class of</label>
                        <Field
                            name="class_of"
                            className="form-control"
                            placeholder=""
                            type="number"
                            value={getClassValue()}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Created At</label>
                        <Field
                            name="created_at"
                            className="form-control"
                            placeholder=""
                            type="date"
                            value={values.created_at}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Updated At</label>
                        <Field
                            name="updated_at"
                            className="form-control"
                            placeholder=""
                            type="date"
                            value={values.updated_at}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Main Subjects</label>
                        <Field
                            className="custom-select"
                            name="main_subjects"
                            options={mainSubjects}
                            component={CustomSelect}
                            placeholder="Select multiple Subjects"
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Additional Subjects</label>
                        <Field
                            className="custom-select"
                            name="additional_subjects"
                            options={additionalSubject}
                            component={CustomSelect}
                            placeholder="Select multiple Subjects"
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Syllabus</label>
                        <span style={{ color: "red" }}>*</span>
                        <Field
                            name="syllabus"
                            className="form-control no-resize"
                            placeholder=""
                            type="text"
                            as="textarea"
                            rows="6"
                            value={values.syllabus}
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <button
                        type="submit"
                        className="mr-3 btn btn-primary"
                        disabled={(!isSuperAdmin && !permissions.create) || Object.keys(formik.errors).length || values.department === "---"}
                    >
                        {creatingClass ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Submit'}
                    </button>
                    <button type="button" onClick={() => formik.resetForm()} className="btn btn-outline-secondary btn-default">Cancel</button>
                </div>
            </Form>
        );
    }

    return (
        <Fragment>
            <TabPane tabId={2} className={classnames(['fade show'])}>
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Add Class</h3>
                            {fetchingSubjects && (
                                <span className="ml-3">
                                    <i className="fa fa-circle-o-notch fa-spin fa-fw mr-2"></i>
                                    <span>Fetching Subjects</span>
                                </span>
                            )}
                        </div>
                        <div className="card-body">
                            <div className="row clearfix">
                                <FormikProvider value={formik}>
                                    {renderForm()}
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </TabPane>
        </Fragment>
    );
}

export default CreateClass;