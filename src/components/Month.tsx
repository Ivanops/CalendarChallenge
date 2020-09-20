import React from "react";
import Day from "./Day";
import "./Month.css";
import Week from "./Week";

class MonthProps {
  date: Date = new Date();
}

const Month = ({date}: MonthProps) => {

  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const populateMonth = () => {
    const days:React.ReactNode[] = [];
    let dayCounter = 0;
    for (let i = 0; i < firstDay.getDay(); i++) {
      let isWeekDay = true;
      const dayValue = new Date(date.getFullYear(), date.getMonth(), -(firstDay.getDay() - i));
      if (dayCounter === 0 || dayCounter === 6) isWeekDay = false;
      days.push(<Day key={`Key${date.getFullYear()}${date.getMonth()}${dayValue.getDate()}`} isWeekDay={isWeekDay} belongsToMonth={false} day={dayValue.getDate().toString()} month={(date.getMonth() - 1).toString()} year={date.getFullYear().toString()} />);
      dayCounter++;
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      if (dayCounter === 7) {
        dayCounter = 0;
      }
      let isWeekDay = true;
      if (dayCounter === 0 || dayCounter === 6) isWeekDay = false;
      days.push(<Day key={`Key${date.getFullYear()}${date.getMonth()}${i}`} isWeekDay={isWeekDay} belongsToMonth={true} day={i.toString()} month={date.getMonth().toString()} year={date.getFullYear().toString()} />);
      dayCounter++;
    }

    let extraDaysCounter = 1;
    if (days.length < 42) {
      for (let i = days.length; i < 42; i++) {
        if (dayCounter === 7) {
          dayCounter = 0;
        }
        let isWeekDay = true;
        if (dayCounter === 0 || dayCounter === 6) isWeekDay = false;
        days.push(<Day key={`Key${date.getFullYear()}${date.getMonth() + 1}${extraDaysCounter}`} isWeekDay={isWeekDay} belongsToMonth={false} day={extraDaysCounter.toString()} month={(date.getMonth() + 1).toString()} year={date.getFullYear().toString()} />);
        dayCounter++;
        extraDaysCounter++;
      }
    }

    const weeks: React.ReactNode[] = [];
    let week: React.ReactNode[] = []
    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7) {
        weeks.push(<Week key={`Key${date.getFullYear()}${date.getMonth()}${i/7}`} days={week} />)
        week = [];
      }
    }

    return weeks;
  }

  return (
    <div className="Month">
      <div className="DayNameContent">
        <span className="DayName">Sunday</span>
        <span className="DayName">Monday</span>
        <span className="DayName">Tuesday</span>
        <span className="DayName">Wednesday</span>
        <span className="DayName">Thursday</span>
        <span className="DayName">Friday</span>
        <span className="DayName">Saturday</span>
      </div>
      {populateMonth()}
    </div>
  );
}

export default Month;