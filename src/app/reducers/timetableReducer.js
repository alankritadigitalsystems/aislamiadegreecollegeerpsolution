const initialState = {
	created_by:"",
  class:"",
  semester:"",
  admin_name:"",
  schedule:{
    Monday:[{}],
    Tuesday:[{}],
    Wednesday:[{}],
    Thursday:[{}],
    Friday:[{}]
  }
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
	switch (type) {
		case 'SET_TIMETABLE_INPUT_USER_INFO':
			newState = {...state, ...payload};
            break;
		case 'SET_TIMETABLE_LIST':
			newState = {...state, schedule: payload};
			break;
		case 'RESET_TIMETABLE_LIST':
			newState = {...initialState, schedule: {
        Monday:[{}],
        Tuesday:[{}],
        Wednesday:[{}],
        Thursday:[{}],
        Friday:[{}]
      }};
			break;
		default:
			newState = state;
            break;
	}
    return newState;
}