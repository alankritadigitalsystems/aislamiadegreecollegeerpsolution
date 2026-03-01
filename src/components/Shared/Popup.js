import React, { Fragment } from 'react';

const Popup = (props = {}) => {
    const {title = 'Popup Title', content, onCloseClick, showClose = false,  comingFrom=""} = props;

    return (
        <Fragment>
            <div id="open-modal" className="modal-window" onClick={onCloseClick} />
            <div className={comingFrom === "timetable" ? "popup-box-large" : "popup-box"}>
                <div className="popup-title">
                    <h6>{title}</h6>
                    {showClose && <div onClick={onCloseClick} className='mr-2' style={{cursor: "pointer"}}>X</div>}
                </div>
                {content}
            </div>
        </Fragment>
    );
}

export default Popup;