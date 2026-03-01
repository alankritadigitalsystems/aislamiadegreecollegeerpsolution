import { combineReducers } from "redux";
import settings from "./settings";
import authenticationReducer from "./authenticationReducer";
import holidayCalendarReducer from "./holidayCalendarReducer";
import dashboardReducer from "./dashboardReducer";
import timetableReducer from "./timetableReducer";
import leaveReducer from "./leaveReducer";
import salaryReducer from "./salaryReducer";

export default combineReducers({
  settings,
  authenticationReducer,
  dashboardReducer,
  holidayCalendarReducer,
  timetableReducer,
  leaveReducer,
  salaryReducer
});
