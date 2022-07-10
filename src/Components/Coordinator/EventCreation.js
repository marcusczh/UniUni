import eventStyles from "./Coordinator.module.css";
import { useState, useEffect, useRef } from "react";
import TopContent from "../Global/TopContent";
import axios from "axios";
import { format } from "date-fns";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { Calendar } from "react-date-range";

function EventCreation() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  function hideOnEscape(e) {
    if (e.key === "Escape") {
      setOpenCalendar(false);
    }
  }

  function hideOnClickOutside(e) {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  }

  function submitEvent(event) {
    event.preventDefault();
    let obj = {};
    obj.header = null;
    obj.text = content;
    axios
      .post("/api/events/create", {
        author: user.username,
        title: title,
        date: date,
        location: location,
        tags: [String],
        body: [obj],
        image: image,
      })
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === "error") {
          alert("Error: Duplicate title or missing input");
        } else {
          alert("Success!");
          navigate("../Coordinator");
        }
      })
      .catch((err) => console.log(err));
    /* 
    axios
      .post("/api/uploadimage/" + title, {
        image: image
      })
      .then((res) => {
        if (res.data.status === "error") {
          alert("error");
        } else {
          window.location.href = "./";
        }
      })
      .catch((err) => console.log(err));
      window.location.href = "./"; */
  }
  function handleSelect(dateSelection) {
    setDate(dateSelection);
  }

  return (
    <>
      <TopContent />
      <div>
        <form
          onSubmit={(e) => {
            submitEvent();
          }}
        >
          <div className={eventStyles.title}>
            <input
              type="text"
              placeholder="Title of event (Required)"
              className={eventStyles.titleInput}
              value={title}
              id="formInput"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>

          <div className="calendarWrap">
            <input
              value={format(date, "MM/dd/yyyy")}
              readOnly
              className="inputBox"
              onClick={() => setOpenCalendar(!openCalendar)}
            />
            <div ref={refOne}>
              {openCalendar && (
                <Calendar
                  date={date}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>
          </div>

          <div className={eventStyles.content}>
            <input
              type="text"
              placeholder="Location (Required)"
              className={eventStyles.titleInput}
              value={location}
              id="formInput"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Content (Required)"
              className={eventStyles.contentInput}
              value={content}
              id="formInput"
              onChange={(e) => setContent(e.target.value)}
            ></input>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
            ></input>
            <button
              className={eventStyles.buttonCreation}
              onClick={(event) => navigate("/Coordinator", { replace: true })}
            >
              Cancel
            </button>
            <button
              className={eventStyles.buttonCreation}
              onClick={submitEvent}
            >
              Create event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EventCreation;
