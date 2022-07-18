import eventStyles from "./Coordinator.module.css";
import { useState } from "react";
import infoIcon from "./Information.png";

export default function TeleInfo() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <>
      <div className={eventStyles.teleNotif}>
        Use our telegram bot to help with event planning:{" "}
        <button className={eventStyles.infoButton} onClick={toggleModal}>
          <img src={infoIcon} alt="info" className={eventStyles.infoIcon}></img>
        </button>
      </div>
      {modal && (
        <>
          <div className={eventStyles.overlay} onClick={toggleModal}></div>
          <div className={eventStyles.confirmationPopup}>
            <div className={eventStyles.popupHeader}>
              Use our telegram bot for easy access to your event's information!
            </div>
            <div className={eventStyles.steps}>
              Steps to use our telegram bot 🤖:
              <p>
                1. Search for "UniUni Coordinator" or use{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://t.me/UniUniCoordinatorBot"
                >
                  this link
                </a>
                !
              </p>
              <p>
                2. You will be greeted with a welcome message, and asked to
                input your event title
              </p>
              <p>
                3. Note: You will only be able to input event titles that you
                have created
              </p>
              Available commands:
              <ul>
                <li>/start : Input event title</li>
                <li>/help : view all available commands</li>
                <li>/details : View the details of your event</li>
                <li>
                  /handles : View the Telegram handles of the participants of
                  your event.
                </li>
              </ul>{" "}
              <p>
                Use this to add them to your Telegram group chat! You're now all
                set for your event. Have fun!
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
