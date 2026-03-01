import React, { Component } from 'react';

export default class Noticeboard extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Page Empty</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Pages</a></li>
									<li className="breadcrumb-item active" aria-current="page">Page Empty</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<h4>Stater Page</h4>
					</div>
				</div>
			</>
		);
	}
}
