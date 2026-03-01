import React from "react";
import { useDropzone } from 'react-dropzone';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const DropzoneComponent = ({ maxFiles, disable = false, onDrop, accept, uploadType, acceptedFiles, removeFile}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: maxFiles,
        disabled: disable,
        onDrop: onDrop,
        multiple: uploadType !== 'profilePhoto',
        accept: accept
    });

    return (
        <section className={`drop-zone ${acceptedFiles.length ? 'files' : ''}`}>
            {!acceptedFiles.length && (
                <div className="dron-zone-container" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="upload-icon">
                        <i className="fa fa-cloud-upload fa-2x" aria-hidden="true"></i>
                        <div className="browse-link">
                            {isDragActive ? "Drop files to upload" : "Click to Browse"}
                        </div>
                        {disable && (
                            <div className="browse-link disable">
                                Select file type to upload files
                            </div>
                        )}
                    </div>
                </div>
            )}
            {acceptedFiles.length > 0 && (
                <div className="file-details">
                    {acceptedFiles.map((file) => {
                        return (
                            <div className="each-file mb-1" key={file.fileId}>
                                {file.type.includes("image") ? 
                                    <i class="fa fa-file-image-o fa-lg mt-1" aria-hidden="true" style={{color: "cadetblue"}}></i> : 
                                    <i class="fa fa-file-pdf-o fa-lg mt-1" aria-hidden="true" style={{color: "orangered"}}></i>}
                                <ResponsiveEllipsis
                                    text={file.name}
                                    maxLine={1}
                                    className="file-name ml-4"
                                    onClick={() => {window.open(file.preview, "_blank")}}
                                    title={file.name}
                                />
                                <div className="ml-4">{(file.size / (1024*1024)).toFixed(2)}MB</div>
                                <i class="fa fa-trash-o ml-4 mt-1 trash-icon" aria-hidden="true" onClick={() => removeFile(file.fileId)}></i>
                            </div>
                        );
                    })}
                </div>

            )}
        </section>
    );
}

export default DropzoneComponent;
