import React from "react";
import "./Week.css";

class WeekProps {
  days: React.ReactNode[] = []
}

const Week = ({days}:WeekProps) => {
  return (
    <div className="Week">
      {days.map(day => day)}
    </div>
  );
}

export default Week;