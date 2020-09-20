import React, { createContext, useState } from "react";

export class Constants {
  static colors: string[] = [
    "#B71C1C",
    "#880E4F",
    "#311B92",
    "#1A237E",
    "#0D47A1",
    "#004D40",
    "#E65100",
    "#3E2723",
    "#4A148C"
  ]
  static timeFormat = (time:number) => {
    if (time < 10) return `0${time}`;
    return `${time}`
  }
  static textLimit = 30;
}

export class ReminderModel {
  name: string = "";
  hour: number = 9;
  minutes: number = 0;
  city: string = "";
  color: string = Constants.colors[0];
}

export class DayModel {
  remindersList: ReminderModel[] = [];
}

export class CalendarManager {
  dayData: Map<string, DayModel> = new Map<string, DayModel>();

  validateStringLength = (test:string) => {
    return test.length > Constants.textLimit;
  }

  validateHours = (hour:number) => {
    return hour > 23 || hour < 0;
  }

  validateMinutes = (minutes: number) => {
    return minutes > 59 || minutes < 0;
  }

  saveReminder = (id:string, reminder:ReminderModel): boolean => {
    if (this.validateStringLength(reminder.name)) return false;
    if (this.validateStringLength(reminder.city)) return false;
    if (this.validateHours(reminder.hour)) return false;
    if (this.validateMinutes(reminder.minutes)) return false;
    const dayModel = this.dayData.get(id);
    const newDayModel = dayModel || new DayModel();
    newDayModel.remindersList.push(reminder);
    newDayModel.remindersList.sort((a: ReminderModel, b: ReminderModel) => {
      if (a.hour === b.hour) return a.minutes - b.minutes;
      return a.hour - b.hour;
    });
    this.dayData.set(id, newDayModel);
    return true;
  }

  editReminder = (id: string, reminder:ReminderModel, index: number): boolean => {
    if (this.validateStringLength(reminder.name)) return false;
    if (this.validateStringLength(reminder.city)) return false;
    if (this.validateHours(reminder.hour)) return false;
    if (this.validateMinutes(reminder.minutes)) return false;
    const dayModel = this.dayData.get(id);
    const newDayModel = dayModel || new DayModel();
    newDayModel.remindersList[index] = {...reminder};
    newDayModel.remindersList.sort((a: ReminderModel, b: ReminderModel) => {
      if (a.hour === b.hour) return a.minutes - b.minutes;
      return a.hour - b.hour;
    });
    this.dayData.set(id, newDayModel);
    return true;
  }

  deleteAll(id:string) {
    const dayModel = this.dayData.get(id);
    const newDayModel = dayModel || new DayModel();
    newDayModel.remindersList = [];
    newDayModel.remindersList.sort((a: ReminderModel, b: ReminderModel) => {
      if (a.hour === b.hour) return a.minutes - b.minutes;
      return a.hour - b.hour;
    });
    this.dayData.set(id, newDayModel);
  }

  deleteOne(id:string, index:number) {
    const dayModel = this.dayData.get(id);
    const newDayModel = dayModel || new DayModel();
    newDayModel.remindersList.splice(index, 1);
    newDayModel.remindersList.sort((a: ReminderModel, b: ReminderModel) => {
      if (a.hour === b.hour) return a.minutes - b.minutes;
      return a.hour - b.hour;
    });
    this.dayData.set(id, newDayModel);
  }
}

class CalendarContextProps {
  calendarManager: CalendarManager = new CalendarManager();
  isPopoverOpen: boolean = false;
  isNewReminder: boolean = true;
  reminderIndex: number = 0;
  reminder: ReminderModel = new ReminderModel();
  currentPopoverTarget: string = "calendarId";
  currentDate: Date = new Date();

  setPopoverState = (state: boolean) => {}
  setCurrentTarget = (target:string) => {}
  setIsNew = (value: boolean) => {}
  setReminder = (reminder: ReminderModel) => {}
  setIsNewReminder = (value: boolean) => {}
  setReminderIndex = (index: number) => {}
  setCurrentDate = (date: Date) => {}
  setCalendarManager = (calendarmanager: CalendarManager) => {}
}

const CalendarContext = createContext(new CalendarContextProps());

export default CalendarContext;

export const CalendarProvider = (props: any) => {

  const [isPopoverOpen, setPopoverState] = useState(false);
  const [currentPopoverTarget, setCurrentTarget] = useState("calendarId");
  const [reminder, setReminder] = useState(new ReminderModel());
  const [isNewReminder, setIsNewReminder] = useState(true);
  const [reminderIndex, setReminderIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarManager, setCalendarManager] = useState(new CalendarManager());

  return (
    <CalendarContext.Provider
      value={{ calendarManager, currentDate, reminderIndex, isNewReminder, reminder,  isPopoverOpen, currentPopoverTarget, setPopoverState, setCurrentTarget, setReminder, setIsNewReminder, setReminderIndex, setCurrentDate, setCalendarManager}}
      {...props}
    >      
    </CalendarContext.Provider>
  );
}

