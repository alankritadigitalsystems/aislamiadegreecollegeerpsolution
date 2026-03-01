const timetableUserInputDispatcher = (e) => (dispatch) => {
  dispatch({
    type: "SET_TIMETABLE_INPUT_USER_INFO",
    payload: e,
  });
};

const timetableCreateDispatcher = (schedule, targetDay, val, index, incomingVal) => (dispatch) => {
    var existingObjKeys = Object.keys(schedule);
    let tempTimetableList = { ...schedule };
    if(existingObjKeys.includes(targetDay)) { //event for the day exists, update
       dispatch(timetableUpdateDispatcher(schedule, targetDay, val, index, incomingVal));
    } 
    else {
      tempTimetableList[targetDay] = [];
        if(incomingVal === "startTime"){
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          start: val
        }}
        else if(incomingVal === "endTime"){
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          end: val
        }}
        else{
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          title: val
        }}
    }
  dispatch(timetableListDispatcher(tempTimetableList));
}

const timetableUpdateDispatcher = (existingTimetable, targetDay, val, index, incomingVal) => (dispatch) => {
    let tempTimetableList = { ...existingTimetable };
    if(incomingVal === "startTime"){
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          start: val
        }}
        else if(incomingVal === "endTime"){
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          end: val
        }}
        else{
          tempTimetableList[targetDay][index] = {
          ...tempTimetableList[targetDay][index],
          title: val
        }}
  dispatch(timetableListDispatcher(tempTimetableList));
}

const timetableAddRowDispatcher = (existingTimetable, targetDay) => (dispatch) => {
    let tempTimetableList = { ...existingTimetable };
    tempTimetableList[targetDay].push({});
    dispatch(timetableListDispatcher(tempTimetableList));
}

const timetableRemoveRowDispatcher = (existingTimetable, targetDay) => (dispatch) =>  {
    let tempTimetableList = { ...existingTimetable };
    tempTimetableList[targetDay].pop({});
    dispatch(timetableListDispatcher(tempTimetableList));
}

const timetableListDispatcher = (e) => (dispatch) => {
  dispatch({
    type: "SET_TIMETABLE_LIST",
    payload: e,
  });
};

const resetTimetableDispatcher = () => (dispatch) => {
  dispatch({
    type: "RESET_TIMETABLE_LIST",
  });
};



export { 
  timetableUserInputDispatcher, 
  timetableCreateDispatcher, 
  timetableUpdateDispatcher, 
  timetableListDispatcher, 
  resetTimetableDispatcher,
  timetableAddRowDispatcher,
  timetableRemoveRowDispatcher
  };