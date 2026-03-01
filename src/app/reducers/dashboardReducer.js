const initialState = {
	allNews: [],
	newsLoading: false
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
	switch (type) {
		case 'GET_ALL_NEWS':
			newState = {...state, allNews: payload.news};
			break;
		case 'NEWS_LOADING':
		case 'DELETE_NEWS':
		case 'CREATE_NEWS':
		case 'CREATE_USER':
		case 'GET_ALL_SUBJECTS':
		case 'GET_ALL_CLASSES':
		case 'ALL_FACULTY':
		case 'HOLIDAY_LIST':
		case 'UPDATE_FACULTY':
		case 'SAVE_ATTENDANCE':
		case 'VERIFY_USER':
		case 'FETCH_SUBJECTS':
			newState = {...state, ...payload};
			break;
		case 'RESET_DASHBOARD_STATE':
			newState = initialState;
			break;
		case 'ADD_SUBJECT':
			newState = {...state, addingSubject: payload, subjectApiCalled: !payload};
			break;
		case 'SUBJECT_SUCCESS':
			newState = {...state, isAddSubjectSuccess: payload};
			break;
		case 'CREATE_CLASS':
			newState = {...state, creatingClass: payload};
			break;
		case 'FACULTY_LOADING':
			newState = {...state, facultyLoaing: payload};
			break;
		case 'GET_ATTENDANCE':
			newState = {...state, fetchingAttendance: payload};
			break;
		default:
			newState = state;
            break;
	}
    return newState;
}