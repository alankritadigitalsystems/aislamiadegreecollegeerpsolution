import React, { Component } from 'react';
import  Link  from 'next/link';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

export default class PageInvoices extends Component {
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
								<h1 className="page-title">Invoices</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Pages</a></li>
									<li className="breadcrumb-item active" aria-current="page">Invoices</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row clearfix">
							<div className="col-lg-12">
								<div className="card">
									<div className="card-body">
										<div className="d-md-flex justify-content-between">
											{/* <ul className="nav nav-pills b-none">
												<li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Invoice-list">Invoice List</a></li>
												<li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Invoice-detail">Invoice Detail</a></li>
											</ul> */}
											<Nav className="nav-pills b-none">
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === 1 })}
														onClick={() => this.setState({ activeTab: 1 })}
													>
														Invoice List
                   				</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === 2 })}
														onClick={() => this.setState({ activeTab: 2 })}
													>
														Invoice Details
                   				</NavLink>
												</NavItem>
											</Nav>
											<div className="d-flex align-items-center sort_stat">
												<div className="d-flex">
													<span className="bh_income">
														<Sparklines data={[2, 5, 1, 8, 3, 6, 7, 5, 3, 6, 7, 5]} style={{ display: "inline-block", verticalAlign: "top", height: "30", width: "71" }}>
															<SparklinesBars color={"red"} />
														</Sparklines>
													</span>
													<div className="ml-2">
														<p className="mb-0 font-11">MY INCOME</p>
														<h5 className="font-16 mb-0">$5,510</h5>
													</div>
												</div>
												<div className="d-flex ml-3">
													<Sparklines data={[5, 8, 9, 10, 5, 2, 5, 8, 9, 10]} style={{ display: "inline-block", verticalAlign: "top", height: "30", width: "71" }}>
														<SparklinesBars color="red" />
													</Sparklines>
													<div className="ml-2">
														<p className="mb-0 font-11">SITE TRAFFIC</p>
														<h5 className="font-16 mb-0">53% Up</h5>
													</div>
												</div>
											</div>
										</div>
										<div className="input-group mt-2">
											<input type="text" className="form-control search" placeholder="Search..." />
										</div>
									</div>
								</div>
								<TabContent activeTab={activeTab}>
									<TabPane tabId={1} className={classnames(['fade show'])}>
										<div className="table-responsive">
											<table className="table card-table table-vcenter text-nowrap table_custom">
												<thead>
													<tr className="">
														<th>No.</th>
														<th>Invoice Subject</th>
														<th>Client</th>
														<th>VAT No.</th>
														<th>Created</th>
														<th>Status</th>
														<th>Price</th>
														<th></th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													<tr className="">
														<td><span className="text-muted">001401</span></td>
														<td><Link href ="pageInvoices" className="text-inherit">Design Works</Link></td>
														<td>Carlson Limited</td>
														<td>87956621</td>
														<td>15 Dec 2017</td>
														<td><span className="status-icon bg-success"></span> Paid</td>
														<td>$887</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
													<tr className="">
														<td><span className="text-muted">001402</span></td>
														<td><Link href="pageInvoices" className="text-inherit">UX Wireframes</Link></td>
														<td>Adobe</td>
														<td>87956421</td>
														<td>12 Apr 2017</td>
														<td><span className="status-icon bg-warning"></span> Pending</td>
														<td>$1200</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
													<tr className="">
														<td><span className="text-muted">001403</span></td>
														<td><Link href="pageInvoices" className="text-inherit">New Dashboard</Link></td>
														<td>Bluewolf</td>
														<td>87952621</td>
														<td>23 Oct 2017</td>
														<td><span className="status-icon bg-warning"></span> Pending</td>
														<td>$534</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
													<tr className="">
														<td><span className="text-muted">001404</span></td>
														<td><Link href="pageInvoices" className="text-inherit">Landing Page</Link></td>
														<td>Salesforce</td>
														<td>87953421</td>
														<td>2 Sep 2017</td>
														<td><span className="status-icon bg-secondary"></span> Due in 2 Weeks</td>
														<td>$1500</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
													<tr className="">
														<td><span className="text-muted">001405</span></td>
														<td><Link href="pageInvoices" className="text-inherit">Marketing Templates</Link></td>
														<td>Printic</td>
														<td>87956621</td>
														<td>29 Jan 2018</td>
														<td><span className="status-icon bg-danger"></span> Paid Today</td>
														<td>$648</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
													<tr className="" >
														<td><span className="text-muted">001406</span></td>
														<td><Link href="pageInvoices" className="text-inherit">Sales Presentation</Link></td>
														<td>Tabdaq</td>
														<td>87956621</td>
														<td>4 Feb 2018</td>
														<td><span className="status-icon bg-secondary"></span> Due in 3 Weeks</td>
														<td>$300</td>
														<td className="text-right"><a  className="btn btn-secondary btn-sm">Manage</a></td>
														<td><a className="icon" ><i className="fe fe-edit"></i></a></td>
													</tr>
												</tbody>
											</table>
										</div>
									</TabPane>
									<TabPane tabId={2} className={classnames(['fade show'])}>
										<div className="row clearfix">
											<div className="col-12">
												<div className="card">
													<div className="card-header">
														<h3 className="card-title">#AB0017</h3>
														<div className="card-options">
															<button type="button" className="btn btn-primary"><i className="si si-printer"></i> Print Invoice</button>
														</div>
													</div>
													<div className="card-body">
														<div className="row my-8">
															<div className="col-6">
																<p className="h3">Company</p>
																<address>
																	Street Address<br />
                                                        State, City<br />
                                                        Region, Postal Code<br />
                                                        ltd@example.com
                                                        </address>
															</div>
															<div className="col-6 text-right">
																<p className="h3">Client</p>
																<address>
																	Street Address<br />
                                                        State, City<br />
                                                        Region, Postal Code<br />
                                                        ctr@example.com
                                                        </address>
															</div>
														</div>
														<div className="table-responsive push">
															<table className="table table-bordered table-hover">
																<tbody>
																<tr>
																	<th className="text-center width35"></th>
																	<th>Product</th>
																	<th className="text-center" style={{ width: "1%" }}>Qnt</th>
																	<th className="text-right" style={{ width: "1%" }}>Unit</th>
																	<th className="text-right" style={{ width: "1%" }}>Amount</th>
																</tr>
																<tr>
																	<td className="text-center">1</td>
																	<td>
																		<p className="font600 mb-1">Logo Creation</p>
																		<div className="text-muted">Logo and business cards design</div>
																	</td>
																	<td className="text-center">1</td>
																	<td className="text-right">$1.800,00</td>
																	<td className="text-right">$1.800,00</td>
																</tr>
																<tr>
																	<td className="text-center">2</td>
																	<td>
																		<p className="font600 mb-1">Online Store Design &amp; Development</p>
																		<div className="text-muted">Design/Development for all popular modern browsers</div>
																	</td>
																	<td className="text-center">1</td>
																	<td className="text-right">$20.000,00</td>
																	<td className="text-right">$20.000,00</td>
																</tr>
																<tr>
																	<td className="text-center">3</td>
																	<td>
																		<p className="font600 mb-1">App Design</p>
																		<div className="text-muted">Promotional mobile application</div>
																	</td>
																	<td className="text-center">1</td>
																	<td className="text-right">$3.200,00</td>
																	<td className="text-right">$3.200,00</td>
																</tr>
																<tr>
																	<td colSpan="4" className="font600 text-right">Subtotal</td>
																	<td className="text-right">$25.000,00</td>
																</tr>
																<tr className="bg-light">
																	<td colSpan="4" className="font600 text-right">Vat Rate</td>
																	<td className="text-right">20%</td>
																</tr>
																<tr>
																	<td colSpan="4" className="font600 text-right">Vat Due</td>
																	<td className="text-right">$5.000,00</td>
																</tr>
																<tr className="bg-green text-light">
																	<td colSpan="4" className="font700 text-right">Total Due</td>
																	<td className="font700 text-right">$30.000,00</td>
																</tr>
																</tbody>
															</table>
														</div>
														<p className="text-muted text-center">Thank you very much for doing business with us. We look forward to working with you again!</p>
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
