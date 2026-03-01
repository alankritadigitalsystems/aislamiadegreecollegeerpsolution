const initialState = {
  userName: "",
  isAdmin: false,
  faculty_id: "",
  userProfile: {},
  student: null, // ✅ to support student login
  isLoginSuccess: false, // ✅ required for Layout check
  isDefaultPassword: false,
  passwordResetSuccess: false,
  isLoading: false,
  apiCalled: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case "SET_LOGIN_INFO":
    case "UPDATE_PASSWORD":
      newState = {
        ...state,
        ...payload,
        isLoginSuccess: true, // ✅ Mark login success
        isLoading: false,
      };
      break;

    case "USER_LOGOUT":
      newState = { ...initialState };
      break;

    case "LOADING":
      newState = { ...state, isLoading: payload, apiCalled: !payload };
      break;

    case "UPDATE_PROFILE":
      newState = { ...state, userProfile: payload.newProfile };
      break;

    case "SET_DEFAULT_PASSWORD":
      newState = {
        ...state,
        isDefaultPassword: payload.isDefaultPassword,
      };
      break;

    case "RESET_PASSWORD_SUCCESS":
      newState = { ...state, passwordResetSuccess: true };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};
