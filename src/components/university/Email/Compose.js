import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ckeditor from '../../common/ckeditor';

export default class Compose extends Component {
	render() {
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center ">
							<div className="header-action">
								<h1 className="page-title">Compose</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>App</a></li>
									<li className="breadcrumb-item"><Link to="email">Inbox</Link></li>
									<li className="breadcrumb-item active" aria-current="page">Compose</li>
								</ol>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						<div className="row row-deck">
							<div className="col-12">
								<div className="card">
									<div className="card-body mail_compose">
										<form>
											<div className="form-group">
												<input type="text" className="form-control" placeholder="To" />
											</div>
											<div className="form-group">
												<input type="text" className="form-control" placeholder="Subject" />
											</div>
											<div className="form-group">
												<input type="text" className="form-control" placeholder="CC" />
											</div>
										</form>
										<div className="summernote">
											<Ckeditor />
										</div>
										<div className="mt-4 text-right">
											<button type="button" className="mr-1 btn btn-success">Send Message</button>
											<button type="button" className="mr-1 btn btn-outline-secondary">Draft</button>
											<Link to="email" className="mr-1 btn btn-outline-secondary">Cancel</Link>
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
