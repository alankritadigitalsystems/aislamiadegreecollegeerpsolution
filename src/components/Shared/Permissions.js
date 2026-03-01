import React, { Fragment, useEffect } from "react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    permissions: [
        {
            code: "create_user",
            name: "Add Faculty",
            permission: {
                create: false,
                update: false,
                read: false,
                delete: false
            }
        },
        {
            code: "news_notice",
            name: "News and Notice",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "holiday",
            name: "Holiday Calendar",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "attendance",
            name: "Attendance",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "subject_and_class",
            name: "Subject and Class",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "timetable",
            name: "Timetable",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "approve_leave",
            name: "Approve leave",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        },
        {
            code: "salary",
            name: "Salary",
            permission: {
                create: false,
                update: false,
                read: true,
                delete: false
            }
        }
    ],
    isSuperAdmin: false
}

const Permissions = ({ formFormik = {}, isFromAddUser = false, submitForm, history, isStaffLogin, creatingUser, verificationSuccess, dispatchVerifyActions,
    permissions: userPermissions = {}, isUserSuperAdmin }) => {

    const {create} = userPermissions;

    useEffect(() => {
        if (isFromAddUser) {
            formFormik.resetForm();
        }
    }, [])

    const handleSubmit = () => {
        if (isFromAddUser) {
            const formPermissions = formatPermissions();
            const formData = { ...formValues };
            const data = removeEmptyFeilds(formData);
            const payload = {
                ...data,
                permissions: formPermissions,
                isSuperAdmin
            }
            submitForm(payload, createUserSuccessCallback, notifyFailure);
        }
    }

    const notify = (id) => toast.success(`New Faculy account is created successfully. Try logging with userId: ${id}`, {
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

    const createUserSuccessCallback = () => {
        const id = formValues.faculty_id;
        formFormik.resetForm();
        formik.resetForm();
        dispatchVerifyActions();
        notify(id);
    }

    const formatPermissions = () => {
        const newPermissions = {};
        permissions.forEach((per) => {
            const { code, permission } = per;
            newPermissions[code] = permission;
        })

        return newPermissions;
    }

    const removeEmptyFeilds = (formData) => {
        if (!formData.password) {
            delete formData.password;
        }

        if (!formData.date_of_joining) {
            delete formData.date_of_joining;
        }

        if (!formData.date_of_retirement) {
            delete formData.date_of_retirement;
        }

        if (formData.is_technical === "Teaching") {
            formData.is_technical = true;
        } else {
            formData.is_technical = false;
        }

        if (!verificationSuccess) {
            formData.reference_faculty = '';
        }

        return formData;
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => handleSubmit()
    });

    const { values: { permissions = {}, isSuperAdmin } = {} } = formik;
    const { values: formValues = {}, errors = {} } = formFormik;
    const isDisabled = isUserSuperAdmin ? false : !create;

    return (
        <Fragment>
            <div className="card-header add">
                <h3 className="card-title">Permissions</h3>
            </div>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                    <div className="table-responsive">
                        <table className="table table mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>CATEGORY</th>
                                    <th>CREATE</th>
                                    <th>READ</th>
                                    <th>UPDATE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map((per, id) => {
                                    const { name } = per;
                                    return (
                                        <tr key={id}>
                                            <td>{name}</td>
                                            <td>
                                                <label className="custom-control custom-checkbox">
                                                    <Field type="checkbox" name={`permissions.${id}.permission.create`} />
                                                </label>
                                            </td>
                                            <td>
                                                <label className="custom-control custom-checkbox">
                                                    <Field type="checkbox" name={`permissions.${id}.permission.read`} />
                                                </label>
                                            </td>
                                            <td>
                                                <label className="custom-control custom-checkbox">
                                                    <Field type="checkbox" name={`permissions.${id}.permission.update`} />
                                                </label>
                                            </td>
                                            <td>
                                                <label className="custom-control custom-checkbox">
                                                    <Field type="checkbox" name={`permissions.${id}.permission.delete`} />
                                                </label>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="form-group mt-3">
                            <label>Is Super Admin ?</label>
                            <Field type="checkbox" name="isSuperAdmin" className="mt-1 ml-4" />
                        </div>
                        {!isStaffLogin && (
                            <div className="col-sm-12 mt-2 mb-2">
                                <button
                                    type="submit"
                                    className="mr-1 btn btn-primary"
                                    disabled={
                                        Object.keys(errors).length || !formValues.mobile_number || !formValues.faculty_id || !formValues.full_name.first_name || creatingUser
                                        || !formValues.is_technical || !verificationSuccess || isDisabled
                                    }
                                >
                                    {creatingUser ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : 'Submit'}
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        if (isFromAddUser) {
                                            formFormik.resetForm();
                                        }
                                        formik.resetForm();
                                        history.push("/");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </Form>
            </FormikProvider>
            <ToastContainer />
        </Fragment>
    );
}

export default Permissions;