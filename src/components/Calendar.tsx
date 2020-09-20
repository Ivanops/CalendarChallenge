import React, {useContext} from "react";

import moment from "moment";
import './Calendar.css';
import Month from "./Month";
import CalendarContext from "../context/CalendarContext";


import Reminder from "./Reminder";
 

const Calendar = () => {

  const  {currentDate, setCurrentDate} = useContext(CalendarContext);
  
  let now = new Date(currentDate.getFullYear(), currentDate.getMonth());
  let next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  let previous =  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

  const month = moment(now).format("MMMM");
  const year = moment(now).format("YYYY");
  const preMonth = moment(previous).format("MMMM");
  const preYear = moment(previous).format("YYYY");
  const nextMonth = moment(next).format("MMMM");
  const nextYear = moment(next).format("YYYY");

  const handlePrevious = () => {
    setCurrentDate(new Date(previous.getFullYear(), previous.getMonth()));
  }

  const handleNext = () => {
    setCurrentDate(new Date(next.getFullYear(), next.getMonth()));
  }

  return (
    <div id="calendarId" className="Calendar">
      <div className="Title">
        <button onClick={handlePrevious} className="Button"> {preMonth} {preYear}</button>
        {month} {year}
        <button onClick={handleNext} className="Button">{nextMonth} {nextYear}</button>
      </div>
      <Month date={now} />
      <Reminder />
    </div>
  );
}

export default Calendar;