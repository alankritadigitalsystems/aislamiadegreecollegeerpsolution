import React, { Fragment } from 'react';
import { DayPicker, addToRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import moment from 'moment';

const LeaveCalendar = (props = {}) => {
    const { setCount, setRangeDates, range, holidayList = [], setDaysApplied, actualLeaves, setErrorDisplay, showError,
        setSelectedDay, selectedDay, selectedLeaveType, availableLeaves, infiniteLeaves } = props;

    const handleDayClickNew = (day, { disabled }) => {
        if (disabled) return;
        const newRange = addToRange(day, range);
        const leavesLeft = checkAvailableLeaves(newRange);
        if (leavesLeft) {
            const newRange = addToRange(day, range);
            setRangeDates(newRange);
            if (newRange.from === null && newRange.to === null) {
                handleResetClick();
            }
        }
    }

    const checkAvailableLeaves = (selectedRange) => {
        let isAllowed = true;
        const { from, to } = selectedRange;
        let leavesAvailable = actualLeaves;
        if (actualLeaves === 0 && !infiniteLeaves) return false;

        if (!to) {
            return true;
        } else {
            const now = moment(from);
            const toDate = moment(to);
            let weekends = 0;
            // let holidays = 0;
            let rangeDays = toDate.diff(now, 'days') + 1;
            while (now.isSameOrBefore(toDate)) {
                const isWeekend = now.day() === 0;
                if (isWeekend) {
                    weekends++;
                }
                now.add(1, 'days');
            }

            // holidayList.forEach((hol) => {
            //     const dateExist = moment(hol).isBetween(moment(from), moment(to));
            //     if (dateExist) {
            //         holidays++;
            //     }
            // })

            const actualAppliedDays = rangeDays - weekends;
            if (!infiniteLeaves) {
                if (leavesAvailable >= actualAppliedDays) {
                    leavesAvailable = leavesAvailable - actualAppliedDays;
                    setCount(leavesAvailable);
                    setDaysApplied(actualAppliedDays);
                    if (showError) {
                        setErrorDisplay(false);
                    }
                } else {
                    isAllowed = false;
                    setErrorDisplay(true);
                }
            } else {
                setDaysApplied(actualAppliedDays);
            }
        }

        return isAllowed;
    }

    const handleResetClick = () => {
        setRangeDates({ from: undefined, to: undefined });
        setCount(actualLeaves);
        setDaysApplied(0);
    }

    const handleDayClick = (day, { selected, disabled }) => {
        if (disabled) return;
        if (selected) {
            setSelectedDay(undefined);
            setCount(actualLeaves);
            setErrorDisplay(false);
            setDaysApplied(0);
            setRangeDates({ from: undefined, to: undefined });
        } else {
            if (availableLeaves > 0) {
                setSelectedDay(day);
                setCount(actualLeaves - 1);
                setDaysApplied(1);
                setRangeDates({ from: day, to: day });
            } else {
                setErrorDisplay(true);
            }
        }
    };

    const getDisableDays = () => {
        return holidayList.map((holidayDate) => {
            return new Date(holidayDate);
        })
    }

    const renderSelectableCalendar = () => {
        return (
            <DayPicker
                selectedDays={selectedDay}
                onDayClick={handleDayClick}
                numberOfMonths={3}
                disabledDays={[{ daysOfWeek: [0, 6] }, ...getDisableDays()]}
            />
        );
    };

    const renderRangeCalendar = () => {
        const { from, to } = range;
        const modifiers = { start: from, end: to };
        return (
            <div className="RangeExample">
                <p className="ml-2">
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {(from || to) && (
                        <button type='button' className="btn btn-outline-dark btn-sm ml-5" onClick={handleResetClick}>
                            Reset
                        </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={3}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={handleDayClickNew}
                    disabledDays={[{ daysOfWeek: [0, 6] }, ...getDisableDays()]}
                />
            </div>
        );
    }

    return (
        <Fragment>
            {selectedLeaveType !== 'cl' && renderRangeCalendar()}
            {selectedLeaveType === 'cl' && renderSelectableCalendar()}
        </Fragment>
    );
}

export default LeaveCalendar;