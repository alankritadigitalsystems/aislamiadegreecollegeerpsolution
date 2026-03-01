import {get, post, deleteMethod, put} from '../common/Provider';
import moment from 'moment';

const createNews = (payload = {}, callback) => async (dispatch) => {
    const {fullName: {first_name = '', last_name = ''} = {}} = payload;
    const requestPayload = {
        title: payload.newsTitle,
        description: payload.newsDescription,
        creator_name: `${first_name} ${last_name}`,
        news_mode: payload.newsMode,
        created_by: payload.id
    }
    if (payload.classId) {
        requestPayload.class_id = payload.classId;
    }
    dispatch({type: 'CREATE_NEWS', payload: {isCreating: true}});
    const res = await post("/api/v2/notice/createNews", requestPayload);
    dispatch({type: 'CREATE_NEWS', payload: {isCreating: false}});
    if (res.data.newsID) {
        callback();
    }
}

const getAllNews = () => async (dispatch) => {
  dispatch({ type: 'NEWS_LOADING', payload: { newsLoading: true } });
  const res = await get("/api/v2/notice/NewsForFaculty");
  console.log("--- Fetched News Data ---", res?.data); 

  dispatch({ type: 'NEWS_LOADING', payload: { newsLoading: false } });

  const newsData = res?.data?.news || []; 
console.log(newsData)
  if (newsData.length) {
    dispatch({ type: 'GET_ALL_NEWS', payload: { news: newsData } });
  } else {
    dispatch({ type: 'GET_ALL_NEWS', payload: { news: [] } });
  }
};



const getUserProfile = (id) => async (dispatch) => {
    dispatch({ type: "GET_USER_PROFILE", payload: { loadingProfile: true } });

    try {
        const res = await get(`/api/v2/faculty/FacultyByID?_id=${id}`);
        const { data = {} } = res || {};

        if (data && data._id) {
            dispatch({ type: "UPDATE_PROFILE", payload: { newProfile: data } });
        } else {
            dispatch({ type: "UPDATE_PROFILE", payload: { newProfile: {} } });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch({ type: "UPDATE_PROFILE", payload: { newProfile: {} } });
    }

    dispatch({ type: "GET_USER_PROFILE", payload: { loadingProfile: false } });
};

const deleteNews = (id, callback) => async (dispatch) => {
    const payload = {
        _id: id
    };
    dispatch({type: 'DELETE_NEWS', payload: {isDeleting: true}});
    const res = await deleteMethod("/api/v2/notice/deleteNews", payload);
    dispatch({type: 'DELETE_NEWS', payload: {isDeleting: false}});
    if (res?.data?.DeleteStatus) {
        callback();
    }
}

const createUser = (payload, callback, errorCallback) => async (dispatch) => {
    dispatch({type: 'CREATE_USER', payload: {creatingUser: true}});
    const res = await post("api/v1/faculty/createNewFaculty", payload);
    dispatch({type: 'CREATE_USER', payload: {creatingUser: false}});
    if (res?.data?.message === "saved") {
        callback();
    } else {
        errorCallback();
    }
};

const updateUserProfile = (payload, callback) => async (dispatch) => {
    dispatch({type: 'UPDATE_FACULTY', payload: {updatingFaculty: true}});
    const res = await put("api/v1/faculty/edit", payload);
    if (res?.data?.UpdateStatus) {
        const result = await get(`api/v1/faculty/FacultyByID?_id=${payload._id}`);
        const {data = {}} = result || {};
        if (Object.keys(data).length && data._id) {
            dispatch({type: 'UPDATE_PROFILE', payload: {newProfile: data}})
        }
        callback('Profile updaed successfully', 'success');
    } else {
        callback('Unable to update profile. Please try again.', 'error');
    }
    dispatch({type: 'UPDATE_FACULTY', payload: {updatingFaculty: false}});
};

const addSubject = (payload, callback) => async (dispatch) => {
    dispatch({type: 'ADD_SUBJECT', payload: true});
    const res = await post("api/v1/subject/createSubject", payload);
    dispatch({type: 'ADD_SUBJECT', payload: false});
    if (res?.data?.message === "saved") {
        callback();
        dispatch({type: 'SUBJECT_SUCCESS', payload: true});
    } else {
        dispatch({type: 'SUBJECT_SUCCESS', payload: false});
    }
};

const getAllSubjects = () => async (dispatch) => {
    dispatch({type: 'FETCH_SUBJECTS', payload: {fetchingSubjects: true}});
    const res = await get("api/v1/subject/allSubject");
    dispatch({type: 'FETCH_SUBJECTS', payload: {fetchingSubjects: false}});
    const {data = []} = res || {};
    if (data.length) {
        const allSub = data.map((subject) => {
            const {_id, name = ''} = subject;
            const sub = {
                value: _id,
                label: name
            }
            return sub;
        });
        dispatch({type: 'GET_ALL_SUBJECTS', payload: {allSubjects: allSub}})
    }
};

const createClass = (payload, callback) => async (dispatch) => {
    dispatch({type: 'CREATE_CLASS', payload: true});
    const res = await post("api/v1/class/createClass", payload);
    if (res?.data?.message === "saved") {
        callback(true);
    } else {
        callback(false);
    }
    dispatch({type: 'CREATE_CLASS', payload: false});
};

const getAllClasses = () => async (dispatch) => {
  const res = await get("api/v1/class/allClass");
  const { data = [] } = res || {};
  if (data.length) {
    const classes = data.map((cls) => {
      const {
        _id,
        course_name = "",
        course_type = "",
        department = "",
        category = "",
        start_date = "",
        year = "",
        no_of_semesters = ""
      } = cls;
      const classes = {
        value: _id,
        cName: course_name,
        cType: course_type,
        dept: department,
        cat: category,
        startDate: start_date,
        year: year,
        totalSemesters: no_of_semesters
      };
      return classes;
    });
    dispatch({ type: 'GET_ALL_CLASSES', payload: { allClasses: classes } });
  }
};

const getAllFaculty = (selectedDate) => async (dispatch) => {
    dispatch({type: 'FACULTY_LOADING', payload: true});
    dispatch({type: 'ALL_FACULTY', payload: {allFaculty: []}});
    const res = await get("api/v1/faculty/allFaculty");
    const {data = []} = res || {};
    if (data.length) {
        const dayAttendance = await getAttendanceByDate(selectedDate);
        const allFaculty = data.map((faculty) => {
            const {email_id = '', mobile_number = '', department = '---', full_name: {first_name = '', last_name = ''} = {}, _id = '', profile_picture = ''} = faculty;
            const fa = {
                email_id,
                mobile_number,
                department,
                name: `${first_name} ${last_name}`,
                id: _id,
                isAttendanceMarked: false,
                profilePic: profile_picture
            };
            const facultyAttendance = dayAttendance.find((attendance) => attendance.id === _id);
            if (facultyAttendance) {
                fa.isAttendanceMarked = true;
                fa.isPresent = facultyAttendance.isPresent;
                fa.attendanceId = facultyAttendance._id;
            }
            return fa;
        })
        dispatch({type: 'ALL_FACULTY', payload: {allFaculty: allFaculty}});
        dispatch({type: 'FACULTY_LOADING', payload: false});
    }
};

const createAttendance = (payload, facultyList = []) => async (dispatch) => {
    const res = await post("api/v1/attendance/createAttendance", payload);
    if (res?.data?.message === "saved") {
        facultyList.forEach((faculty) => {
            if (payload.id === faculty.id) {
                faculty.isAttendanceMarked = true;
                faculty.isPresent = payload.isPresent;
            }
        })
        dispatch({type: 'ALL_FACULTY', payload: {allFaculty: facultyList}});
    }

};

const getAttendanceByDate = async (selectedDate) => {
    const res = await get(`api/v1/attendance/getAttendanceByDate?date=${selectedDate}`);
    return res?.data;
};

const getAllHolidays = (payload) => async (dispatch) => {
    dispatch({type: 'FETCH_HOLIDAY_LIST', payload: true});
    const res = await get("api/v1/holiday/allHolidays");
    const {data = []} = res || {};
    if (data.length) {
        const holidayDates = handleHolidayResponse(data);
        dispatch({type: 'HOLIDAY_LIST', payload: {holidayList: holidayDates}});
        dispatch({type: 'FETCH_HOLIDAY_LIST', payload: false});
        return holidayDates;
    }
    dispatch({type: 'FETCH_HOLIDAY_LIST', payload: false});
};

const handleHolidayResponse = (data) => {
    const holidayDates = [];
    data.forEach((holidays) => {
        const {holiday_list = {}} = holidays;
        Object.keys(holiday_list).forEach((key) => {
            const mon = holiday_list[key];
            const holidays = mon.map((hol) => {
                const ent = Object.entries(hol);
                return ent[0][0];
            })
            holidayDates.push(...holidays);
        })
    })
    return holidayDates;
};

const updateAttendance = (payload, facultyList = [], errorCallback) => async (dispatch) => {
    const res = await put("api/v1/attendance/editAttendance", payload);
    if (res?.data?.UpdateStatus) {
        facultyList.forEach((faculty) => {
            if (payload.id === faculty.id) {
                faculty.isAttendanceMarked = true;
                faculty.isPresent = payload.isPresent;
            }
        })
        dispatch({type: 'ALL_FACULTY', payload: {allFaculty: facultyList}});
    } else {
        errorCallback();
    }
};


const createTimetable = (payload, callback) => async (dispatch) => {
    const res = await post("api/v1/timetable/createTimetable", payload);
    if (res?.data?.message === "saved") callback();
};

const updateTimetable = (payload, callback) => async (dispatch) => {
    const res = await put("api/v1/timetable/editTimetable", payload);
    if (res?.data?.UpdateStatus ) callback();
};

const getTimetableByClassId = async (selectedClassId) => {
    const res = await get(`api/v1/timetable/getTimetableByClassID?class_id=${selectedClassId}`);
    return res?.data;
};

const deleteTimetable = (id, callback) => async (dispatch) => {
    const payload = {
        _id: id
    };
    const res = await deleteMethod("api/v1/timetable/deleteTimetable", payload);
    if (res?.data?.DeleteStatus) {
        callback();
    }
};

const getUserAttendance = (payload, callback) => async (dispatch) => {
    const {id, startingDate, endDate} = payload;
    dispatch({type: 'GET_ATTENDANCE', payload: true});
    dispatch({type: 'SAVE_ATTENDANCE', payload: {userAttendance: []}});
    const url = `api/v1/attendance/getAttendanceByIDandDate?starting_date=${startingDate}&ending_date=${endDate}&id=${id}`;
    const res = await get(url);
    dispatch({type: 'GET_ATTENDANCE', payload: false});
    const {data = [], status} = res || {};
    console.log(res);
    if (status === 201 || status === 100) {
        const holidayList = await dispatch(getAllHolidays());
        const attendance = handleAttendance(data, holidayList, payload);
        dispatch({type: 'SAVE_ATTENDANCE', payload: {userAttendance: attendance}});
        callback();
    }
};

const handleAttendance = (attendanceList, holidayList, payload) => {
    const {startingDate, endDate} = payload;
    const rangeHolidays = [];
    const rangeHol = [];
    const attDates = [];
    const notMarkedDates = [];
    const now = moment(startingDate);
    
    holidayList.forEach((hol) => {
        if (moment(hol).isSameOrAfter(moment(startingDate)) && moment(hol).isSameOrBefore(moment(endDate))) {
            const ob = {
                title: 'Holiday',
                start: new Date(hol),
                className: 'bg-lime'
            }
            rangeHolidays.push(ob);
            rangeHol.push(moment(hol).format('YYYY-MM-DD'));
        }
    });
    
    attendanceList.forEach((att) => {
        const d = moment(att.date).format('YYYY-MM-DD');
        attDates.push(d);
    });

    while(now.isSameOrBefore(endDate)) {
        const d = now.format('YYYY-MM-DD');
        const isWeekend = now.day() === 0 || now.day() === 6;
        if (!rangeHol.includes(d) && !attDates.includes(d) && !isWeekend) {
            const ob = {
                title: 'Not Marked',
                start: new Date(d),
                className: 'bg-yellow'
            };
            notMarkedDates.push(ob);
        }
        now.add(1, 'days');
    }

    const attendance = attendanceList.map((attendance) => {
        const {isPresent, date} = attendance;
        const obj = {
            start: date
        };
        if (isPresent) {
            obj.title = 'Present';
            obj.className = 'bg-success';
        } else {
            obj.title = 'Absent';
            obj.className = 'bg-red';
        }

        return obj;
    })

    const allAtt = [...attendance, ...rangeHolidays, ...notMarkedDates];

    return allAtt;
}

const verifyUser = (id, loggedInUserId) => async (dispatch) => {
    let isSuccess = false;
    const url=`api/v1/faculty/verifyApprover?id=${id}`;
    dispatch({type: 'VERIFY_USER', payload: {isVerifyingUser: true}});
    const res = await get(url);
    const {data = {}} = res || {};
    if (data.success) {
        isSuccess = true;
    } else {
        isSuccess = false;
    }
    dispatch({type: 'VERIFY_USER', payload: {isVerifyingUser: false, verificationSuccess: isSuccess, verifyApiCalled: true}});
}

const dispatchVerifyActions = () => (dispatch) => {
    dispatch({type: 'VERIFY_USER', payload: {isVerifyingUser: false, verificationSuccess: false, verifyApiCalled: false}});
}

export {
    createNews,
    getAllNews,
    deleteNews,
    createUser,
    updateUserProfile,
    addSubject,
    getAllSubjects,
    createClass,
    getAllClasses,
    getAllFaculty,
    createAttendance,
    getAllHolidays,
    updateAttendance,
    createTimetable,
    updateTimetable,
    deleteTimetable,
    getTimetableByClassId,
    getUserAttendance,
    verifyUser,
    dispatchVerifyActions,
    getUserProfile
}