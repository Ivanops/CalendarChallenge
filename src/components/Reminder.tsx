import React, { useContext, useState } from "react";
import "./Reminder.css";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import CalendarContext,  {Constants} from '../context/CalendarContext';
import moment from "moment";

const Reminder = () => {

  const { reminderIndex,isNewReminder, reminder, isPopoverOpen, currentPopoverTarget,  calendarManager, setCalendarManager, setPopoverState, setReminder} = useContext(CalendarContext);

  const toggle = () => setPopoverState(false);

  const [weather, setWeather] = useState("");

  const getDate = () => {
    const targetSplitted = currentPopoverTarget.split("_");
    const date = new Date(parseInt(targetSplitted[1]), parseInt(targetSplitted[2]), parseInt(targetSplitted[3]));
    return date;
  }

  const foramtDateId = () => {
    const date = getDate();
    return `${moment(date).format("MMM")} ${date.getDate()},  ${moment().format("YYYY")}`;
  }

  const handleInputChange = (event:any) => {
    if (event.target.value.length < Constants.textLimit) {
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
  const getWeather = async () => {
    const date = getDate();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${reminder.city}&cnt=1&date=${date.getTime()}&appid=904d7f07d2e556c3360fcfbd8415bf89`;
    //const url = `https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.list && json.list[0] && json.list[0].weather && json.list[0].weather[0] && json.list[0].weather[0].description) {
      setWeather(json.list[0].weather[0].description);
    } else {
      setWeather("Bad Input");
    }
  }

  const onCityChange = (event:any) => {
    if (event.target.value.length < Constants.textLimit) {
      reminder.city = event.target.value;
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
    if (isNewReminder) calendarManager.saveReminder(currentPopoverTarget, {...reminder});
    else calendarManager.editReminder(currentPopoverTarget, {...reminder}, reminderIndex);
    setCalendarManager(Object.assign({}, calendarManager));      
    toggle();  
  }

  const handleDelete = () => {
    if (isNewReminder) calendarManager.deleteAll(currentPopoverTarget);
    else calendarManager.deleteOne(currentPopoverTarget, reminderIndex);
    setCalendarManager(Object.assign({}, calendarManager));      
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
        <ModalBody className="Column">
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
          <div className="WeatherContainer">
            <Button onClick={getWeather}>Get Weather By City and Date</Button>
            <p className="WeatherResult">{weather}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          {isNewReminder ? <Button onClick={handleDelete} color="danger">Delete ALL Reminders</Button> : <Button onClick={handleDelete} color="danger">Delete This Reminders</Button>}
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={save} style={{backgroundColor: "green"}}>Save Reminder</Button>
        </ModalFooter>
      </Modal>
  );
}

export default Reminder;