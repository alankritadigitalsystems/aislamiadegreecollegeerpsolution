import React, { Fragment } from 'react';
import DropzoneComponent from '../common/DropzoneExample';

const UploadDocuments = (props = {}) => {
    const { uploadOptions, removeFile, onDrop, onChangeUploadType, uploadType, acceptedFiles = [], rejectedFiles = [], setAcceptedFiles } = props;

    return (
        <Fragment>
            <div className="card-header upload">
                <h3 className="card-title">Upload Documents</h3>
            </div>
            <div className="upload-section">
                <DropzoneComponent
                    maxFiles={uploadType === "profilePhoto" ? 1 : 8}
                    disable={uploadType === "select"}
                    onDrop={onDrop}
                    accept={
                        uploadType === "profilePhoto" ? "image/*" : ".pdf, image/"
                    }
                    uploadType={uploadType}
                    rejectedFiles={rejectedFiles}
                    acceptedFiles={acceptedFiles}
                    removeFile={removeFile}
                />
                <div className="form-wrapper">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group upload">
                            <label>Select File Type</label>
                            <select name="uploadType" className="form-control big" onChange={(e) => onChangeUploadType(e.target.value)}>
                                <option value="select">Select</option>
                                {uploadOptions?.map((option, id) => {
                                    return <option key={`${id}_${option.id}`} value={option.id}>{option.value}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div
                        className="col-md-12"
                        style={{ display: "flex", marginTop: "3rem" }}
                    >
                        <button className="btn btn-outline-secondary upload-btn" onClick={() => setAcceptedFiles([])}>
                            Reset
                        </button>
                    </div>
                    <div className="col-md-12">
                        <button
                            type="submit"
                            className="mr-1 btn btn-primary upload-btn mt-4"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UploadDocuments;