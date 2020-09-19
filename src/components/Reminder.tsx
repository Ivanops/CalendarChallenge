import React, { useContext, useState } from "react";
import "./Reminder.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import CalendarContext,  {Constants} from '../context/CalendarContext';
import moment from "moment";

const Reminder = () => {

  const { isPopoverOpen, currentPopoverTarget, setPopoverState} = useContext(CalendarContext);

  const [reminderTitle, setReminderTitle] = useState("");
  const [hours, setHours] = useState(9);
  const [minutes, setMinutes] = useState(0);
  const [city, setCity] = useState("");

  const toggle = () => setPopoverState(false);

  const foramtDateId = () => {
    const targetSplitted = currentPopoverTarget.split(".");
    const date = new Date(parseInt(targetSplitted[1]), parseInt(targetSplitted[2]), parseInt(targetSplitted[3]))
    return `${moment(date).format("MMM")} ${targetSplitted[3]},  ${moment().format("YYYY")}`;
  }

  const handleInputChange = (event:any) => {
    if (event.target.value.length < 30) {
      setReminderTitle(event.target.value);
    }
  }

  const onHoursChange = (event:any) => {
    if (event.target.value > -1 && event.target.value < 24) {
      const value = parseInt(event.target.value);
      setHours(value)
    }
  }

  const onMinutesChange = (event:any) => {
    if (event.target.value > -1 && event.target.value < 60) {
      const value = parseInt(event.target.value);
      setMinutes(value);
    }
  }

  const timeFormat = (time:number) => {
    if (time < 10) return `0${time}`;
    return `${time}`
  }

  const onCityChange = (event:any) => {
    if (event.target.value.length < 30) {
      setCity(event.target.value);
    }
  }


 
  return (
    <Modal
      className="Reminder"
      isOpen={isPopoverOpen}
      toggle={toggle}
      >
        <ModalHeader className="Column">
            <div className="Title">
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="TitleText">{foramtDateId()}</div>
            </div>
            <input className="Input" onChange={handleInputChange} value={reminderTitle} placeholder="Add New Reminder"></input>
        </ModalHeader>
        <ModalBody>
          <div>
            <input className="TimeInput" onChange={onHoursChange} type="number" value={timeFormat(hours)}></input>:
            <input className="TimeInput" onChange={onMinutesChange} type="number" value={timeFormat(minutes)}></input>
          </div>
          <div>
            <input className="Input" onChange={onCityChange} placeholder="City" value={city}></input>
          </div>
          <div className="ColorContainer">
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
            <div className="Color" style={{backgroundColor:"red"}}></div>
          </div>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
  );
}

export default Reminder;