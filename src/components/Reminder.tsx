import React, { useContext } from "react";
import "./Reminder.css";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import CalendarContext,  {Constants, ReminderModel, DayModel} from '../context/CalendarContext';
import moment from "moment";
import { report } from "process";

const Reminder = () => {

  const { reminderIndex,isNewReminder, reminder, isPopoverOpen, currentPopoverTarget, setPopoverState, setDayMap, dayMap, setReminder} = useContext(CalendarContext);

  const toggle = () => setPopoverState(false);

  const foramtDateId = () => {
    const targetSplitted = currentPopoverTarget.split(".");
    const date = new Date(parseInt(targetSplitted[1]), parseInt(targetSplitted[2]), parseInt(targetSplitted[3]))
    return `${moment(date).format("MMM")} ${targetSplitted[3]},  ${moment().format("YYYY")}`;
  }

  const handleInputChange = (event:any) => {
    if (event.target.value.length < 30) {
      reminder.name = event.target.value;
      setReminder({...reminder});
    }
  }

  const onHoursChange = (event:any) => {
    if (event.target.value > -1 && event.target.value < 24) {
      const value = parseInt(event.target.value);
      reminder.hour = value;
      setReminder({...reminder});
    }
  }

  const onMinutesChange = (event:any) => {
    if (event.target.value > -1 && event.target.value < 60) {
      const value = parseInt(event.target.value);
      reminder.minutes = value;
      setReminder({...reminder});
    }
  }
  const getWeather = async (city:string) => {
    const fetchData:RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "API-Key": "904d7f07d2e556c3360fcfbd8415bf89"
      }
    }
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=1&appid=904d7f07d2e556c3360fcfbd8415bf89`, fetchData);
    const json = await response.json();
    console.log(json);
  }

  const onCityChange = (event:any) => {
    if (event.target.value.length < 30) {
      reminder.city = event.target.value;
      getWeather(reminder.city);
      setReminder({...reminder});
    }
  }

  const changeColor = (color:string) => {
    reminder.color = color;
    setReminder({...reminder});
  }

  const populateColors = () => {
    const colorsElement: React.ReactNode[] = [];
    for (let i = 0; i < Constants.colors.length; i++) {
      colorsElement.push(<div key={i} onClick={() => {changeColor(Constants.colors[i])}} className="Color" style={{backgroundColor:Constants.colors[i]}}></div>)
    }
    return colorsElement;
  }

  const save = () => {
    const dayModel = dayMap.get(currentPopoverTarget);
    const newDayModel = dayModel || new DayModel();
    if (isNewReminder) newDayModel.remindersList.push(reminder);
    else newDayModel.remindersList[reminderIndex] = {...reminder};
    newDayModel.remindersList.sort((a: ReminderModel, b: ReminderModel) => {
      if (a.hour === b.hour) return a.minutes - b.minutes;
      return a.hour - b.hour;
    });
    dayMap.set(currentPopoverTarget, newDayModel);
    setDayMap(dayMap);
    toggle();
  }
 
  return (
    <Modal
      className="Reminder"
      isOpen={isPopoverOpen}
      toggle={toggle}
      >
        <ModalHeader className="Column">
            <div className="Title">
            <div className="Color" style={{backgroundColor:reminder.color}}></div>
            <div className="TitleText">{foramtDateId()}</div>
            </div>
            <input className="Input" onChange={handleInputChange} value={reminder.name} placeholder="Add New Reminder"></input>
        </ModalHeader>
        <ModalBody>
          <div>
            <input className="TimeInput" onChange={onHoursChange} type="number" value={Constants.timeFormat(reminder.hour)}></input>:
            <input className="TimeInput" onChange={onMinutesChange} type="number" value={Constants.timeFormat(reminder.minutes)}></input>
          </div>
          <div>
            <input className="Input" onChange={onCityChange} placeholder="City" value={reminder.city}></input>
          </div>
          <div className="ColorContainer">
            {populateColors()}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={save} style={{backgroundColor: "green"}}>Save Reminder</Button>
        </ModalFooter>
      </Modal>
  );
}

export default Reminder;