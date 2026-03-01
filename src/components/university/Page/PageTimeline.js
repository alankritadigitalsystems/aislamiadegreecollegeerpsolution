import React, { Component } from 'react';

export default class PageTimeline extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Timeline</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><span>Pages</span></li>
									<li className="breadcrumb-item active" aria-current="page">Timeline</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row clearfix">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Timeline Activity</h3>
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
											<span><span>Elisse Joson</span> San Francisco, CA <small className="float-right text-right">20-April-2019 - Today</small></span>
											<h6 className="font600">Hello, &apos;Im a single div responsive timeline without media Queries!</h6>
											<div className="msg">
												<p>I&apos;m speaking with myself, number one, because I have a very good brain and I&apos;ve said a lot of things. I write the best placeholder text, and I&apos;m the biggest developer on the web card she has is the Lorem card.</p>
												<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 12 Love</a>
												<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i className="fa fa-comments"></i> 1 Comment</a>
												<div className="collapse p-4 section-gray mt-2" id="collapseExample">
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
																<span>Lorem ipsum Veniam aliquip culpa laboris minim tempor</span>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>

										<div className="timeline_item ">
											<img className="tl_avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
											<span><a  title="">Dessie Parks</a> Oakland, CA <small className="float-right text-right">19-April-2019 - Yesterday</small></span>
											<h6 className="font600">Oeehhh, that&apos;s awesome.. Me too!</h6>
											<div className="msg">
												<p>I&apos;m speaking with myself, number one, because I have a very good brain and I&apos;ve said a lot of things. on the web by far... While that&apos;s mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.</p>
												<div className="timeline_img mb-20">
													<img className="width100" src="../assets/images/gallery/1.jpg" alt="Awesome" />
													<img className="width100" src="../assets/images/gallery/2.jpg" alt="Awesome" />
												</div>
												<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 23 Love</a>
												<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"><i className="fa fa-comments"></i> 2 Comment</a>
												<div className="collapse p-4 section-gray mt-2" id="collapseExample1">
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
																<span>Lorem ipsum Veniam aliquip culpa laboris minim tempor</span>
																<div className="timeline_img mb-20">
																	<img className="width150 rounded img-thumbnail" src="../assets/images/gallery/7.jpg" alt="Awesome" />
																	<img className="width150 rounded img-thumbnail" src="../assets/images/gallery/8.jpg" alt="Awesome" />
																</div>
															</div>
														</li>
														<li>
															<div className="avatar_img">
																<img className="avatar" src="../assets/images/xs/avatar3.jpg" alt="" />
															</div>
															<div className="comment_body">
																<h5>Dessie Parks <small className="float-right font-14">10min ago</small></h5>
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
												<p>I&apos;m speaking with myself, number one, because I have a very good brain and I&apos;ve said a lot of things. I write the best placeholder text, and I&apos;m the biggest developer on the web by far... While that&apos;s mock-ups and this is politics, is the Lorem card.</p>
												<a  className="mr-20 text-muted"><i className="fa fa-heart text-pink"></i> 7 Love</a>
												<a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"><i className="fa fa-comments"></i> 1 Comment</a>
												<div className="collapse p-4 section-gray mt-2" id="collapseExample2">
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
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
