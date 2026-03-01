import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Nav, NavLink, NavItem } from "reactstrap";
import ProfileForm from '../../Shared/ProfileForm';
import { createUser, verifyUser, dispatchVerifyActions } from '../../api/dashboardApi';
import NoPermission from '../../common/NoPermission';

const AddUser = ({permissions = {}, isSuperAdmin}) => {
    const [activeTab, setActiveTab] = useState(1);
	const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { authenticationReducer: { userProfile } = {} } = state;
    const {create, read} = permissions;
    const { faculty_id } = userProfile;
    const {dashboardReducer: {
        creatingUser, 
        isVerifyingUser, 
        verificationSuccess, 
        verifyApiCalled} = {}} = state;
    
    if (!read && !isSuperAdmin) {
        return <NoPermission />;
    }

    return (
        <Fragment>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center ">
                        <div className="header-action">
                            <h1 className="page-title">Add User</h1>
                            <ol className="breadcrumb page-breadcrumb">
                                <li className="breadcrumb-item"><span>Amiruddaula Islamia Degree College</span></li>
                                <li className="breadcrumb-item active" aria-current="page">Add new user</li>
                            </ol>
                        </div>
                        <Nav tabs className="page-header-tab">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === 1 })}
                                    onClick={() => setActiveTab(1)}
                                >
                                    Information
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === 2 })}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Upload Documents
                                </NavLink>
                                
                            </NavItem>
                            
                        </Nav>
                    </div>
					{(!isSuperAdmin && !create) && <div className='mt-2' style={{color: "red"}}>*Note: You don &apos; t have permission to create faculty accounts. Please contact administrator.</div>}
                </div>
            </div>
            <ProfileForm
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                createUser={(e, cb, ecb) => dispatch(createUser(e, cb, ecb))}
                creatingUser={creatingUser}
                verifyUser={(e) => dispatch(verifyUser(e, faculty_id))}
                verificationSuccess={verificationSuccess}
                isVerifyingUser={isVerifyingUser}
                dispatchVerifyActions={() => dispatch(dispatchVerifyActions())}
                verifyApiCalled={verifyApiCalled}
                permissions={permissions}
                isSuperAdmin={isSuperAdmin}
            />
        </Fragment>
    );
}

export default AddUser;


