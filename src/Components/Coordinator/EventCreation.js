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
  const [time, setTime] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const refOne = useRef(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.addEventListener("click", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  function toggleModal() {
    setModal(!modal);
  }

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
        authorTele: user.teleHandle,
        title: title,
        time: time,
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

  function handleTime(timeSelection) {
    setTime(timeSelection);
  }

  return user ? (
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
          {modal && (
            <>
              <div className={eventStyles.overlay} onClick={toggleModal}></div>
              <div className={eventStyles.confirmationPopup}>
                <div className={eventStyles.calendarWrap}>
                  Date:{" "}
                  <input
                    value={format(date, "MM/dd/yyyy")}
                    readOnly
                    className={eventStyles.calendarInput}
                    onClick={() => setOpenCalendar(!openCalendar)}
                  />
                  <div ref={refOne}>
                    <Calendar
                      date={date}
                      onChange={handleSelect}
                      className="calendarElement"
                    />
                  </div>
                </div>
                <div className={eventStyles.timePicker}>
                  Time:{" "}
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleTime(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className={eventStyles.content}>
            <div className={eventStyles.dateTime}>
              Date:{" "}
              <input
                value={format(date, "MM/dd/yyyy")}
                readOnly
                className={eventStyles.calendarInput}
              />{" "}
              Time: <input type="time" value={time} readOnly />
              {!modal && (
                <button
                  className={eventStyles.buttonCreation}
                  onClick={toggleModal}
                >
                  Pick a time
                </button>
              )}
            </div>
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
            <img src={`${image}`} alt="Add a pic if you want!" />
            <input
              type="text"
              placeholder="Image Link"
              className={eventStyles.imageInput}
              onChange={(e) => setImage(e.target.value)}
            />

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
  ) : (
    <>
      <TopContent />
      <div>Please Sign in</div>
    </>
  );
}

export default EventCreation;
