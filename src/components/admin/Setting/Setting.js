import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Dropzone from '../../common/DropzoneExample';

export default class Setting extends Component {
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
								<h1 className="page-title">Setting</h1>
								<ol className="breadcrumb page-breadcrumb">
									<li className="breadcrumb-item"><a>Amiruddaula Islamia Degree College</a></li>
									<li className="breadcrumb-item active" aria-current="page">Setting</li>
								</ol>
							</div>

							<Nav tabs className="page-header-tab">
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 1 })}
										onClick={() => this.setState({ activeTab: 1 })}
									>
										Company
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Localization
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Roles &amp; Permissions
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 4 })}
										onClick={() => this.setState({ activeTab: 4 })}
									>
										Email
                   				</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 5 })}
										onClick={() => this.setState({ activeTab: 5 })}
									>
										Invoice
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 6 })}
										onClick={() => this.setState({ activeTab: 6 })}
									>
										Notifications
    			               </NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: activeTab === 7 })}
										onClick={() => this.setState({ activeTab: 7 })}
									>
										Change Password
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
									<div className="card-header">
										<h3 className="card-title">Company Settings</h3>
									</div>
									<div className="card-body">
										<form>
											<div className="row">
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<label>Company Name <span className="text-danger">*</span></label>
														<input className="form-control" type="text" value="" />
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<label>Contact Person</label>
														<input className="form-control" value="Louis Pierce" type="text" />
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<label>Mobile Number <span className="text-danger">*</span></label>
														<input className="form-control" value="+1 882-635-7531" type="text" />
													</div>
												</div>
												<div className="col-sm-12">
													<div className="form-group">
														<label>Address</label>
														<textarea className="form-control" placeholder="44 Shirley Ave. West Chicago, IL 60185" aria-label="With textarea"></textarea>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group">
														<label>Email <span className="text-danger">*</span></label>
														<div className="input-group">
															<div className="input-group-prepend">
																<span className="input-group-text"><i className="icon-envelope"></i></span>
															</div>
															<input type="text" className="form-control" value="LouisPierce@example.com" />
														</div>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group">
														<label>Website Url</label>
														<div className="input-group">
															<div className="input-group-prepend">
																<span className="input-group-text"><i className="icon-globe"></i></span>
															</div>
															<input type="text" className="form-control" placeholder="http://" />
														</div>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-6 col-md-6 col-lg-3">
													<div className="form-group">
														<label>Country</label>
														<select className="form-control">
															<option value="">-- Select Country --</option>
															<option value="AF">Afghanistan</option>
															<option value="AX">Åland Islands</option>
															<option value="AL">Albania</option>
															<option value="DZ">Algeria</option>
															<option value="AS">American Samoa</option>
															<option value="AD">Andorra</option>
															<option value="AO">Angola</option>
															<option value="AI">Anguilla</option>
															<option value="AQ">Antarctica</option>
															<option value="AG">Antigua and Barbuda</option>
															<option value="AR">Argentina</option>
															<option value="AM">Armenia</option>
															<option value="AW">Aruba</option>
															<option value="AU">Australia</option>
															<option value="AT">Austria</option>
															<option value="AZ">Azerbaijan</option>
															<option value="BS">Bahamas</option>
															<option value="BH">Bahrain</option>
															<option value="BD">Bangladesh</option>
															<option value="BB">Barbados</option>
															<option value="BY">Belarus</option>
															<option value="BE">Belgium</option>
															<option value="BZ">Belize</option>
															<option value="BJ">Benin</option>
															<option value="BM">Bermuda</option>
															<option value="BT">Bhutan</option>
															<option value="BO">Bolivia, Plurinational State of</option>
															<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
															<option value="BA">Bosnia and Herzegovina</option>
															<option value="BW">Botswana</option>
															<option value="BV">Bouvet Island</option>
															<option value="BR">Brazil</option>
															<option value="IO">British Indian Ocean Territory</option>
															<option value="BN">Brunei Darussalam</option>
															<option value="BG">Bulgaria</option>
															<option value="BF">Burkina Faso</option>
															<option value="BI">Burundi</option>
															<option value="KH">Cambodia</option>
															<option value="CM">Cameroon</option>
															<option value="CA">Canada</option>
															<option value="CV">Cape Verde</option>
															<option value="KY">Cayman Islands</option>
															<option value="CF">Central African Republic</option>
															<option value="TD">Chad</option>
															<option value="CL">Chile</option>
															<option value="CN">China</option>
															<option value="CX">Christmas Island</option>
															<option value="CC">Cocos (Keeling) Islands</option>
															<option value="CO">Colombia</option>
															<option value="KM">Comoros</option>
															<option value="CG">Congo</option>
															<option value="CD">Congo, the Democratic Republic of the</option>
															<option value="CK">Cook Islands</option>
															<option value="CR">Costa Rica</option>
															<option value="CI">Côte d &apos;Ivoire</option>
															<option value="HR">Croatia</option>
															<option value="CU">Cuba</option>
															<option value="CW">Curaçao</option>
															<option value="CY">Cyprus</option>
															<option value="CZ">Czech Republic</option>
															<option value="DK">Denmark</option>
															<option value="DJ">Djibouti</option>
															<option value="DM">Dominica</option>
															<option value="DO">Dominican Republic</option>
															<option value="EC">Ecuador</option>
															<option value="EG">Egypt</option>
															<option value="SV">El Salvador</option>
															<option value="GQ">Equatorial Guinea</option>
															<option value="ER">Eritrea</option>
															<option value="EE">Estonia</option>
															<option value="ET">Ethiopia</option>
															<option value="FK">Falkland Islands (Malvinas)</option>
															<option value="FO">Faroe Islands</option>
															<option value="FJ">Fiji</option>
															<option value="FI">Finland</option>
															<option value="FR">France</option>
															<option value="GF">French Guiana</option>
															<option value="PF">French Polynesia</option>
															<option value="TF">French Southern Territories</option>
															<option value="GA">Gabon</option>
															<option value="GM">Gambia</option>
															<option value="GE">Georgia</option>
															<option value="DE">Germany</option>
															<option value="GH">Ghana</option>
															<option value="GI">Gibraltar</option>
															<option value="GR">Greece</option>
															<option value="GL">Greenland</option>
															<option value="GD">Grenada</option>
															<option value="GP">Guadeloupe</option>
															<option value="GU">Guam</option>
															<option value="GT">Guatemala</option>
															<option value="GG">Guernsey</option>
															<option value="GN">Guinea</option>
															<option value="GW">Guinea-Bissau</option>
															<option value="GY">Guyana</option>
															<option value="HT">Haiti</option>
															<option value="HM">Heard Island and McDonald Islands</option>
															<option value="VA">Holy See (Vatican City State)</option>
															<option value="HN">Honduras</option>
															<option value="HK">Hong Kong</option>
															<option value="HU">Hungary</option>
															<option value="IS">Iceland</option>
															<option value="IN">India</option>
															<option value="ID">Indonesia</option>
															<option value="IR">Iran, Islamic Republic of</option>
															<option value="IQ">Iraq</option>
															<option value="IE">Ireland</option>
															<option value="IM">Isle of Man</option>
															<option value="IL">Israel</option>
															<option value="IT">Italy</option>
															<option value="JM">Jamaica</option>
															<option value="JP">Japan</option>
															<option value="JE">Jersey</option>
															<option value="JO">Jordan</option>
															<option value="KZ">Kazakhstan</option>
															<option value="KE">Kenya</option>
															<option value="KI">Kiribati</option>
															<option value="KP">Korea, Democratic People &apos;s Republic of</option>
															<option value="KR">Korea, Republic of</option>
															<option value="KW">Kuwait</option>
															<option value="KG">Kyrgyzstan</option>
															<option value="LA">Lao People &apos;s Democratic Republic</option>
															<option value="LV">Latvia</option>
															<option value="LB">Lebanon</option>
															<option value="LS">Lesotho</option>
															<option value="LR">Liberia</option>
															<option value="LY">Libya</option>
															<option value="LI">Liechtenstein</option>
															<option value="LT">Lithuania</option>
															<option value="LU">Luxembourg</option>
															<option value="MO">Macao</option>
															<option value="MK">Macedonia, the former Yugoslav Republic of</option>
															<option value="MG">Madagascar</option>
															<option value="MW">Malawi</option>
															<option value="MY">Malaysia</option>
															<option value="MV">Maldives</option>
															<option value="ML">Mali</option>
															<option value="MT">Malta</option>
															<option value="MH">Marshall Islands</option>
															<option value="MQ">Martinique</option>
															<option value="MR">Mauritania</option>
															<option value="MU">Mauritius</option>
															<option value="YT">Mayotte</option>
															<option value="MX">Mexico</option>
															<option value="FM">Micronesia, Federated States of</option>
															<option value="MD">Moldova, Republic of</option>
															<option value="MC">Monaco</option>
															<option value="MN">Mongolia</option>
															<option value="ME">Montenegro</option>
															<option value="MS">Montserrat</option>
															<option value="MA">Morocco</option>
															<option value="MZ">Mozambique</option>
															<option value="MM">Myanmar</option>
															<option value="NA">Namibia</option>
															<option value="NR">Nauru</option>
															<option value="NP">Nepal</option>
															<option value="NL">Netherlands</option>
															<option value="NC">New Caledonia</option>
															<option value="NZ">New Zealand</option>
															<option value="NI">Nicaragua</option>
															<option value="NE">Niger</option>
															<option value="NG">Nigeria</option>
															<option value="NU">Niue</option>
															<option value="NF">Norfolk Island</option>
															<option value="MP">Northern Mariana Islands</option>
															<option value="NO">Norway</option>
															<option value="OM">Oman</option>
															<option value="PK">Pakistan</option>
															<option value="PW">Palau</option>
															<option value="PS">Palestinian Territory, Occupied</option>
															<option value="PA">Panama</option>
															<option value="PG">Papua New Guinea</option>
															<option value="PY">Paraguay</option>
															<option value="PE">Peru</option>
															<option value="PH">Philippines</option>
															<option value="PN">Pitcairn</option>
															<option value="PL">Poland</option>
															<option value="PT">Portugal</option>
															<option value="PR">Puerto Rico</option>
															<option value="QA">Qatar</option>
															<option value="RE">Réunion</option>
															<option value="RO">Romania</option>
															<option value="RU">Russian Federation</option>
															<option value="RW">Rwanda</option>
															<option value="BL">Saint Barthélemy</option>
															<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
															<option value="KN">Saint Kitts and Nevis</option>
															<option value="LC">Saint Lucia</option>
															<option value="MF">Saint Martin (French part)</option>
															<option value="PM">Saint Pierre and Miquelon</option>
															<option value="VC">Saint Vincent and the Grenadines</option>
															<option value="WS">Samoa</option>
															<option value="SM">San Marino</option>
															<option value="ST">Sao Tome and Principe</option>
															<option value="SA">Saudi Arabia</option>
															<option value="SN">Senegal</option>
															<option value="RS">Serbia</option>
															<option value="SC">Seychelles</option>
															<option value="SL">Sierra Leone</option>
															<option value="SG">Singapore</option>
															<option value="SX">Sint Maarten (Dutch part)</option>
															<option value="SK">Slovakia</option>
															<option value="SI">Slovenia</option>
															<option value="SB">Solomon Islands</option>
															<option value="SO">Somalia</option>
															<option value="ZA">South Africa</option>
															<option value="GS">South Georgia and the South Sandwich Islands</option>
															<option value="SS">South Sudan</option>
															<option value="ES">Spain</option>
															<option value="LK">Sri Lanka</option>
															<option value="SD">Sudan</option>
															<option value="SR">Suriname</option>
															<option value="SJ">Svalbard and Jan Mayen</option>
															<option value="SZ">Swaziland</option>
															<option value="SE">Sweden</option>
															<option value="CH">Switzerland</option>
															<option value="SY">Syrian Arab Republic</option>
															<option value="TW">Taiwan, Province of China</option>
															<option value="TJ">Tajikistan</option>
															<option value="TZ">Tanzania, United Republic of</option>
															<option value="TH">Thailand</option>
															<option value="TL">Timor-Leste</option>
															<option value="TG">Togo</option>
															<option value="TK">Tokelau</option>
															<option value="TO">Tonga</option>
															<option value="TT">Trinidad and Tobago</option>
															<option value="TN">Tunisia</option>
															<option value="TR">Turkey</option>
															<option value="TM">Turkmenistan</option>
															<option value="TC">Turks and Caicos Islands</option>
															<option value="TV">Tuvalu</option>
															<option value="UG">Uganda</option>
															<option value="UA">Ukraine</option>
															<option value="AE">United Arab Emirates</option>
															<option value="GB">United Kingdom</option>
															<option value="US">United States</option>
															<option value="UM">United States Minor Outlying Islands</option>
															<option value="UY">Uruguay</option>
															<option value="UZ">Uzbekistan</option>
															<option value="VU">Vanuatu</option>
															<option value="VE">Venezuela, Bolivarian Republic of</option>
															<option value="VN">Viet Nam</option>
															<option value="VG">Virgin Islands, British</option>
															<option value="VI">Virgin Islands, U.S.</option>
															<option value="WF">Wallis and Futuna</option>
															<option value="EH">Western Sahara</option>
															<option value="YE">Yemen</option>
															<option value="ZM">Zambia</option>
															<option value="ZW">Zimbabwe</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6 col-md-6 col-lg-3">
													<div className="form-group">
														<label>State/Province</label>
														<select className="form-control">
															<option>California</option>
															<option>Alaska</option>
															<option>Alabama</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6 col-md-6 col-lg-3">
													<div className="form-group">
														<label>City</label>
														<input className="form-control" value="New York" type="text" />
													</div>
												</div>
												<div className="col-sm-6 col-md-6 col-lg-3">
													<div className="form-group">
														<label>Postal Code</label>
														<input className="form-control" value="91403" type="text" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-6">
													<div className="form-group">
														<label>Phone Number</label>
														<input className="form-control" value="818-978-7102" type="text" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Fax</label>
														<input className="form-control" value="818-978-7102" type="text" />
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-12 text-right m-t-20">
													<button type="button" className="btn btn-primary">SAVE</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={2} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Basic Settings</h3>
									</div>
									<div className="card-body">
										<form>
											<div className="row">
												<div className="col-sm-6">
													<div className="form-group">
														<label>Default Country</label>
														<select className="form-control">
															<option selected="selected">USA</option>
															<option>United Kingdom</option>
															<option>India</option>
															<option>French</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Date Format</label>
														<select className="form-control">
															<option value="d/m/Y">15/05/2016</option>
															<option value="d.m.Y">15.05.2016</option>
															<option value="d-m-Y">15-05-2016</option>
															<option value="m/d/Y">05/15/2016</option>
															<option value="Y/m/d">2016/05/15</option>
															<option value="Y-m-d">2016-05-15</option>
															<option value="M d Y">May 15 2016</option>
															<option selected="selected" value="d M Y">15 May 2016</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Timezone</label>
														<select className="form-control">
															<option>10:45am Chicago (GMT-6)</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Default Language</label>
														<select className="form-control">
															<option selected="selected">English</option>
															<option>Russian</option>
															<option>Arabic</option>
															<option>French</option>
															<option>Hindi</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Currency Code</label>
														<select className="form-control">
															<option selected="selected">USD</option>
															<option>Pound</option>
															<option>EURO</option>
															<option>Ringgit</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Currency Symbol</label>
														<input className="form-control" value="$" type="text" />
													</div>
												</div>
												<div className="col-sm-12 text-right m-t-20">
													<button type="button" className="btn btn-primary">Save</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={3} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Roles &amp; Permissions</h3>
									</div>
									<div className="card-body">
										<ul className="list-group mb-3 tp-setting">
											<li className="list-group-item">
												Anyone seeing my profile page
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone send me a message
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone posts a comment on my post
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone invite me to group
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" defaultChecked />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
										</ul>
										<div className="table-responsive">
											<table className="table table-striped mb-0">
												<thead>
													<tr>
														<th>Module Permission</th>
														<th>Read</th>
														<th>Write</th>
														<th>Create</th>
														<th>Delete</th>
														<th>Import</th>
														<th>Export</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Employee</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
													</tr>
													<tr>
														<td>Holidays</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
													</tr>
													<tr>
														<td>Leave Request</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
													</tr>
													<tr>
														<td>Events</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" defaultChecked />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
														<td>
															<label className="custom-control custom-checkbox">
																<input type="checkbox" className="custom-control-input" />
																<span className="custom-control-label">&nbsp;</span>
															</label>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={4} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">SMTP Email Settings</h3>
									</div>
									<div className="card-body">
										<form>
											<div className="form-group">
												<label className="fancy-radio custom-color-green"><input name="gender3" value="PHP Mail" type="radio" defaultChecked /><span><i></i>PHP Mail</span></label>
												<label className="fancy-radio custom-color-green"><input name="gender3" value="SMTP" type="radio" /><span><i></i>SMTP</span></label>
											</div>
											<div className="row">
												<div className="col-sm-6">
													<div className="form-group">
														<label>Email From Address</label>
														<input className="form-control" type="email" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>Emails From Name</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP HOST</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP USER</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP PASSWORD</label>
														<input className="form-control" type="password" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP PORT</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP Security</label>
														<select className="form-control">
															<option>None</option>
															<option>SSL</option>
															<option>TLS</option>
														</select>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<label>SMTP Authentication Domain</label>
														<input className="form-control" type="text" />
													</div>
												</div>
												<div className="col-sm-12 m-t-20 text-right">
													<button type="button" className="btn btn-primary">SAVE</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={5} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Invoice Settings</h3>
									</div>
									<div className="card-body">
										<form>
											<div className="row">
												<div className="col-sm-12">
													<div className="form-group">
														<label>Invoice prefix</label>
														<input className="form-control" type="email" />
													</div>
													<Dropzone />
													<small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It&apos;s a bit lighter and easily wraps to a new line.</small>
												</div>
												<div className="col-sm-12 m-t-20 text-right">
													<button type="button" className="btn btn-primary">SAVE</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={6} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Notifications Settings</h3>
									</div>
									<div className="card-body">
										<ul className="list-group">
											<li className="list-group-item">
												Anyone send me a message
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone seeing my profile page
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" defaultChecked />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone posts a comment on my post
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" defaultChecked />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone send me a message
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
											<li className="list-group-item">
												Anyone seeing my profile page
                                        <div className="float-right">
													<label className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" />
														<span className="custom-control-label">&nbsp;</span>
													</label>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</TabPane>
							<TabPane tabId={7} className={classnames(['fade show'])}>
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Change Password</h3>
									</div>
									<div className="card-body">
										<div className="row clearfix">
											<div className="col-lg-4 col-md-12">
												<div className="form-group">
													<input type="text" className="form-control" value="louispierce" disabled placeholder="Username" />
												</div>
											</div>
											<div className="col-lg-4 col-md-12">
												<div className="form-group">
													<input type="email" className="form-control" value="louis.info@yourdomain.com" placeholder="Email" />
												</div>
											</div>
											<div className="col-lg-4 col-md-12">
												<div className="form-group">
													<input type="text" className="form-control" placeholder="Phone Number" />
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<hr />
												<h6>Change Password</h6>
												<div className="form-group">
													<input type="password" className="form-control" placeholder="Current Password" />
												</div>
												<div className="form-group">
													<input type="password" className="form-control" placeholder="New Password" />
												</div>
												<div className="form-group">
													<input type="password" className="form-control" placeholder="Confirm New Password" />
												</div>
											</div>
											<div className="col-sm-12 m-t-20 text-right">
												<button type="button" className="mr-1 btn btn-primary">SAVE</button> &nbsp;
                                        <button type="button" className="btn btn-default">CANCEL</button>
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



