import React, { createContext, useState } from "react";

export class Constants {
  static colors: string[] = [
    "red",
    "blue",
    "green"
  ]
}

class ReminderModel {
  name: string = "";
  hour: number = 9;
  minutes: number = 0;
  city: string = "";
  color: string = "";
}

class DayModel {
  remindersList: ReminderModel[] = [];
}

class CalendarContextProps {
  dayMap: Map<string, DayModel>;
  isPopoverOpen: boolean = false;
  currentPopoverTarget: string = "calendarId";
  constructor() {
    this.dayMap = new Map<string, DayModel>();
    
  }

  setDayMap = (map:Map<string, DayModel>) => {}
  setPopoverState = (state: boolean) => {}
  setCurrentTarget = (target:string) => {}
}

const CalendarContext = createContext(new CalendarContextProps());

export default CalendarContext;

export const CalendarProvider = (props: any) => {

  const [dayMap, setDayMap] = useState(new Map<string, DayModel>());
  const [isPopoverOpen, setPopoverState] = useState(false);
  const [currentPopoverTarget, setCurrentTarget] = useState("calendarId");

  return (
    <CalendarContext.Provider
      value={{dayMap, isPopoverOpen, currentPopoverTarget, setDayMap, setPopoverState, setCurrentTarget}}
      {...props}
    >      
    </CalendarContext.Provider>
  );
}

