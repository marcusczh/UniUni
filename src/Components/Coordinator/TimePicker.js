import { Calendar } from "react-date-range";
import { format } from "date-fns";
import eventStyles from "./Coordinator.module.css";
export default function TimePicker(
  setOpenCalendar,
  openCalendar,
  date,
  refOne,
  handleSelect,
  time,
  handleTime
) {
  return (
    <>
      <div className="calendarWrap">
        <input
          value={date}
          readOnly
          className="inputBox"
          onClick={() => setOpenCalendar(!openCalendar)}
        />
        <div ref={refOne}>
          {openCalendar && (
            <Calendar
              date={date}
              onChange={(e) => {
                handleSelect(e.target.value);
                console.log(e.target.value);
              }}
              className="calendarElement"
            />
          )}
        </div>
      </div>
      <div className={eventStyles.timePicker}>
        <input
          type="time"
          value={time}
          onChange={(e) => handleTime(e.target.value)}
        />
      </div>
    </>
  );
}
