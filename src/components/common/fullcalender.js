import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import "@fullcalendar/daygrid/index.cjs";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { connect } from "react-redux";
import { holidayCalendarListDispatcher } from "../../actions/holidayCalendarAction";


const headerdata = {
  left: "",
  center: "title",
  right: "",
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  boxSizing: "content-box",
};
class Fullcalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: "",
      selectedDate: "",
      openEventModal: false,
      toggleHolidayNameError: false,
      tempEventName: "",
    };
  }

  convertEventsPropToCalendarInputs = () => {
    // ========================= if input as prop =============================
    // let finalArray = [];
    // const { calendarEvents = {} } = this.props; // pick the holiday list from the redux store
    // const localCalendarEvents = calendarEvents[0];
    // if (Object.keys(localCalendarEvents).length > 0) {
    //   for (var keys in localCalendarEvents) {
    //     // keys== January, February, March ....
    //     finalArray = [
    //       ...finalArray,
    //       localCalendarEvents[keys].map((objs) => {
    //         return {
    //           title: objs[Object.keys(objs)[0]],
    //           start: Object.keys(objs)[0],
    //           className: "bg-success",
    //         };
    //       }),
    //     ];
    //   }
    // }
    // let data = [];
    // finalArray.forEach((hold) => {
    //   data = [...data, ...hold];
    // });
    // console.log("returning this from test func call", data);
    // return data;

    // ========================= if fetched from redux store =============================

    let finalArray = [];
    const { holiday_list = {} } = this.props; // pick the holiday list from the redux store
    if (Object.keys(holiday_list).length > 0) {
      for (var keys in holiday_list) {
        // keys== January, February, March ....
        finalArray = [
          ...finalArray,
          holiday_list[keys]?.map((objs) => {
            return {
              title: objs[Object.keys(objs)[0]],
              start: Object.keys(objs)[0],
              className: "bg-success",
            };
          }),
        ];
      }
    }
    let data = [];
    finalArray.forEach((hold) => {
      data = [...data, ...hold];
    });
    return data;
  };
  handleModalOpen = (permissions) =>{
     const {previousCalendarExists, handleExistingCalendarDayClick} = this.props;
     if(previousCalendarExists){
      //  alert("Calendar already exists, delete this to make changes!");
       handleExistingCalendarDayClick("Calendar already exists");
       return true;
     }
     else{
      handleExistingCalendarDayClick("");
       if(permissions.create) this.setState({ ...this.state, openEventModal: true });
       else this.setState({ ...this.state, openEventModal: false });
     }
    }
  handleModalClose = () => {
    this.setState({
      ...this.state,
      openEventModal: false,
      tempEventName: "",
      toggleHolidayNameError: false,
    });
  };
  handleEventAdd = (LoadedCalendar, func) => {
    const currMonth = LoadedCalendar.toLocaleString("default", {
      month: "long",
    });
    const currDate = moment(this.state.selectedDate).format("YYYY-MM-DD");
    if (this.state.tempEventName === " ") {
      this.setState({ ...this.state, toggleHolidayNameError: true });
    } else {
      if (this.getPrefilledEventName(LoadedCalendar)) {
        this.clearPrefilledEventName(LoadedCalendar, func);
      }
      var requestParam = {};
      var childRequestParam = [];
      var dateHolidayMappingObj = {};
      dateHolidayMappingObj[currDate] = this.state.tempEventName;
      childRequestParam.push(dateHolidayMappingObj);
      requestParam[currMonth] = childRequestParam;
      func(requestParam);
      setTimeout(() => {
        this.handleModalClose();
      }, 0);
    }
  };
  clearPrefilledEventName = (LoadedCalendar, func) => {
    const currMonth = LoadedCalendar.toLocaleString("default", {
      month: "long",
    });
    const currDate = moment(this.state.selectedDate).format("YYYY-MM-DD");
    const { holiday_list = {} } = this.props;
    const indx = holiday_list[currMonth].findIndex((obj) => obj[currDate]);
    let new_Holiday_list = holiday_list[currMonth].splice(indx, 1);
    func(new_Holiday_list);
  };
  getPrefilledEventName = (LoadedCalendar) => {
    let name = "";
    const currMonth = LoadedCalendar.toLocaleString("default", {
      month: "long",
    });
    const currDate = moment(this.state.selectedDate).format("YYYY-MM-DD");
    const { holiday_list = {} } = this.props;
    if (Object.keys(holiday_list).includes(currMonth)) {
      holiday_list[currMonth].filter((obj) => {
        if (obj[currDate]) {
          name = obj[currDate];
        }
      });
    } else {
      return name;
    }
    return name;
  };
  deletePrefilledEvent = (LoadedCalendar, func) => {
    const currMonth = LoadedCalendar.toLocaleString("default", {
      month: "long",
    });
    const currDate = moment(this.state.selectedDate).format("YYYY-MM-DD");
    // this.clearPrefilledEventName(LoadedCalendar, func);
    const { holiday_list = {} } = this.props;
    const indx = holiday_list[currMonth].findIndex((obj) => obj[currDate]);
    let new_Holiday_list = holiday_list[currMonth].splice(indx, 1);
    holidayCalendarListDispatcher(new_Holiday_list);
    setTimeout(() => {
      this.handleModalClose();
    }, 0);
  };

  render() {
    const { selectedYear, selectedMonth, handleHolidayEvents, permissions = {}, isSuperAdmin } = this.props;
    const LoadedCalendar = new Date(selectedYear);
    if (selectedYear) {
      LoadedCalendar.setMonth(0);
    }
    LoadedCalendar.setMonth(selectedMonth ? selectedMonth : 0);
    return (
      <div id="calender">
        <FullCalendar
          id="calendar"
          header={headerdata}
          defaultDate={LoadedCalendar}
          dayClick={(event) => {
            this.setState({
              ...this.state,
              selectedDate: moment(new Date(event)).format("DD-MMM-YYYY"),
            });
            this.handleModalOpen(permissions);
          }}
          eventLimit={true} // allow "more" link when too many events
          events={this.convertEventsPropToCalendarInputs()}
        />
        <Modal
          open={this.state.openEventModal}
          onClose={this.handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add holiday for <strong>{this.state.selectedDate}</strong>
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Holiday Name
                </InputLabel>
                <Input
                  autoFocus
                  error={this.state.toggleHolidayNameError}
                  id="standard-adornment-amount"
                  defaultValue={this.getPrefilledEventName(LoadedCalendar)}
                  onChange={(event) =>
                    this.setState({
                      ...this.state,
                      tempEventName: event.target.value,
                    })
                  }
                />
              </FormControl>
            </Typography>
            {this.state.toggleHolidayNameError && (
              <Typography color="error">
                Name required to save this event
              </Typography>
            )}
            <Stack
              spacing={3}
              direction={"row"}
              style={{
                width: "max-content",
                margin: "auto",
                marginTop: "1.5rem",
                display: "flex",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  this.handleEventAdd(LoadedCalendar, handleHolidayEvents)
                }
              >
                Create
              </Button>
              {this.getPrefilledEventName(LoadedCalendar) !== "" && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() =>
                    this.deletePrefilledEvent(
                      LoadedCalendar,
                      handleHolidayEvents
                    )
                  }
                >
                  Delete
                </Button>
              )}
              <Button
                variant="standard"
                size="small"
                onClick={() => this.handleModalClose()}
              >
                Discard
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  holiday_list: state.holidayCalendarReducer.holiday_list,
});
const mapDispatchToProps = (dispatch) => ({
  holidayCalendarListDispatcher: (e) =>
    dispatch(holidayCalendarListDispatcher(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fullcalender);
