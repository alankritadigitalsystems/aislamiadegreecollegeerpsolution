const initialState = {
	userInformation: {}
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
	switch (type) {
		case 'SEARCH_USER':
		case 'UPDATE_CONFIGURATION':
			newState = {...state, ...payload};
            break;
		case 'SAVE_USER_PROFILE':
			newState = {...state, userInformation: payload.data};
			break;
		case 'RESET_USER_PROFILE':
			newState = {...state, userInformation: {}};
			break;
		case 'SEARCH_SALARY_SLIP':
			newState = {...state, ...payload};
            break;
		case 'SAVE_SALARY_CONFIG':
			newState = {...state, existingSalaryConfig: payload.data};
			break;
		case 'RESET_SALARY_CONFIG':
			newState = {...state, existingSalaryConfig: {}};
			break;
		case 'SAVE_DA_PERCENTAGE':
			newState = {...state, existingDAPercentage: payload};
			break;
		default:
			newState = state;
            break;
	}
    return newState;
}