const initialState = {
	is3DotMenu: false,
	isDropDownMenu: false,
	isProfileMenu: false,
	isPagesMenu: false,
	isMailMenu: false,
	isNotificationMenu: false,
	isLanguageMenu: false,
	isAuthMenu: false,
	isToggleLeftBar: false,
	isToggleRightBar: false,
	isOpenSettingBar: false,
	themeColor: 'white',
	isDarkMode: false,
	isDarkHeader: false,
	isFixNavbar: false,
	isMinSidebar: false,
	isDarkSidebar: false,
	isIconColor: false,
	isGradientColor: true,
	isBoxShadow: false,
	isBoxLayout: false,
	isRtl: false,
	isMenuGrid: false,
	isFont: "font-muli",
	// isSubMenuIcon: "list-a",
	// isMenuIcon: "list-c"
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_LEFT_SIDEBAR':
			return {
				...state,
				isToggleLeftBar: action.payload
			}
		case 'TOGGLE_RIGHT_SIDEBAR':
			return {
				...state,
				isToggleRightBar: action.payload
			}
		case 'TOGGLE_SETTING_BAR':
			return {
				...state,
				isOpenSettingBar: action.payload
			}
		case 'THEME_COLOR_CHANGE':
			return {
				...state,
				themeColor: action.payload
			}
		case 'CHANGE_DARK_MODE':
			return {
				...state,
				isDarkMode: action.payload
			}
		case 'CHANGE_DARK_HEADER':
			return {
				...state,
				isDarkHeader: action.payload
			}
		case 'FIX_NAVBAR_HEADER':
			return {
				...state,
				isFixNavbar: action.payload
			}
		case 'DARK_MIN_SIDEBAR':
			return {
				...state,
				isMinSidebar: action.payload
			}
		case 'DARK_SIDEBAR':
			return {
				...state,
				isDarkSidebar: action.payload
			}
		case 'CHANGE_ICON_COLOR':
			return {
				...state,
				isIconColor: action.payload
			}
		case 'CHANGE_GRADIENT_COLOR':
			return {
				...state,
				isGradientColor: action.payload
			}
		case 'CHANGE_BOX_SHADOW':
			return {
				...state,
				isBoxShadow: action.payload
			}
		case 'CHANGE_BOX_LAYOUT':
			return {
				...state,
				isBoxLayout: action.payload
			}
		case 'IS_RTL':
			return {
				...state,
				isRtl: action.payload
			}
		case 'CHANGE_FONT':
			return {
				...state,
				isFont: action.payload
			}
		case 'MENU_LAYOUT_GRID':
			return {
				...state,
				isMenuGrid: action.payload
			}
		case 'TOGGLE_AUTH_MENU':
			return {
				...state,
				isAuthMenu: action.payload
			}
		case 'TOGGLE_LANGUAGE_MENU':
			return {
				...state,
				isLanguageMenu: action.payload
			}
		case 'TOGGLE_NOTIFICATION_MENU':
			return {
				...state,
				isNotificationMenu: action.payload
			}
		case 'TOGGLE_MAIL_MENU':
			return {
				...state,
				isMailMenu: action.payload
			}
		case 'TOGGLE_PROFILE_MENU':
			return {
				...state,
				isProfileMenu: action.payload
			}
		case 'TOGGLE_PAGE_MENU':
			return {
				...state,
				isPagesMenu: action.payload
			}
		case 'TOGGLE_3DOT_MENU':
			return {
				...state,
				is3DotMenu: action.payload
			}
		case 'TOGGLE_DROPDOWN_MENU':
			return {
				...state,
				isDropDownMenu: action.payload
			}
		case 'RESET_STATE':
			return initialState;
		default:
			return state
	}
}