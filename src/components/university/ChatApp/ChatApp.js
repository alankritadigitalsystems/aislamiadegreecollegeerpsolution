import React, { Component } from 'react';
import ToolTip from "../../common/toolTip";

export default class ChatApp extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Chat</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Chat</li>
								</ol>
							</div>
							<ul className="list-unstyled team-info mb-0">
								<li className="mr-4">Rerecent Chat</li>
								<ToolTip id="chat" text="Avtar" />
								<li><img src="../assets/images/xs/avatar1.jpg" data-tip="tooltip" data-for="chat" title="Avatar" alt="Avatar" /></li>
								<li><img src="../assets/images/xs/avatar1.jpg" data-tip="tooltip" data-for="chat" title="Avatar" alt="Avatar" /></li>
								<li><img src="../assets/images/xs/avatar1.jpg" data-tip="tooltip" data-for="chat" title="Avatar" alt="Avatar" /></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="section-body mt-4 chat_app">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="card">
									<div className="card-header bline">
										<h3 className="card-title">Friends Group <small>Last seen: 2 hours ago</small></h3>
										<div className="card-options">
											<a className="p-1 chat_list_btn"><i className="fa fa-align-right"></i></a>
											<a className="p-1"><i className="fa fa-plus"></i></a>
											<a className="p-1"><i className="fa fa-cog"></i></a>
											<a className="p-1"><i className="fa fa-refresh"></i></a>
										</div>
									</div>
									<div className="card-body chat_windows">
										<ul className="mb-0">
											<li className="other-message">
												<img className="avatar mr-3" src="../assets/images/xs/avatar2.jpg" alt="avatar" />
												<div className="message">
													<p className="bg-light-blue">Are we meeting today?</p>
													<span className="time" >10:10 AM, Today</span>
												</div>
											</li>
											<li className="other-message">
												<img className="avatar mr-3" src="../assets/images/xs/avatar3.jpg" alt="avatar" />
												<div className="message">
													<p className="bg-light-cyan">Hi Aiden, how are you? How is the project coming along?</p>
													<p className="bg-light-cyan">Are we meeting today?</p>
													<span className="time" >10:15 AM, Today</span>
												</div>
											</li>
											<li className="my-message">
												<div className="message">
													<p className="bg-light-gray">Project has been already finished and I have results to show you.</p>
													<div className="file_folder">
														<a>
															<div className="icon">
																<i className="fa fa-file-excel-o text-success"></i>
															</div>
															<div className="file-name">
																<p className="mb-0 text-muted">Report2017.xls</p>
																<small>Size: 68KB</small>
															</div>
														</a>
														<a>
															<div className="icon">
																<i className="fa fa-file-word-o text-primary"></i>
															</div>
															<div className="file-name">
																<p className="mb-0 text-muted">Report2017.doc</p>
																<small>Size: 68KB</small>
															</div>
														</a>
													</div>
													<span className="time">10:17 AM, Today</span>
												</div>
											</li>
											<li className="other-message">
												<img className="avatar mr-3" src="../assets/images/xs/avatar4.jpg" alt="avatar" />
												<div className="message">
													<div className="media_img">
														<img src="../assets/images/gallery/1.jpg" className="w150 img-thumbnail" alt="" />
														<img src="../assets/images/gallery/2.jpg" className="w150 img-thumbnail" alt="" />
													</div>
													<span className="time" >10:15 AM, Today</span>
												</div>
											</li>
											<li className="other-message">
												<span className="avatar avatar-blue mr-3">NG</span>
												<div className="message">
													<p className="bg-light-pink">Are we meeting today I have results?</p>
													<p className="bg-light-pink">Project has been already finished and to show you.</p>
													<span className="time" >10:18 AM, Today</span>
												</div>
											</li>
											<li className="my-message">
												<div className="message">
													<p className="bg-light-gray">Well we have good budget for the project</p>
													<span className="time">10:25 AM, Today</span>
												</div>
											</li>
											<li className="my-message">
												<div className="message">
													<div className="media_img">
														<img src="../assets/images/gallery/3.jpg" className="w100 img-thumbnail" alt="" />
														<img src="../assets/images/gallery/4.jpg" className="w100 img-thumbnail" alt="" />
														<img src="../assets/images/gallery/5.jpg" className="w100 img-thumbnail" alt="" />
														<img src="../assets/images/gallery/6.jpg" className="w100 img-thumbnail" alt="" />
													</div>
													<span className="time">10:25 AM, Today</span>
												</div>
											</li>
										</ul>
										<div className="chat-message clearfix">
											<a><i className="icon-camera"></i></a>
											<a><i className="icon-camcorder"></i></a>
											<a><i className="icon-paper-plane"></i></a>
											<div className="input-group mb-0">
												<input type="text" className="form-control" placeholder="Enter text here..." />
											</div>
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



