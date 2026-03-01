import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { MDBDataTable } from 'mdbreact';
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';

const body = {
	columns: [
		{
			label: '#',
			field: 'id',
			width: 10
		},
		{
			label: 'Title',
			field: 'title',
			width: 150,
			attributes: {
				'aria-controls': 'DataTable',
				'aria-label': 'Name',
			},
		},
		{
			label: 'Subject',
			field: 'subject',
			width: 270,
		},
		{
			label: 'Department',
			field: 'department',
			width: 200,
		},
		{
			label: 'Year',
			field: 'year',
			sort: 'asc',
			width: 100,
		},
		{
			label: 'Type',
			field: 'type',
			sort: 'disabled',
			width: 150,
		},
		{
			label: 'Status',
			field: 'status',
			sort: 'disabled',
			width: 100,
		}
	],
	rows: [
		{
			id: 1,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 2,
			title: 'Parallel Computing',
			subject: 'Politics',
			department: 'Architecture',
			year: 'Third Year',
			type: 'Newspaper',
			status: 'In Stock'
		},
		{
			id: 3,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 4,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 5,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 6,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 7,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 8,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 9,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 10,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 11,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 12,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
		{
			id: 13,
			title: 'Management Basics',
			subject: 'Designing',
			department: 'Architecture',
			year: 'Second Year',
			type: 'CD',
			status: 'Out Of Stock'
		},
	]
}
export default class Library extends Component {
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
								<h1 className="page-title">Library</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a >Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Library</li>
								</ol>
							</div>
							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										List View
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Add
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Add Bootstrap Style
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
											<MDBDataTable
												noBottomColumns
												className="table table-hover js-basic-example dataTable table-striped table_custom border-style spacing5 no-footer"
												entriesOptions={[5, 10, 20, 25]}
												entries={5}
												paging
												pagesAmount={15}
												data={body}
												searchTop
												sortRows={['title']}
												searchBottom={false}
												onPageChange={{ activePage: 2, pagesAmount: 5 }}
											/>

											{/* <table className="table table-hover js-basic-example dataTable table-striped table_custom border-style spacing5">
												<thead>
													<tr>
														<th>#</th>
														<th>Title</th>
														<th>Subject</th>
														<th>Department</th>
														<th>Year</th>
														<th>Type</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>1</td>
														<td>Management Basics</td>
														<td>Designing</td>
														<td>Architecture</td>
														<td>Second Year</td>
														<td>CD</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>2</td>
														<td>Java Black Book</td>
														<td>Graphics</td>
														<td>MBA</td>
														<td>Third Year</td>
														<td>DVD</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>3</td>
														<td>Parallel Computing</td>
														<td>Politics</td>
														<td>Architecture</td>
														<td>Third Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>4</td>
														<td>Networking</td>
														<td>Computer</td>
														<td>MBA</td>
														<td>Last Year</td>
														<td>Newspaper</td>
														<td>In Stock</td>
													</tr>
													<tr>
														<td>5</td>
														<td>Web Programming</td>
														<td>Mechanics</td>
														<td>Computer</td>
														<td>Third Year</td>
														<td>Book</td>
														<td>In Stock</td>
													</tr>
													<tr>
														<td>6</td>
														<td>Designing</td>
														<td>Mechanics</td>
														<td>Computer</td>
														<td>Third Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>7</td>
														<td>Mechanics</td>
														<td>Computer</td>
														<td>Computer Engineering</td>
														<td>Second Year</td>
														<td>DVD</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>8</td>
														<td>Computer Fundamental</td>
														<td>Animation</td>
														<td>Mechanical</td>
														<td>Third Year</td>
														<td>CD</td>
														<td>In Stock</td>
													</tr>
													<tr>
														<td>9</td>
														<td>Time History</td>
														<td>Management</td>
														<td>Mechanical</td>
														<td>Third Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>10</td>
														<td>Politics</td>
														<td>Designing</td>
														<td>Mechanical</td>
														<td>Second Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>11</td>
														<td>Designing</td>
														<td>Mechanics</td>
														<td>Computer</td>
														<td>Third Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>12</td>
														<td>Mechanics</td>
														<td>Computer</td>
														<td>Computer Engineering</td>
														<td>Second Year</td>
														<td>DVD</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>13</td>
														<td>Computer Fundamental</td>
														<td>Animation</td>
														<td>Mechanical</td>
														<td>Third Year</td>
														<td>CD</td>
														<td>In Stock</td>
													</tr>
													<tr>
														<td>14</td>
														<td>Time History</td>
														<td>Management</td>
														<td>Mechanical</td>
														<td>Third Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
													<tr>
														<td>15</td>
														<td>Politics</td>
														<td>Designing</td>
														<td>Mechanical</td>
														<td>Second Year</td>
														<td>Newspaper</td>
														<td>Out of Stock</td>
													</tr>
												</tbody>
											</table>
										</div> */}
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
									<div className="card-header">
										<h3 className="card-title">Add Library</h3>
										<div className="card-options ">
											<a  className="card-options-collapse" onClick={() => this.setState({ isCollapsed: !isCollapsed })}><i className="fe fe-chevron-up"></i></a>
											<a  className="card-options-remove" onClick={() => this.setState({ isCardRemove: !isCardRemove })}><i className="fe fe-x"></i></a>
										</div>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Enter Title" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Enter Subject" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Department" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Enter Type" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Enter Year" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<div className="form-group">
													<input type="text" value="" placeholder="Enter Status" className="form-control" />
												</div>
											</div>
											<div className="col-sm-12">
												<button className="btn btn-primary btn-lg btn-simple">Add Library</button>
											</div>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Add Library</h3>
										<div className="card-options ">
											<a  className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
											<a  className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
										</div>
									</div>
									<form className="card-body">
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Title <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Subject  <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control input-height" name="sub">
													<option value="">Select...</option>
													<option value="Category 1">Mathematics</option>
													<option value="Category 2">Science</option>
													<option value="Category 3">Software</option>
													<option value="Category 3">Other</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Purchase Date <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<DatePicker
													className="form-control"
													selected={new Date()}
												/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Auther Name <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Publisher <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Price <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<input type="text" className="form-control" />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Department <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control input-height" name="departmnt">
													<option value="">Select...</option>
													<option value="Category 1">Mathematics</option>
													<option value="Category 2">Engineering</option>
													<option value="Category 3">Science</option>
													<option value="Category 3">M.B.A.</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Asset Type <span className="text-danger">*</span></label>
											<div className="col-md-7">
												<select className="form-control input-height" name="assttype">
													<option value="">Select...</option>
													<option value="Category 1">Book</option>
													<option value="Category 2">CD</option>
													<option value="Category 3">DVD</option>
													<option value="Category 3">NewsPaper</option>
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-md-3 col-form-label">Asset Details <span className="text-danger">*</span></label>
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



