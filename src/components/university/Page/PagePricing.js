import React, { Component } from 'react';

export default class PagePricing extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Page Pricing</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><span>Pages</span></li>
									<li className="breadcrumb-item active" aria-current="page">Page Pricing</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container">
						<div className="row clearfix">
							<div className="col-sm-12 col-lg-4">
								<div className="card " >
									<div className="card-body">
										<div className="card-category">Free</div>
										<div className="display-5 my-4">$0</div>
										<ul className="list-unstyled leading-loose">
											<li><strong>3</strong> Users</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Sharing Tools</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Design Tools</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Private Messages</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Twitter API</li>
										</ul>
										<div className="text-center mt-6">
											<a  className="btn btn-default btn-block">Choose plan</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-lg-4">
								<div className="card ">
									<div className="card-status bg-green"></div>
									<div className="card-body">
										<div className="card-category">Premium</div>
										<div className="display-5 my-4">$49</div>
										<ul className="list-unstyled leading-loose">
											<li><strong>10</strong> Users</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Sharing Tools</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Design Tools</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Private Messages</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Twitter API</li>
										</ul>
										<div className="text-center mt-6">
											<a  className="btn btn-block btn-primary">Choose plan</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-lg-4">
								<div className="card ">
									<div className="card-body">
										<div className="card-category">Enterprise</div>
										<div className="display-5 my-4">$99</div>
										<ul className="list-unstyled leading-loose">
											<li><strong>100</strong> Users</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Sharing Tools</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Design Tools</li>
											<li><i className="fe fe-check text-success mr-2" aria-hidden="true"></i> Private Messages</li>
											<li><i className="fe fe-x text-danger mr-2" aria-hidden="true"></i> Twitter API</li>
										</ul>
										<div className="text-center mt-6">
											<a  className="btn btn-default btn-block">Choose plan</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row clearfix row-deck">
							<div className="col-sm-12 col-lg-4">
								<div className="card " >
									<div className="card-body text-center">
										<div className="card-category">Free</div>
										<div className="font-25 mb-4">$0</div>
										<div className="card bg-indigo text-white">
											<div className="card-body">
												<img src="../assets/images/pricing/plan1.svg" className="width150" alt="planImage" />
												<ul className="list-unstyled leading-loose">
													<li><strong>3</strong> Users</li>
													<li>Sharing Tools</li>
													<li>Design Tools</li>
												</ul>
												<div className="mt-6">
													<a  className="btn btn-default">Choose plan</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-lg-4">
								<div className="card ">
									<div className="card-body text-center">
										<div className="card-category">Premium</div>
										<div className="font-25 mb-4">$49</div>
										<div className="card bg-cyan text-white">
											<div className="card-body">
												<img src="../assets/images/pricing/plan2.svg" className="width150" alt="planImage" />
												<ul className="list-unstyled leading-loose">
													<li><strong>10</strong> Users</li>
													<li>Sharing Tools</li>
													<li>Design Tools</li>
													<li>Private Messages</li>
												</ul>
												<div className="mt-6">
													<a  className="btn btn-default">Choose plan</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-lg-4">
								<div className="card ">
									<div className="card-body text-center">
										<div className="card-category">Enterprise</div>
										<div className="font-25 mb-4">$99</div>
										<div className="card bg-cyan text-white">
											<div className="card-body">
												<img src="../assets/images/pricing/plan3.svg" className="width150" alt="planImage" />
												<ul className="list-unstyled leading-loose">
													<li><strong>100</strong> Users</li>
													<li>Sharing Tools</li>
													<li>Design Tools</li>
													<li>Private Messages</li>
													<li>Twitter API</li>
												</ul>
												<div className="mt-6">
													<a  className="btn btn-default">Choose plan</a>
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
