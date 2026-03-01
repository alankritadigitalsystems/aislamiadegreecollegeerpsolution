import React, { Component } from 'react';
import Fullcalender from '../../common/fullcalender';

export default class Calendar extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Calendar</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Calendar</li>
								</ol>
							</div>

						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row clearfix row-deck">
							<div className="col-lg-4 col-md-12">
								<div className="card">
									<div className="card-body">
										<h3 className="card-title">Events List</h3>
										<div id="event-list" className="fc event_list">
											<div class='fc-event bg-primary' data-className="bg-primary">My Event 1</div>
											<div class='fc-event bg-info' data-className="bg-info">Birthday Party</div>
											<div class='fc-event bg-success' data-className="bg-success">Meeting</div>
											<div class='fc-event bg-warning' data-className="bg-warning">Conference</div>
											<div class='fc-event bg-danger' data-className="bg-danger">My Event 5</div>
										</div>
										<div className="todo_list mt-4">
											<h3 className="card-title">ToDo List <small>This Month task list</small></h3>
											<ul className="list-unstyled mb-0">
												<li>
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked />
														<span className="custom-control-label">Report Panel Usag</span>
													</label>
												</li>
												<li>
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
														<span className="custom-control-label">Report Panel Usag</span>
													</label>
												</li>
												<li>
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" checked />
														<span className="custom-control-label">New logo design for Angular Admin</span>
													</label>
												</li>
												<li>
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" name="example-checkbox1" value="option1" />
														<span className="custom-control-label">Design PSD files for Angular Admin</span>
													</label>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-8 col-md-12">
								<div className="card">
									<div className="card-body">
									<Fullcalender></Fullcalender>
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



