import React, { Component } from 'react';
import Fullcalender from '../../common/fullcalender';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

export default class PageProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1
		};
	}
	render() {
		const { activeTab } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">My Profile</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Pages</a></li>
									<li className="breadcrumb-item active" aria-current="page">My Profile</li>
								</ol>
							</div>
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										Calendar
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Timeline
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Profile
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 4 })}
										onClick={() => this.setState({ activeTab: 4 })}
									>
										Blog
    			               </NavLink>
								</NavItem>
							</Nav>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row clearfix">
							<div className="col-lg-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="widgets1">
											<div className="icon">
												<i className="icon-trophy text-success font-30"></i>
											</div>
											<div className="details">
												<h6 className="mb-0 font600">Total Earned</h6>
												<span className="mb-0">$96K +</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="widgets1">
											<div className="icon">
												<i className="icon-heart text-warning font-30"></i>
											</div>
											<div className="details">
												<h6 className="mb-0 font600">Total Likes</h6>
												<span className="mb-0">6,270</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="widgets1">
											<div className="icon">
												<i className="icon-handbag text-danger font-30"></i>
											</div>
											<div className="details">
												<h6 className="mb-0 font600">Delivered</h6>
												<span className="mb-0">720 Delivered</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="widgets1">
											<div className="icon">
												<i className="icon-user text-primary font-30"></i>
											</div>
											<div className="details">
												<h6 className="mb-0 font600">Jobs</h6>
												<span className="mb-0">614</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12">
								<TabContent activeTab={activeTab}>
									<TabPane tabId={1} className={classnames(['fade show'])}>
										<div className="card">
											<div className="card-body">
												<Fullcalender />
											</div>
										</div>
									</TabPane>
									<TabPane tabId={2} className={classnames(['fade show'])}>
										<div className="card">
											<div className="card-header">
												<h3 className="card-title">Activity</h3>
												<div className="card-options">
													<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
													<a  className="card-options-fullscreen" data-toggle="card-fullscreen"><i className="fe fe-maximize"></i></a>
													<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
													<div className="item-action dropdown ml-2">
														<a  data-toggle="dropdown"><i className="fe fe-more-vertical"></i></a>
														<div className="dropdown-menu dropdown-menu-right">
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-eye"></i> View Details </a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-share-alt"></i> Share </a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-cloud-download"></i> Download</a>
															<div className="dropdown-divider"></div>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-copy"></i> Copy to</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-folder"></i> Move to</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-edit"></i> Rename</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-trash"></i> Delete</a>
														</div>
													</div>
												</div>
											</div>
											<div className="card-body">
												<div className="timeline_item ">
													<img className="tl_avatar" src="../assets/images/xs/avatar1.jpg" alt="" />
													<span><a >Elisse Joson</a> San Francisco, CA <small className="float-right text-right">20-April-2019 - Today</small></span>
													<h6 className="font600">Hello, &apos; Im a single div responsive timeline without media Queries!</h6>
													<div className="msg">
														<p>I&apos;m speaking with myself, number one, because I have a very good brain and I&apos;ve said a lot of things. I write the best placeholder text, and I&apos;m the biggest developer on the web card she has is the Lorem card.</p>
														<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 12 Love</a>
														<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i className="fa fa-comments"></i> 1 Comment</a>
														<div className="collapse p-4 section-gray show" id="collapseExample">
															<form className="well">
																<div className="form-group">
																	<textarea rows="2" className="form-control no-resize" placeholder="Enter here for tweet..."></textarea>
																</div>
																<button className="btn btn-primary">Submit</button>
															</form>
															<ul className="recent_comments list-unstyled mt-4 mb-0">
																<li>
																	<div className="avatar_img">
																		<img className="avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
																	</div>
																	<div className="comment_body">
																		<h5>Donald Gardner <small className="float-right font-14">Just now</small></h5>
																		<p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className="timeline_item ">
													<img className="tl_avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
													<span><a  title="">Dessie Parks</a> Oakland, CA <small className="float-right text-right">19-April-2019 - Yesterday</small></span>
													<h6 className="font600">Oeehhh, that &apos; s awesome.. Me too!</h6>
													<div className="msg">
														<p>I &apos; m speaking with myself, number one, because I have a very good brain and I &apos;ve said a lot of things. on the web by far... While that &apos;s mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.</p>
														<div className="timeline_img mb-20">
															<img className="width100" src="../assets/images/gallery/1.jpg" alt="Awesome" />
															<img className="width100" src="../assets/images/gallery/2.jpg" alt="Awesome" />
														</div>
														<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 23 Love</a>
														<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"><i className="fa fa-comments"></i> 2 Comment</a>
														<div className="collapse p-4 section-gray" id="collapseExample1">
															<form className="well">
																<div className="form-group">
																	<textarea rows="2" className="form-control no-resize" placeholder="Enter here for tweet..."></textarea>
																</div>
																<button className="btn btn-primary">Submit</button>
															</form>
															<ul className="recent_comments list-unstyled mt-4 mb-0">
																<li>
																	<div className="avatar_img">
																		<img className="avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
																	</div>
																	<div className="comment_body">
																		<h5>Donald Gardner <small className="float-right font-14">Just now</small></h5>
																		<p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
																		<div className="timeline_img mb-20">
																			<img className="width150" src="../assets/images/gallery/7.jpg" alt="Awesome" />
																			<img className="width150" src="../assets/images/gallery/8.jpg" alt="Awesome" />
																		</div>
																	</div>
																</li>
																<li>
																	<div className="avatar_img">
																		<img className="avatar" src="../assets/images/xs/avatar3.jpg" alt="" />
																	</div>
																	<div className="comment_body">
																		<h5>Dessie Parks <small className="float-right font-14">1min ago</small></h5>
																		<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking</p>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div className="timeline_item ">
													<img className="tl_avatar" src="../assets/images/xs/avatar7.jpg" alt="" />
													<span><a  title="" >Rochelle Barton</a> San Francisco, CA <small className="float-right text-right">12-April-2019</small></span>
													<h6 className="font600">An Engineer Explains Why You Should Always Order the Larger Pizza</h6>
													<div className="msg">
														<p>I&apos; m speaking with myself, number one, because I have a very good brain and I&apos;ve said a lot of things. I write the best placeholder text, and I&apos;m the biggest developer on the web by far... While that&apos;s mock-ups and this is politics, is the Lorem card.</p>
														<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 7 Love</a>
														<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"><i className="fa fa-comments"></i> 1 Comment</a>
														<div className="collapse p-4 section-gray" id="collapseExample2">
															<form className="well">
																<div className="form-group">
																	<textarea rows="2" className="form-control no-resize" placeholder="Enter here for tweet..."></textarea>
																</div>
																<button className="btn btn-primary">Submit</button>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</TabPane>
									<TabPane tabId={3} className={classnames(['fade show'])}>
										<div className="card">
											<div className="card-header">
												<h3 className="card-title">Edit Profile</h3>
												<div className="card-options">
													<a  className="card-options-fullscreen" data-toggle="card-fullscreen"><i className="fe fe-maximize"></i></a>
													<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
													<div className="item-action dropdown ml-2">
														<a  data-toggle="dropdown"><i className="fe fe-more-vertical"></i></a>
														<div className="dropdown-menu dropdown-menu-right">
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-eye"></i> View Details </a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-share-alt"></i> Share </a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-cloud-download"></i> Download</a>
															<div className="dropdown-divider"></div>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-copy"></i> Copy to</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-folder"></i> Move to</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-edit"></i> Rename</a>
															<a  className="dropdown-item"><i className="dropdown-icon fa fa-trash"></i> Delete</a>
														</div>
													</div>
												</div>
											</div>
											<div className="card-body form-horizontal">
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Company <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Username <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Email address <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Address <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" placeholder="Home Address" value="455 S. Airport St. Moncks Corner" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">City <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Postal Code <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">Country <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<select className="form-control custom-select">
															<option value="">USA</option>
														</select>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-md-3 col-form-label">About Me <span className="text-danger">*</span></label>
													<div className="col-md-7">
														<textarea rows="5" className="form-control" placeholder="Here can be your description">Oh so, your weak rhyme You doubt I&apos;ll bother, reading into it I&apos;ll probably won&apos;t, left to my own devices But that&apos;s the difference in our opinions.</textarea>
													</div>
												</div>
											</div>
											<div className="card-footer text-right">
												<button type="submit" className="btn btn-primary">Update Profile</button>
											</div>
										</div>
									</TabPane>
									<TabPane tabId={4} className={classnames(['fade show'])}>
										<div className="card">
											<div className="card-body">
												<div className="new_post">
													<div className="form-group">
														<textarea rows="4" className="form-control no-resize" placeholder="Please type what you want..."></textarea>
													</div>
													<div className="mt-4 text-right">
														<button className="mr-1 btn btn-warning"><i className="icon-link"></i></button>
														<button className="mr-1 btn btn-warning"><i className="icon-camera"></i></button>
														<button className="btn btn-primary">Post</button>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="card blog_single_post">
													<div className="img-post">
														<img className="d-block img-fluid" src="../assets/images/gallery/6.jpg" alt="First slide" />
													</div>
													<div className="card-body">
														<h4><a >All photographs are accurate</a></h4>
														<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
													</div>
													<div className="footer">
														<div className="actions">
															<a  className="btn btn-outline-secondary">Continue Reading</a>
														</div>
														<ul className="stats list-unstyled">
															<li><a >General</a></li>
															<li><a  className="icon-heart"> 28</a></li>
															<li><a  className="icon-bubbles"> 128</a></li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card blog_single_post">
													<div className="img-post">
														<img className="d-block img-fluid" src="../assets/images/gallery/4.jpg" alt="First slide" />
													</div>
													<div className="card-body">
														<h4><a >All photographs are accurate</a></h4>
														<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
													</div>
													<div className="footer">
														<div className="actions">
															<a  className="btn btn-outline-secondary">Continue Reading</a>
														</div>
														<ul className="stats list-unstyled">
															<li><a >General</a></li>
															<li><a  className="icon-heart"> 28</a></li>
															<li><a  className="icon-bubbles"> 128</a></li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card blog_single_post">
													<div className="img-post">
														<img className="d-block img-fluid" src="../assets/images/gallery/1.jpg" alt="First slide" />
													</div>
													<div className="card-body">
														<h4><a >All photographs are accurate</a></h4>
														<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
													</div>
													<div className="footer">
														<div className="actions">
															<a  className="btn btn-outline-secondary">Continue Reading</a>
														</div>
														<ul className="stats list-unstyled">
															<li><a >General</a></li>
															<li><a  className="icon-heart"> 28</a></li>
															<li><a  className="icon-bubbles"> 128</a></li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card blog_single_post">
													<div className="img-post">
														<img className="d-block img-fluid" src="../assets/images/gallery/2.jpg" alt="First slide" />
													</div>
													<div className="card-body">
														<h4><a >All photographs are accurate</a></h4>
														<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
													</div>
													<div className="footer">
														<div className="actions">
															<a  className="btn btn-outline-secondary">Continue Reading</a>
														</div>
														<ul className="stats list-unstyled">
															<li><a >General</a></li>
															<li><a  className="icon-heart"> 28</a></li>
															<li><a  className="icon-bubbles"> 128</a></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</TabPane>
								</TabContent>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
