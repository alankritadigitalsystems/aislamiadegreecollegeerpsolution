import {post, deleteMethod} from '../common/Provider';

const createCalendar =  (payload = {}, callback) => async (dispatch) =>{
    const res = await post("api/v1/holiday/createHolidays", payload);
    if(res.data) {
        callback(res.data);
    }
}

const fetchCalendarByYear =  (payload = {}, callback) => async (dispatch) =>{
    const res = await post("api/v1/holiday/holidaysByYear", payload);
    if(res.data) {
        callback(res.data);
    }
}

const deleteCalendar =  (payload = {}, callback) => async (dispatch) =>{
    const res = await deleteMethod("api/v1/holiday/delete", payload);
    if(res.data) {
        callback(res.data);
    }
}

export {createCalendar, fetchCalendarByYear, deleteCalendar}


