import React from "react";

import moment from "moment";
import './Calendar.css';
import Month from "./Month";


import Reminder from "./Reminder";
 

const Calendar = () => {

  let d = new Date();
  let date = new Date(d.getFullYear(), d.getMonth());

  const month = moment(date).format("MMMM");
  const year = moment(date).format("YYYY");

  return (
    <div id="calendarId" className="Calendar">
      <div className="Title">
        {month} {year}
      </div>
      <Month date={date} />
      <Reminder />
    </div>
  );
}

export default Calendar;