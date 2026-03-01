import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

export default class Payments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			isCardRemove: false,
			isCollapsed: false
		};
	}
	render() {
		const { activeTab, isCardRemove, isCollapsed } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Fees</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Fees</li>
								</ol>
							</div>

							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										List
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Fees Receipt
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Add Fees
    			               </NavLink>
								</NavItem>
							</Nav>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<TabContent activeTab={activeTab}>
							<TabPane tabId={1} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-body">
										<div className="table-responsive">
											<table className="table table-hover text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5">
												<thead>
													<tr>
														<th>Roll No.</th>
														<th>Student Name</th>
														<th>Fees Type</th>
														<th>Date</th>
														<th>Invoice No.</th>
														<th>Payment Type</th>
														<th>Status</th>
														<th>Amount</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>111</td>
														<td>Corrine Johnson</td>
														<td>Annual</td>
														<td>12 Jan 2018</td>
														<td>IN-4578</td>
														<td>cash</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>248$</td>
													</tr>
													<tr>
														<td>112</td>
														<td>Gladys Smith</td>
														<td>Tuition</td>
														<td>12 Feb 2018</td>
														<td>IN-3695</td>
														<td>cheque</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>124$</td>
													</tr>
													<tr>
														<td>113</td>
														<td>Alice Smith</td>
														<td>Annual</td>
														<td>24 Feb 2018</td>
														<td>IN-4679</td>
														<td>credit card</td>
														<td><span className="tag tag-red">unpaid</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>114</td>
														<td>Gladys Smith</td>
														<td>Tuition</td>
														<td>25 Feb 2018</td>
														<td>IN-2839</td>
														<td>cashn</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>112$</td>
													</tr>
													<tr>
														<td>115</td>
														<td>Corrine Johnson</td>
														<td>Transport</td>
														<td>12 March 2018</td>
														<td>IN-4916</td>
														<td>cheque</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>116</td>
														<td>Gladys Smith</td>
														<td>Tuition</td>
														<td>12 May 2018</td>
														<td>IN-7542</td>
														<td>cashn</td>
														<td><span className="tag tag-red">unpaid</span></td>
														<td>421$</td>
													</tr>
													<tr>
														<td>117</td>
														<td>Alice Smith</td>
														<td>Transport</td>
														<td>12 May 2018</td>
														<td>IN-8653</td>
														<td>credit card</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>124$</td>
													</tr>
													<tr>
														<td>118</td>
														<td>Gladys Smith</td>
														<td>Library</td>
														<td>12 May 2018</td>
														<td>IN-4859</td>
														<td>cheque</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>485$</td>
													</tr>
													<tr>
														<td>119</td>
														<td>Alice Smith</td>
														<td>Annual</td>
														<td>12 Jun 2018</td>
														<td>IN-2648</td>
														<td>cheque</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>231$</td>
													</tr>
													<tr>
														<td>120</td>
														<td>Corrine Johnson</td>
														<td>Tuition</td>
														<td>21 Jun 2018</td>
														<td>IN-4875</td>
														<td>cashn</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>4856$</td>
													</tr>
													<tr>
														<td>121</td>
														<td>Gladys Smith</td>
														<td>Transport</td>
														<td>28 Jun 2018</td>
														<td>IN-7946</td>
														<td>credit card</td>
														<td><span className="tag tag-red">unpaid</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>122</td>
														<td>Ken Smith</td>
														<td>Annual</td>
														<td>12 Jun 2018</td>
														<td>IN-9135</td>
														<td>cheque</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>123</td>
														<td>Corrine Johnson</td>
														<td>Annual</td>
														<td>22 Jun 2018</td>
														<td>IN-5284</td>
														<td>credit card</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>124</td>
														<td>Ken Smith</td>
														<td>Transport</td>
														<td>18 Aug 2018</td>
														<td>IN-4613</td>
														<td>cashn</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>254$</td>
													</tr>
													<tr>
														<td>125</td>
														<td>Emmett Johnson</td>
														<td>Annual</td>
														<td>13 Aug 2018</td>
														<td>IN-1826</td>
														<td>credit card</td>
														<td><span className="tag tag-red">unpaid</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>126</td>
														<td>Ken Smith</td>
														<td>Library</td>
														<td>17 Aug 2018</td>
														<td>IN-76149</td>
														<td>cashn</td>
														<td><span className="tag tag-green">paid</span></td>
														<td>340$</td>
													</tr>
													<tr>
														<td>127</td>
														<td>Emmett Johnson</td>
														<td>Annual</td>
														<td>4 Sept 2018</td>
														<td>IN-3794</td>
														<td>credit card</td>
														<td><span className="tag tag-orange">pending</span></td>
														<td>548$</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
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
											<table className="table table-bordered table-hover text-nowrap">
												<tbody><tr>
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
												</tbody></table>
										</div>
										<p className="text-muted text-center">Thank you very much for doing business with us. We look forward to working with you again!</p>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
									<div className="card-header">
										<h3 className="card-title">Add Library</h3>
										<div className="card-options ">
											<a className="card-options-collapse" onClick={() => this.setState({ isCollapsed: !isCollapsed })}><i className="fe fe-chevron-up"></i></a>
											<a className="card-options-remove" onClick={() => this.setState({ isCardRemove: !isCardRemove })}><i className="fe fe-x"></i></a>
										</div>
									</div>
									<form className="card-body">
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Roll No <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Student Name <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Department/Class  <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control" name="select">
													<option value="">Select...</option>
													<option value="Category 1">Mathematics</option>
													<option value="Category 2">Engineering</option>
													<option value="Category 3">Science</option>
													<option value="Category 3">M.B.A.</option>
													<option value="Category 3">Music</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Fees Type  <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control" name="selectType">
													<option value="">Select...</option>
													<option value="Category 1">Annual</option>
													<option value="Category 2">Tuition</option>
													<option value="Category 3">Transport</option>
													<option value="Category 3">Exam</option>
													<option value="Category 3">Library</option>
												</select>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-3 col-form-label">Payment Duration <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<div className="custom-controls-stacked">
													<label className="custom-control custom-radio custom-control-inline">
														<input type="radio" className="custom-control-input" name="example-inline-radios" value="option1" defaultChecked />
														<span className="custom-control-label">Monthly</span>
													</label>
													<label className="custom-control custom-radio custom-control-inline">
														<input type="radio" className="custom-control-input" name="example-inline-radios" value="option2" />
														<span className="custom-control-label">Session</span>
													</label>
													<label className="custom-control custom-radio custom-control-inline">
														<input type="radio" className="custom-control-input" name="example-inline-radios" value="option3" />
														<span className="custom-control-label">Yearly</span>
													</label>
												</div>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Collection Date <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input data-provide="datepicker" data-date-autoclose="true" className="form-control" placeholder="" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Amount <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Payment Method <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control" name="select">
													<option value="">Select...</option>
													<option value="Category 1">Cash</option>
													<option value="Category 2">Cheque</option>
													<option value="Category 3">Credit Card</option>
													<option value="Category 4">Debit Card</option>
													<option value="Category 5">Netbanking</option>
													<option value="Category 6">Other</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Payment Status <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control" name="select">
													<option value="">Select...</option>
													<option value="Category 1">Paid</option>
													<option value="Category 2">Unpaid</option>
													<option value="Category 3">Pending</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Payment Reference No. <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Payment Details <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<textarea rows="4" className="form-control no-resize" placeholder="Please type what you want..."></textarea>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label"></label>
											<div className="col-md-7">
												<button type="submit" className="mr-1 btn btn-primary">Submit</button>
												<button type="submit" className="btn btn-outline-secondary">Cancel</button>
											</div>
										</div>
									</form>
								</div>
							</TabPane>
						</TabContent>
					</div>
				</div>
			</>
		);
	}
}



