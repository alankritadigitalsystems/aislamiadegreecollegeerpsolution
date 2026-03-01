const loginInfoDispatcher = (e) => dispatch => {
	dispatch({
		type: 'SET_LOGIN_INFO',
		payload: e
	})
}

export {loginInfoDispatcher}