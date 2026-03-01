import React, { Component } from 'react';
import ToolTip from "../../common/toolTip";

export default class FileManager extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">App Filemanager</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item"><a >App</a></li>
									<li className="breadcrumb-item active" aria-current="page">Filemanager</li>
								</ol>
							</div>
							<button type="button" className="btn btn-primary"><i className="fa fa-cloud-upload mr-2"></i>Upload New</button>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row clearfix">
							<div className="col-lg-12">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Recently Accessed Files</h3>
										<div className="card-options ">
											<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
											<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
										</div>
									</div>
									<div className="card-body">
										<div className="file_folder">
											<a className="mr-1" >
												<div className="icon">
													<i className="fa fa-folder text-success"></i>
												</div>
												<div className="file-name">
													<p className="mb-0 text-muted">Family</p>
													<small>3 File, 1.2GB</small>
												</div>
											</a>
											<a className="mr-1" >
												<div className="icon">
													<i className="fa fa-file-word-o text-primary"></i>
												</div>
												<div className="file-name">
													<p className="mb-0 text-muted">Report2017.doc</p>
													<small>Size: 68KB</small>
												</div>
											</a>
											<a >
												<div className="icon">
													<i className="fa fa-file-pdf-o text-danger"></i>
												</div>
												<div className="file-name">
													<p className="mb-0 text-muted">Report2017.pdf</p>
													<small>Size: 68KB</small>
												</div>
											</a>
										</div>
									</div>
								</div>
								<div className="card bg-none b-none">
									<div className="card-body pt-0">
										<div className="table-responsive">
											<table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0">
												<thead>
													<tr>
														<th></th>
														<th>Name</th>
														<th>Share With</th>
														<th>Owner</th>
														<th>Last Update</th>
														<th>File Size</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="width45">
															<i className="fa fa-folder"></i>
														</td>
														<td>
															<span className="folder-name">Work</span>
														</td>
														<td>
															<div className="avatar-list avatar-list-stacked">
																<ToolTip id="id0" text="Avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar2.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar3.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
															</div>
														</td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>Oct 7, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> - </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-folder"></i>
														</td>
														<td>
															<span className="folder-name">Family</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>Oct 17, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> - </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-folder text-danger"></i>
														</td>
														<td>
															<span className="folder-name">Holidays</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>John</span>
														</td>
														<td className="width100">
															<span>Oct 18, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 50MB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-folder"></i>
														</td>
														<td>
															<span className="folder-name">Mobile Work </span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>April 7, 2019</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 1GB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-folder"></i>
														</td>
														<td>
															<span className="folder-name">Photoshop Data</span>
														</td>
														<td>
															<div className="avatar-list avatar-list-stacked">
																<ToolTip id="id0" text="Avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
															</div>
														</td>
														<td className="width100">
															<span>Andrew</span>
														</td>
														<td className="width100">
															<span>Nov 23, 2019</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> - </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-folder text-danger"></i>
														</td>
														<td>
															<span className="folder-name">Holidays</span>
														</td>
														<td>
															<div className="avatar-list avatar-list-stacked">
																<ToolTip id="id0" text="Avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />
																<img className="avatar avatar-sm" src="../assets/images/xs/avatar1.jpg" data-tip data-for="id0" title="Avatar" alt="avatar" />]
															</div>
														</td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>Dec 5, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 100MB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-file-excel-o text-success"></i>
														</td>
														<td>
															<span className="folder-name">new timesheet.xlsx</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>Dec 5, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 52KB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-file-word-o text-warning"></i>
														</td>
														<td>
															<span className="folder-name">new project.doc</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>May 5, 2019</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 152KB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-file-pdf-o text-warning"></i>
														</td>
														<td>
															<span className="folder-name">report.pdf</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>May 2, 2019</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 841KB </span>
														</td>
													</tr>
													<tr>
														<td className="width45">
															<i className="fa fa-file-pdf-o text-warning"></i>
														</td>
														<td>
															<span className="folder-name">report-2018.pdf</span>
														</td>
														<td>
															-
                                                </td>
														<td className="width100">
															<span>Me</span>
														</td>
														<td className="width100">
															<span>Oct 16, 2018</span>
														</td>
														<td className="width100 text-center">
															<span className="size"> 541KB </span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}



