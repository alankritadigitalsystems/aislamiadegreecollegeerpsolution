import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Columnchart from '../../common/columnchart';
import Radarchart from '../../common/radarchart';
import { toggle3DotMenuAction } from "../../../actions/settingsAction";
import Popup from '../../Shared/Popup';
import {createNews, getAllNews, deleteNews} from '../../api/dashboardApi';
import ReactPaginate from 'react-paginate';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { Bot } from 'lucide-react';
import { Dot } from 'lucide-react';
import { DotIcon } from 'lucide-react';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 1,
			isCardRemove: false,
			isFullScreen: false,
			isCollapsed: false,
			showCreateNews: false,
			toggleMenu: false,
			newsTitle: '',
			newsDescription: '',
			newsMode: '',
			selectedNews: {},
			newsPopup: false
		};
	}

	componentDidMount() {
		const {getAllNews} = this.props;
		getAllNews();
	}

	toggleCreateNews = () => {
		this.setState({
			showCreateNews: !this.state.showCreateNews,
			newsDescription: '',
			newsTitle: '',
			newsMode: ''
		});
	}

	toggleNewsPopup = () => {
		this.setState({newsPopup: !this.state.newsPopup, selectedNews: {}})
	}

	openNewsPopup = (news) => {
		this.setState({newsPopup: !this.state.newsPopup, selectedNews: news});
	}

renderNewsNotice = () => {
  const { toggleMenu } = this.state;
  const {
    allNews = [],
    newsLoading,
    deleteNews,
    isDeleting,
    getAllNews,
    permissions = {},
    isSuperAdmin
  } = this.props;

  return (
    <div className="col-xl-6">
      <div className="h-full w-full shadow-lg shadow-gray-600  border-2 rounded-4xl border-gray-800/10 text-blue-600  ">

        <div className="card-header flex justify-content-between align-items-center border-bottom bg-light">
		<div className='flex'><DotIcon className="animate-ping"/><h5 className=" border-1 bg-blue-300/30 font-bold border-blue-500  py-0.5 rounded-4xl px-2"> News & Notices</h5>
		</div>

          <div className="d-flex align-items-center">
            {isDeleting && (
              <div className="text-danger d-flex align-items-center mr-3">
                <span>Deleting...</span>
                <i className="fa fa-circle-o-notch fa-spin fa-fw ml-1"></i>
              </div>
            )}

            {(isSuperAdmin || permissions.create) && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={(e) => this.toggleCreateNews(e)}
              >
                <i className="fa fa-plus mr-1"></i> Create News
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div
          className="table-responsive"
          style={{ maxHeight: "390px", minHeight: "200px", marginBottom: "2rem" }}
        >
          <table className="table card-table table-hover mb-0">
            <tbody>
              {/* ✅ Render News */}
              {!newsLoading &&
                Array.isArray(allNews) &&
                allNews.length > 0 &&
                allNews.map((news) => {
                  const { title, description, creator_name, notice_created_on, _id, news_mode } = news;
                  const date = new Date(notice_created_on);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <tr key={_id} className="align-middle">
                      <td className="text-center" style={{ width: "55px" }}>
                        <div className="avatar avatar-md">
                          <img
                            className="rounded-circle"
                            src="../assets/images/xs/avatar1.jpg"
                            alt="creator avatar"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                        </div>
                      </td>

                      <td style={{ width: "100%" }}>
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 className="mb-1 text-dark" style={{ fontWeight: 600 }}>
                              {title}
                            </h6>
                            <span
                              className={`badge ${
                                news_mode === "faculty"
                                  ? "badge-primary"
                                  : "badge-success"
                              }`}
                            >
                              {news_mode}
                            </span>
                          </div>

                          <p
                            className="mb-1 text-muted"
                            style={{
                              fontSize: "0.9rem",
                              lineHeight: "1.3",
                              maxWidth: "90%",
                            }}
                          >
                            <ResponsiveEllipsis text={description} maxLine={2} />
                          </p>

                          <div className="text-muted small">
                            By <strong>{creator_name}</strong> • {formattedDate}
                          </div>
                        </div>
                      </td>

                      <td style={{ cursor: "pointer", width: "40px" }}>
                        <i
                          className="fa fa-eye text-info"
                          title="View Notice"
                          onClick={() => this.openNewsPopup(news)}
                        ></i>
                      </td>

                      {(isSuperAdmin || permissions.delete) && (
                        <td style={{ cursor: "pointer", width: "40px" }}>
                          <i
                            className={`fa fa-trash text-danger ${
                              isDeleting ? "fa-spin" : ""
                            }`}
                            title="Delete Notice"
                            onClick={() => deleteNews(_id, getAllNews)}
                          ></i>
                        </td>
                      )}
                    </tr>
                  );
                })}

              {/* 🚫 Empty State */}
              {!newsLoading && allNews.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <img
                      src="../assets/images/notice.svg"
                      alt="No news"
                      style={{ height: "100px", opacity: 0.7 }}
                    />
                    <h6 className="mt-3 text-muted">No new News and Notices</h6>
                  </td>
                </tr>
              )}

              {/* ⏳ Loading State */}
              {newsLoading && (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <h6 className="text-primary">
                      Fetching Notices
                      <i className="fa fa-circle-o-notch fa-spin fa-fw ml-2"></i>
                    </h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




	renderDashboard = () => {
		const { isCardRemove, isFullScreen, isCollapsed } = this.state;
		
		return(
			<TabPane tabId={1} className={classnames(['fade show'])}>
				{false && (<div className="row clearfix">
					<div className="col-xl-12">
						<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isFullScreen ? 'card-fullscreen' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
							<div className="card-header">
								<h3 className="card-title">University Report</h3>
								<div className="card-options">
									<a  className="card-options-collapse" onClick={() => this.setState({ isCollapsed: !isCollapsed })}><i
										className="fe fe-chevron-up"></i></a>
									<a  className="card-options-fullscreen"
										data-toggle="card-fullscreen" onClick={() => this.setState({ isFullScreen: !isFullScreen })}><i className="fe fe-maximize"></i></a>
									<a  className="card-options-remove" onClick={() => this.setState({ isCardRemove: !isCardRemove })}><i
										className="fe fe-x"></i></a>
								</div>
							</div>
							<div className="card-body">
								<div className="d-sm-flex justify-content-between">
									<div className="font-12 mb-2"><span>Measure How Fast You’re Growing Monthly
										Recurring Revenue. <a >Learn More</a></span></div>
									<div className="selectgroup w250">
										<label className="selectgroup-item">
											<input type="radio" name="intensity" value="low"
												className="selectgroup-input" defaultChecked />
											<span className="selectgroup-button">1D</span>
										</label>
										<label className="selectgroup-item">
											<input type="radio" name="intensity" value="medium"
												className="selectgroup-input" />
											<span className="selectgroup-button">1W</span>
										</label>
										<label className="selectgroup-item">
											<input type="radio" name="intensity" value="high"
												className="selectgroup-input" />
											<span className="selectgroup-button">1M</span>
										</label>
										<label className="selectgroup-item">
											<input type="radio" name="intensity" value="veryhigh"
												className="selectgroup-input" />
											<span className="selectgroup-button">1Y</span>
										</label>
									</div>
								</div>
								<Columnchart></Columnchart>
							</div>
							<div className="card-footer">
								<div className="row">
									<div className="col-xl-3 col-md-6 mb-2">
										<div className="clearfix">
											<div className="float-left"><strong>Fees</strong></div>
											<div className="float-right"><small className="text-muted">35%</small>
											</div>
										</div>
										<div className="progress progress-xs">
											<div className="progress-bar bg-indigo" role="progressbar"
												style={{ width: "35%" }} aria-valuenow="35" aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
										<span className="text-uppercase font-10">Compared to last year</span>
									</div>
									<div className="col-xl-3 col-md-6 mb-2">
										<div className="clearfix">
											<div className="float-left"><strong>Donation</strong></div>
											<div className="float-right"><small className="text-muted">61%</small>
											</div>
										</div>
										<div className="progress progress-xs">
											<div className="progress-bar bg-yellow" role="progressbar"
												style={{ width: "61%" }} aria-valuenow="61" aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
										<span className="text-uppercase font-10">Compared to last year</span>
									</div>
									<div className="col-xl-3 col-md-6 mb-2">
										<div className="clearfix">
											<div className="float-left"><strong>Income</strong></div>
											<div className="float-right"><small className="text-muted">87%</small>
											</div>
										</div>
										<div className="progress progress-xs">
											<div className="progress-bar bg-green" role="progressbar"
												style={{ width: "87%" }} aria-valuenow="87" aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
										<span className="text-uppercase font-10">Compared to last year</span>
									</div>
									<div className="col-xl-3 col-md-6 mb-2">
										<div className="clearfix">
											<div className="float-left"><strong>Expense</strong></div>
											<div className="float-right"><small className="text-muted">42%</small>
											</div>
										</div>
										<div className="progress progress-xs">
											<div className="progress-bar bg-pink" role="progressbar"
												style={{ width: "42%" }} aria-valuenow="42" aria-valuemin="0"
												aria-valuemax="100"></div>
										</div>
										<span className="text-uppercase font-10">Compared to last year</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>)}
				<div className="flex flex-col gap-2 sm:flex-row md:flex-row ">
					{this.renderNewsNotice()}
					<div className="shadow-lg h-full w-full shadow-gray-600  border-2 rounded-4xl border-gray-800/10">
						<div className="">
							<div className="card-header">
								<h5 className=" border-2 bg-gray-400/30 border-gray-700/30 text-gray-900 py-0.5 rounded-4xl px-2">Performance</h5>
							</div>
							<div className="card-body">
								<Radarchart></Radarchart>
							
							</div>
						</div>
					</div>
				</div>
				
			</TabPane>
		);
	}

	renderActivity = () => {
		return(
			<TabPane tabId={2} className={classnames(['fade show'])}>
				
			</TabPane>
		);
	}

	createUserNews = () => {
		const {newsDescription, newsTitle, newsMode} = this.state;
		const {id, createNews, fullName = ''} = this.props;
		createNews({newsDescription, newsTitle, id, newsMode, fullName}, this.createNewsCallback);
	}

	createNewsCallback = () => {
		const {getAllNews} = this.props;
		this.toggleCreateNews();
		getAllNews();
	}

	renderContent = () => {
		const {newsTitle = '', newsDescription = '', newsMode} = this.state;
		const {isCreating} = this.props;
		const newsModes = [
			{code: "select", value: "--Select--"},
			{code: "student", value: "Student"},
			{code: "faculty", value: "Faculty"},
			{code: "all_classes", value: "All Classes"},
			{code: "website", value: "Website"}
		];
		return (
			<div className="popup-content">
				<div className="form-group">
					<label htmlFor="Title">News Title</label>
					<input type="text" className="form-control" id="Title" onChange={(e) => this.setState({newsTitle: e.target.value})} value={newsTitle} />
				</div>
				<div className="form-group">
					<label>News Mode</label>
					<select className="form-control" onChange={(e) => this.setState({newsMode: e.target.value})} value={newsMode} >
						{newsModes.map((mode, i) => {
							return <option value={mode.code} key={i}>{mode.value}</option>
						})}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea className="form-control" id="description" rows="8" onChange={(e) => {this.setState({newsDescription: e.target.value})}} value={newsDescription}></textarea>
				</div>
				<div className="button-section pt-2">
					<button type="button" className="btn btn-secondary mr-3" onClick={this.toggleCreateNews}>Discard</button>
					<button 
						type="button" 
						className="btn btn-info mr-3"
						disabled={!newsTitle || !newsDescription || !newsMode || newsMode === newsModes[0].code || isCreating}
						onClick={this.createUserNews}
					>
						{isCreating ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : "Create"}
					</button>
				</div>
			</div>
		);
	}

	renderCreateNews = () => {
		return(
			<Popup
				title="Create News"
				onCloseClick={this.toggleCreateNews}
				content={this.renderContent()}
			/>
		);
	}


	render() {
		const { activeTab, newsPopup } = this.state
		return (
			<>
				<div className="section-body">
					<div className="container-fluid">
						<div className="d-flex justify-content-between align-items-center">
							<div className="header-action">
								<h1 className="page-title">Dashboard</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><span>Amiruddaula Islamia Degree College</span></li>
									<li className="breadcrumb-item"><span>University</span></li>
									<li className="breadcrumb-item active" aria-current="page">Dashboard</li>
								</ol>
							</div>
	
						</div>
					</div>
				</div>
				<div className="section-body mt-4">
					<div className="container-fluid">
						
						<TabContent activeTab={activeTab}>
							{this.renderDashboard()}
							{this.renderActivity()}
						</TabContent>
					</div>
				</div>
				
				{newsPopup && this.renderPopupNews()}
			</>
		);
	}
}

// INSIDE your Dashboard component file
const mapStateToProps = state => ({
    is3DotMenu: state.settings.is3DotMenu,
    id: state.authenticationReducer._id,
    fullName: state.authenticationReducer.userProfile.full_name,
    allNews: state.dashboardReducer.allNews,
    newsLoading: state.dashboardReducer.newsLoading,
    isDeleting: state.dashboardReducer.isDeleting,
    isCreating: state.dashboardReducer.isCreating,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	toggle3DotMenuAction: (e) => dispatch(toggle3DotMenuAction(e)),
	getAllNews: () => dispatch(getAllNews()),
	deleteNews: (e, cb) => dispatch(deleteNews(e, cb)),
	createNews: (e, cb) => dispatch(createNews(e, cb))
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


