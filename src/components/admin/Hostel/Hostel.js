import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';


export default class Hostel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			isCardRemove: false,
			isCollapsed: false,
			show: false
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
								<h1 className="page-title">Hostel</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a href="#">Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Hostel</li>
								</ol>
							</div>
							
						<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										Room List
                   					</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
										>
										Add Room
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
									<div className="table-responsive">
										<table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
											<thead>
												<tr>
													<th>Block</th>
													<th>Room No</th>
													<th>Type</th>
													<th>No of Bed</th>
													<th>Availability</th>
													<th>Cost Per Bed</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>A</td>
													<td>201</td>
													<td>Medium</td>
													<td>4</td>
													<td>1</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>305</td>
													<td>Big</td>
													<td>10</td>
													<td>3</td>
													<td>$12</td>
												</tr>
												<tr>
													<td>B</td>
													<td>404</td>
													<td>Medium</td>
													<td>2</td>
													<td>2</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>201</td>
													<td>Medium</td>
													<td>4</td>
													<td>1</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>201</td>
													<td>Medium</td>
													<td>4</td>
													<td>1</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>C</td>
													<td>701</td>
													<td>Small</td>
													<td>3</td>
													<td>2</td>
													<td>$35</td>
												</tr>
												<tr>
													<td>A</td>
													<td>804</td>
													<td>Medium</td>
													<td>4</td>
													<td>1</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>201</td>
													<td>Medium</td>
													<td>4</td>
													<td>3</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>603</td>
													<td>Small</td>
													<td>4</td>
													<td>1</td>
													<td>$20</td>
												</tr>
												<tr>
													<td>A</td>
													<td>402</td>
													<td>Small</td>
													<td>4</td>
													<td>4</td>
													<td>$20</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<ul className="pagination">
									<li className="page-item"><a className="page-link" href="#">Previous</a></li>
									<li className="page-item"><a className="page-link" href="#">1</a></li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
									<li className="page-item"><a className="page-link" href="#">Next</a></li>
								</ul>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className="card">
									<form className="card-body">
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Book Name <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Block No. <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">No of Bed <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Cost Per Bed <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Room Type <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control show-tick">
													<option>Select</option>
													<option>Dorm Rooms</option>
													<option>Private Rooms</option>
													<option>Capsules</option>
													<option>Booking Hacks</option>
													<option>Pod-styled dorms</option>
													<option>Female Dorm</option>
													<option>Female Dorm</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Description <span className="text-danger">*</span></label>
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



