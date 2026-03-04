const initialState = {
	year:"",
    created_by:"",
    creator_name:"",
    holiday_list:{
		January:[],
		February:[],
		March:[],
		April:[],
		May:[],
		June:[],
		July:[],
		August:[],
		September:[],
		October:[],
		November:[],
		December:[]
	}
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
	switch (type) {
		case 'SET_HOLIDAY_INPUT_USER_INFO':
			newState = {...state, ...payload};
            break;
		case 'SET_HOLIDAY_LIST':
			newState = {...state, holiday_list: payload};
			break;
		case 'RESET_HOLIDAY_LIST':
			newState = {...initialState, holiday_list: {}};
			break;
		default:
			newState = state;
            break;
	}
    return newState;
}