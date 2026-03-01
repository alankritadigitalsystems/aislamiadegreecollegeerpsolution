const holidayCalendarUserInputDispatcher = (e) => (dispatch) => {
  dispatch({
    type: "SET_HOLIDAY_INPUT_USER_INFO",
    payload: e,
  });
};
const holidayCalendarListDispatcher = (e) => (dispatch) => {
  dispatch({
    type: "SET_HOLIDAY_LIST",
    payload: e,
  });
};

const resetHolidayCalendarDispatcher = (e) => (dispatch) => {
  dispatch({
    type: "RESET_HOLIDAY_LIST",
    payload: e,
  });
};
export { holidayCalendarUserInputDispatcher, holidayCalendarListDispatcher, resetHolidayCalendarDispatcher };
