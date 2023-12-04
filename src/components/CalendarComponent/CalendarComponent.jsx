import { useState } from "react";
import Calendar from "react-calendar";
import "./CalendarComponent.css";

function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        className={"calendar"}
        locale="en-EN"
        minDetail="month"
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
}

export default CalendarComponent;
