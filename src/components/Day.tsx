import React, { useContext } from "react";
import "./Day.css";
import CalendarContext, {Constants, DayModel, ReminderModel} from '../context/CalendarContext';
import moment from "moment";

class DayProps {
  isWeekDay: boolean = false;
  belongsToMonth: boolean = false;
  year: string = '';
  month: string = '';
  day: string = '';
}

const Day = ({isWeekDay, belongsToMonth, year, month, day}: DayProps) => {

  const {setIsNewReminder, setPopoverState, setCurrentTarget, calendarManager, setReminder, setReminderIndex } = useContext(CalendarContext);

  const checkClassByFlags = () => {
    let className = "Day";
    if (isWeekDay) className = `${className} WeekDay`;
    if (belongsToMonth) className = `${className} BelongsToMonth`;
    return className;
  }

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCurrentTarget(`ID_${year}_${month}_${day}`);
    setIsNewReminder(true);
    setReminder(new ReminderModel());
    setPopoverState(true);
  }

  const handleDoubleClickReminder = (i: number) => {
    setCurrentTarget(`ID_${year}_${month}_${day}`);
    const dayModel = calendarManager.dayData.get(`ID_${year}_${month}_${day}`);
    const newDayModel = dayModel || new DayModel();
    setReminderIndex(i);
    setIsNewReminder(false);
    setReminder({...newDayModel.remindersList[i]});
    setPopoverState(true);
  }

  const populateReminders = () => {
    const list: React.ReactNode[] = [];
    const dayModel = calendarManager.dayData.get(`ID_${year}_${month}_${day}`);
    const reminders = dayModel?.remindersList || [];
    
    for (let i = 0; i < reminders.length; i ++) {
      list.push(<div key={i} onDoubleClick={(event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        handleDoubleClickReminder(i);
      }} className="DataReminder" style={{backgroundColor:reminders[i].color}}>{`| ${Constants.timeFormat(reminders[i].hour)}:${Constants.timeFormat(reminders[i].minutes)} - ${reminders[i].name}`}</div>)
    }
    return list;
  }

  return (
    <div id={`ID_${year}_${month}_${day}`} onDoubleClick={handleDoubleClick} className={ checkClassByFlags() }>
      <div className="Number">{day === "1" ? `${moment(new Date(parseInt(year), parseInt(month))).format("MMM")} ${day}` : day}</div>
      
      {populateReminders()}
      
    </div>
    
  );
}

export default Day;