import React from "react";
import { CalendarProvider } from "../context/CalendarContext";
import Calendar from './Calendar';

const App = () => {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;