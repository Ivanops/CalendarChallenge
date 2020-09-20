import React, { createContext, useState } from "react";

export class Constants {
  static colors: string[] = [
    "red",
    "blue",
    "green"
  ]
  static timeFormat = (time:number) => {
    if (time < 10) return `0${time}`;
    return `${time}`
  }
}

export class ReminderModel {
  name: string = "";
  hour: number = 9;
  minutes: number = 0;
  city: string = "";
  color: string = "red";
}

export class DayModel {
  remindersList: ReminderModel[] = [];
}

class CalendarContextProps {
  dayMap: Map<string, DayModel>;
  isPopoverOpen: boolean = false;
  isNewReminder: boolean = true;
  reminderIndex: number = 0;
  reminder: ReminderModel = new ReminderModel();
  currentPopoverTarget: string = "calendarId";
  constructor() {
    this.dayMap = new Map<string, DayModel>();
  }

  setDayMap = (map:Map<string, DayModel>) => {}
  setPopoverState = (state: boolean) => {}
  setCurrentTarget = (target:string) => {}
  setIsNew = (value: boolean) => {}
  setReminder = (reminder: ReminderModel) => {}
  setIsNewReminder = (value: boolean) => {}
  setReminderIndex = (index: number) => {}
}

const CalendarContext = createContext(new CalendarContextProps());

export default CalendarContext;

export const CalendarProvider = (props: any) => {

  const [dayMap, setDayMap] = useState(new Map<string, DayModel>());
  const [isPopoverOpen, setPopoverState] = useState(false);
  const [currentPopoverTarget, setCurrentTarget] = useState("calendarId");
  const [reminder, setReminder] = useState(new ReminderModel());
  const [isNewReminder, setIsNewReminder] = useState(true);
  const [reminderIndex, setReminderIndex] = useState(0);

  return (
    <CalendarContext.Provider
      value={{ reminderIndex, isNewReminder, reminder, dayMap, isPopoverOpen, currentPopoverTarget, setDayMap, setPopoverState, setCurrentTarget, setReminder, setIsNewReminder, setReminderIndex}}
      {...props}
    >      
    </CalendarContext.Provider>
  );
}

