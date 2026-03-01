import React, {  useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

WeeklyTimetable.propTypes = {
  schedule: PropTypes.object.isRequired,
  startTimeKey: PropTypes.string.isRequired,
  endTimeKey: PropTypes.string.isRequired,
  timeSteps: PropTypes.string.isRequired,
  lunchStartTime: PropTypes.string.isRequired,
  lunchEndTime: PropTypes.string.isRequired,
};
export default function WeeklyTimetable({
  schedule,
  startTimeKey,
  endTimeKey,
  timeSteps,
  lunchStartTime,
  lunchEndTime,
}) {

  const [timeKeyPoints, settimeKeyPoints] = useState([]);

  useEffect(() => {
    createTimeIntervals();
  }, [startTimeKey, endTimeKey, timeSteps, lunchStartTime, lunchEndTime]);

  const createTimeIntervals = () => {
    let startTime = parseInt(startTimeKey);
    let endTime = parseInt(endTimeKey);
    let timeStep = parseInt(timeSteps);
    const periodsInADay = moment.duration(1, "day").as("m");
    const timeLabels = [];
    const startTimeMoment = moment(startTime, "hh:mm");
    const endTimeMoment = moment(endTime, "hh:mm");
    for (
      let i = 0;
      i <= periodsInADay && startTimeMoment < endTimeMoment;
      i += timeStep
    ) {
      startTimeMoment.add(i === 0 ? 0 : timeStep, "m");
      timeLabels.push(startTimeMoment.format("HH:mm"));
    }
    settimeKeyPoints(timeLabels);
  };

  const eachCellValue = (day, start, end) => {
      if(start >= lunchStartTime && end <= lunchEndTime){
          return (
            <td class="timetable-workout-lunch">
                LUNCH
            <br /> {lunchStartTime} - {lunchEndTime}
          </td>
          )
      }
      const targetObj = schedule[day].filter(val =>  
        (start >= moment(val.start).format("HH:mm") && moment(val.end).format("HH:mm") > start)
        ||
        (moment(val.start).format("HH:mm") < end && 
            (moment(val.end).format("HH:mm") > start && moment(val.start).format("HH:mm") <= end)
        ))
      if(targetObj.length === 1 && targetObj[0].title){
        return (
            <td class="timetable-workout">
              {targetObj[0].title}
              <br /> {moment(targetObj[0].start).format("HH:mm")} - {moment(targetObj[0].end).format("HH:mm")}
            </td>
          )
      }else if(targetObj.length > 1){
        return (
            <td class="timetable-workout-error">
              {targetObj.map(val => val.title).join(', ')}
              <br /> 
              {targetObj.map(val => `${moment(val.start).format("HH:mm")} - ${moment(val.end).format("HH:mm")}`).join(', ')}
            </td>
          )
      } else {
        return (<td></td>);
      }
  }
  const getEventForMonday = (existingObjKeys, day, start, end) => {
    if(existingObjKeys.length >= 0 && existingObjKeys.includes(day) && schedule[day].length > 0){
        return eachCellValue(day, start, end);
    } else {
        return (<td></td>);
    }
  };
  const getEventForTuesday = (existingObjKeys, day, start, end) => {
    if(existingObjKeys.length >= 0 && existingObjKeys.includes(day) && schedule[day].length > 0){
        return eachCellValue(day, start, end);
    } else {
        return (<td></td>);
    }
  };
  const getEventForWednesday = (existingObjKeys, day, start, end) => {
    if(existingObjKeys.length >= 0 && existingObjKeys.includes(day) && schedule[day].length > 0){
        return eachCellValue(day, start, end);
    } else {
        return (<td></td>);
    }
  };
  const getEventForThursday = (existingObjKeys, day, start, end) => {
    if(existingObjKeys.length >= 0 && existingObjKeys.includes(day) && schedule[day].length > 0){
        return eachCellValue(day, start, end);
    } else {
        return (<td></td>);
    }
  };
  const getEventForFriday = (existingObjKeys, day, start, end) => {
    if(existingObjKeys.length >= 0 && existingObjKeys.includes(day) && schedule[day].length > 0){
        return eachCellValue(day, start, end);
    } else {
        return (<td></td>);
    }
  };

  return (
    <div class="mb-20">
      <div class="table-responsive">
        <table class="timetable table table-striped ">
          <thead>
            <tr class="text-center">
              <th scope="col"></th>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
            </tr>
          </thead>
          <tbody>
            {timeKeyPoints.length &&
              timeKeyPoints.map((time, index) => {
                const existingObjKeys = Object.keys(schedule);
                const start = timeKeyPoints[index];
                const end = timeKeyPoints[index + 1];
                while (end !== undefined) {
                  return (
                    <tr key={`${time}_${index}`}>
                      <th scope="row">{`${start} - ${end}`}</th>
                      {getEventForMonday(existingObjKeys, "Monday", start, end)}
                      {getEventForTuesday(existingObjKeys, "Tuesday", start, end)}
                      {getEventForWednesday(existingObjKeys, "Wednesday", start, end)}
                      {getEventForThursday(existingObjKeys, "Thursday", start, end)}
                      {getEventForFriday(existingObjKeys, "Friday", start, end)}
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
