import React from 'react';

const NoPermission = () => {
    return (
        <div className='section-body text-center mt-5'>
            <div>
                <h1 className='display-1'>
                    Oops!
                </h1>
            </div>
            <div style={{fontSize: "21px"}}>You do not have permission to access this page.</div>
            <img src='../assets/images/access_denied.png' alt='access-denied'/>
        </div>
    );
}

export default NoPermission;