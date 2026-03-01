import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import Link from "next/link"
import classnames from 'classnames';
export default class Email extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			activeTab: 1
		};
	}
	render() {
		const { isOpen, activeTab } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Inbox</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >App</a></li>
									<li className="breadcrumb-item active" aria-current="page">Inbox</li>
								</ol>
							</div>
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										Primary
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Social
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Updates
    			               </NavLink>
								</NavItem>
								<li className="nav-item"><Link href ="/compose" className="btn btn-primary" title="">Compose</Link></li>
							</Nav>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<TabContent activeTab={activeTab}>
							<TabPane tabId={1} className={classnames(['fade show'])}>
								<div className="accordion" id="accordionExample">
									<div className="card inbox unread">
										<div className="card-header" id="headingOne">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button onClick={() => this.setState({ isOpen: !this.state.isOpen })} className={`btn btn-link${isOpen ? ' collapsed' : ''}`} type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Vincentee Porter</button>
											</h5>
											<span className="text_ellipsis xs-hide">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="collapseOne" className={`collapse${isOpen ? ' show' : ''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar1.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<ul>
														<li>standard dummy text ever since the 1500s, when an unknown printer</li>
														<li>Lorem Ipsum has been the industry &apos; s standard dummy</li>
													</ul>
													<p>printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrnturies, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<br />
													<div className="file_folder">
														<a >
															<div className="icon">
																<i className="fa fa-file-excel-o text-success"></i>
															</div>
															<div className="file-name">
																<p className="mb-0 text-muted">Report2017.xls</p>
																<small>Size: 68KB</small>
															</div>
														</a>
														<a >
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

													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading2">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist2" aria-expanded="true" aria-controls="maillist2">Merri Diamond</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist2" className="collapse" aria-labelledby="mailheading2" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar3.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox unread">
										<div className="card-header" id="mailheading3">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist3" aria-expanded="true" aria-controls="maillist3">John Rosenberg</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist3" className="collapse" aria-labelledby="mailheading3" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar5.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading4">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist4" aria-expanded="true" aria-controls="maillist4">Vinnie Wagstaff</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist4" className="collapse" aria-labelledby="mailheading4" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar2.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading5">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist5" aria-expanded="true" aria-controls="maillist5">Ruben Tillman</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist5" className="collapse" aria-labelledby="mailheading5" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar4.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="headingOne6">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist6" aria-expanded="true" aria-controls="maillist6">Vincent Porter</button>
											</h5>
											<span className="text_ellipsis xs-hide">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist6" className="collapse" aria-labelledby="headingOne6" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar1.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<ul>
														<li>standard dummy text ever since the 1500s, when an unknown printer</li>
														<li>Lorem Ipsum has been the industry&apos;s standard dummy</li>
													</ul>
													<p>printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrnturies, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<br />
													<div className="file_folder">
														<a >
															<div className="icon">
																<i className="fa fa-file-excel-o text-success"></i>
															</div>
															<div className="file-name">
																<p className="mb-0 text-muted">Report2017.xls</p>
																<small>Size: 68KB</small>
															</div>
														</a>
														<a >
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

													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading7">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist7" aria-expanded="true" aria-controls="maillist7">Merri Diamond</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist7" className="collapse" aria-labelledby="mailheading7" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar3.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading8">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist8" aria-expanded="true" aria-controls="maillist8">John Rosenberg</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist8" className="collapse" aria-labelledby="mailheading8" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar5.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading9">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist9" aria-expanded="true" aria-controls="maillist9">Vinnie Wagstaff</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist9" className="collapse" aria-labelledby="mailheading9" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar2.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a hrf>info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card inbox">
										<div className="card-header" id="mailheading10">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist10" aria-expanded="true" aria-controls="maillist10">Ruben Tillman</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist10" className="collapse" aria-labelledby="mailheading10" data-parent="#accordionExample">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar4.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-body text-center py-5">
										<img src="../assets/images/no-email.svg" className="width360 mb-3" alt="no-eMail" />
										<h4>Not Found</h4>
										<span>Choose a different filter to view test results to you</span>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="accordion" id="accordionExampleas">
									<div className="card mb-1 inbox unread">
										<div className="card-header" id="headingOneqq">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOneqq" aria-expanded="true" aria-controls="collapseOneqq">Vincent Porter</button>
											</h5>
											<span className="text_ellipsis xs-hide">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="collapseOneqq" className="collapse" aria-labelledby="headingOneqq" data-parent="#accordionExampleas">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar1.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<ul>
														<li>standard dummy text ever since the 1500s, when an unknown printer</li>
														<li>Lorem Ipsum has been the industry &apos; s standard dummy</li>
													</ul>
													<p>printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrnturies, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<br />
													<div className="file_folder">
														<a >
															<div className="icon">
																<i className="fa fa-file-excel-o text-success"></i>
															</div>
															<div className="file-name">
																<p className="mb-0 text-muted">Report2017.xls</p>
																<small>Size: 68KB</small>
															</div>
														</a>
														<a >
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

													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card mb-1 inbox">
										<div className="card-header" id="mailheading2qq">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a  className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist2qq" aria-expanded="true" aria-controls="maillist2qq">Merri Diamond</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist2qq" className="collapse" aria-labelledby="mailheading2qq" data-parent="#accordionExampleas">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar3.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card mb-1 inbox">
										<div className="card-header" id="mailheading3qq">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a  className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist3qq" aria-expanded="true" aria-controls="maillist3qq">John Rosenberg</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist3qq" className="collapse" aria-labelledby="mailheading3qq" data-parent="#accordionExampleas">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar5.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card mb-1 inbox">
										<div className="card-header" id="mailheading4qq">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a  className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist4qq" aria-expanded="true" aria-controls="maillist4qq">Vinnie Wagstaff</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide"  ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist4qq" className="collapse" aria-labelledby="mailheading4qq" data-parent="#accordionExampleas">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar2.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="card mb-1 inbox">
										<div className="card-header" id="mailheading5qq">
											<label className="custom-control custom-checkbox custom-control-inline mr-0">
												<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
												<span className="custom-control-label">&nbsp;</span>
											</label>
											<a className="mail-star xs-hide"><i className="fa fa-star-o"></i></a>
											<h5 className="mb-0">
												<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#maillist5qq" aria-expanded="true" aria-controls="maillist5qq">Ruben Tillman</button>
											</h5>
											<span className="text_ellipsis xs-hide">There are many variations of passages of Lorem Ipsum available</span>
											<div className="card-options">
												<a className="text-muted" ><i className="fa fa-reply"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-archive"></i></a>
												<a className="text-muted xs-hide" ><i className="fa fa-clock-o"></i></a>
												<a className="text-muted" ><i className="fa fa-trash"></i></a>
												<Link className="text-muted" to="/emailView"><i className="fa fa-eye"></i></Link>
											</div>
										</div>
										<div id="maillist5qq" className="collapse" aria-labelledby="mailheading5qq" data-parent="#accordionExampleas">
											<div className="card-body detail">
												<div className="detail-header">
													<div className="media">
														<div className="float-left">
															<div className="mr-3"><img src="../assets/images/xs/avatar4.jpg" alt="" /></div>
														</div>
														<div className="media-body">
															<p className="mb-0"><strong className="text-muted mr-1">From:</strong><a >info@gmail.com</a><span className="text-muted text-sm float-right">12:48, 23.06.2018</span></p>
															<p className="mb-0"><strong className="text-muted mr-1">To:</strong>Me <small className="float-right"><i className="fe fe-paperclip mr-1"></i>(2 files, 89.2 KB)</small></p>
														</div>
													</div>
												</div>
												<div className="mail-cnt">
													<p>Hello <strong>Marshall Nichols</strong>,</p><br />
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry &apos; s standard dummy text ever since the 1500s, type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
													<p>Thank youm,<br /><strong>Wendy Abbott</strong></p>
													<hr />
													<strong>Click here to</strong>
													<Link href ="/compose">Reply</Link> or
                                            <Link href ="/compose">Forward</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
						</TabContent>
					</div>
				</div>
			</>
		);
	}
}
