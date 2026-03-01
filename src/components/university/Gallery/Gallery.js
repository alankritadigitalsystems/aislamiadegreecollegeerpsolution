import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

export default class Contact extends Component {
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
								<h1 className="page-title">Gallery</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Gallery</li>
								</ol>
							</div>
							
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										All
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Social Media
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Package
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 4 })}
										onClick={() => this.setState({ activeTab: 4 })}
									>
										News
    			               </NavLink>
								</NavItem>
							</Nav>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row row-cards">
							<div className="col-12">
								<div className="card">
									<div className="card-header">
										<div className="page-subtitle ml-0">1 - 12 of 1713 photos</div>
										<div className="page-options d-flex">
											<select className="form-control custom-select w-auto">
												<option value="asc">Newest</option>
												<option value="desc">Oldest</option>
											</select>
											<div className="input-icon ml-2">
												<span className="input-icon-addon">
													<i className="fe fe-search"></i>
												</span>
												<input type="text" className="form-control" placeholder="Search photo" />
											</div>
											<button type="submit" className="btn btn-primary ml-2">Upload New</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<TabContent activeTab={activeTab}>				
						<TabPane tabId={1} className={classnames(['fade show'])}>
								<div className="row row-cards">
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/1.jpg" alt="Pic by Nathan Guerrero" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar1.jpg" alt="avtarImage" />
												<div>
													<div>Nathan</div>
													<small className="d-block text-muted">12 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 112</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 42</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/2.jpg" alt="Pic by Nathan Guerrero" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar2.jpg" alt="avtar" />
												<div>
													<div>Alice</div>
													<small className="d-block text-muted">12 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 70</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 0</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/3.jpg" alt="Pic by Rose Bradley" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avtar" />
												<div>
													<div>Rose</div>
													<small className="d-block text-muted">4 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 166</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 96</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/4.jpg" alt="Pic by Peter Richards" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Peter</div>
													<small className="d-block text-muted">18 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 76</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 6</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/5.jpg" alt="Pic by Wayne Holland" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar5.jpg" alt="avtar" />
												<div>
													<div>Wayne</div>
													<small className="d-block text-muted">16 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 106</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 36</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/6.jpg" alt="Pic by Michelle Ross" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar6.jpg" alt="avtar" />
												<div>
													<div>Michelle</div>
													<small className="d-block text-muted">4 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 77</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 7</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/7.jpg" alt="Pic by Debra Beck" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar7.jpg" alt="avtar" />
												<div>
													<div>Debra</div>
													<small className="d-block text-muted">6 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 150</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 80</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/8.jpg" alt="Pic by Phillip Peters" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar8.jpg" alt="avtar" />
												<div>
													<div>Phillip</div>
													<small className="d-block text-muted">17 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 153</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 83</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/9.jpg" alt="Pic by Jack Ruiz" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar1.jpg" alt="avtar" />
												<div>
													<div>Jack</div>
													<small className="d-block text-muted">15 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 143</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 73</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/10.jpg" alt="Pic by Ronald Bradley" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar2.jpg" alt="avtar" />
												<div>
													<div>Ronald</div>
													<small className="d-block text-muted">11 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 149</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 79</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/11.jpg" alt="Pic by Kathleen Harper" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avtar" />
												<div>
													<div>Kathleen</div>
													<small className="d-block text-muted">16 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 164</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 94</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/12.jpg" alt="Pic by Bobby Knight" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Bobby</div>
													<small className="d-block text-muted">6 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 160</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 90</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className="row row-cards">
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/4.jpg" alt="Pic by Peter Richards" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Peter</div>
													<small className="d-block text-muted">18 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 76</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 6</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/5.jpg" alt="Pic by Wayne Holland" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar5.jpg" alt="avtar" />
												<div>
													<div>Wayne</div>
													<small className="d-block text-muted">16 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 106</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 36</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/6.jpg" alt="Pic by Michelle Ross" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar6.jpg" alt="avtar" />
												<div>
													<div>Michelle</div>
													<small className="d-block text-muted">4 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 77</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 7</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/8.jpg" alt="Pic by Phillip Peters" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar8.jpg" alt="avtar" />
												<div>
													<div>Phillip</div>
													<small className="d-block text-muted">17 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 153</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 83</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/9.jpg" alt="Pic by Jack Ruiz" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar1.jpg" alt="avtar" />
												<div>
													<div>Jack</div>
													<small className="d-block text-muted">15 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 143</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 73</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="row row-cards">
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/3.jpg" alt="Pic by Rose Bradley" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avtar" />
												<div>
													<div>Bradley</div>
													<small className="d-block text-muted">4 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 166</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 96</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/7.jpg" alt="Pic by Debra Beck" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar7.jpg" alt="avtar" />
												<div>
													<div>Debra</div>
													<small className="d-block text-muted">6 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 150</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 80</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/8.jpg" alt="Pic by Phillip Peters" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar8.jpg" alt="avtar" />
												<div>
													<div>Phillip</div>
													<small className="d-block text-muted">17 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 153</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 83</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/9.jpg" alt="Pic by Jack Ruiz" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar1.jpg" alt="avtar" />
												<div>
													<div>Jack</div>
													<small className="d-block text-muted">15 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 143</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 73</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/11.jpg" alt="Pic by Kathleen Harper" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avtar" />
												<div>
													<div>Kathleen</div>
													<small className="d-block text-muted">16 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 164</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 94</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/12.jpg" alt="Pic by Bobby Knight" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Bobby</div>
													<small className="d-block text-muted">6 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 160</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 90</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={4} className={classnames(['fade show'])}>
								<div className="row row-cards">
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/4.jpg" alt="Pic by Peter Richards" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Peter</div>
													<small className="d-block text-muted">18 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 76</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 6</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/10.jpg" alt="Pic by Ronald Bradley" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar2.jpg" alt="avtar" />
												<div>
													<div>Ronald</div>
													<small className="d-block text-muted">11 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 149</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 79</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/11.jpg" alt="Pic by Kathleen Harper" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar3.jpg" alt="avtar" />
												<div>
													<div>Kathleen</div>
													<small className="d-block text-muted">16 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 164</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 94</a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-sm-6">
										<div className="card p-3">
											<a className="mb-3">
												<img src="../assets/images/gallery/12.jpg" alt="Pic by Bobby Knight" className="rounded" />
											</a>
											<div className="d-flex align-items-center px-2">
												<img className="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avtar" />
												<div>
													<div>Bobby</div>
													<small className="d-block text-muted">6 days ago</small>
												</div>
												<div className="ml-auto text-muted">
													<a className="icon"><i className="fe fe-eye mr-1"></i> 160</a>
													<a className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i> 90</a>
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



