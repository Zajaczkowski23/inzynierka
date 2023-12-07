import { useState } from "react";
import Calendar from "react-calendar";
import "./CalendarComponent.css";
import PropTypes from "prop-types";

function CalendarComponent({ onChange }) {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
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

CalendarComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CalendarComponent;
