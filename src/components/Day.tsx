import React, { useContext } from "react";
import "./Day.css";
import CalendarContext from '../context/CalendarContext';

class DayProps {
  isWeekDay: boolean = false;
  belongsToMonth: boolean = false;
  year: string = '';
  month: string = '';
  day: string = '';
}

const Day = ({isWeekDay, belongsToMonth, year, month, day}: DayProps) => {

  const { setPopoverState, setCurrentTarget } = useContext(CalendarContext);

  const checkClassByFlags = () => {
    let className = "Day";
    if (isWeekDay) className = `${className} WeekDay`;
    if (belongsToMonth) className = `${className} BelongsToMonth`;
    return className;
  }

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCurrentTarget(`ID.${year}.${month}.${day}`);
    setPopoverState(true);
    
  }

  return (
    <div id={`ID.${year}.${month}.${day}`}  onDoubleClick={handleDoubleClick} className={ checkClassByFlags() }>
      {day}
    </div>
    
  );
}

export default Day;