import { useState } from "react";
import axios from "axios";
import styles from "./Welcome.module.css";
import Logo from "../Global/Logo";
import { useNavigate } from "react-router-dom";

function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("No bio found");
  const [passwordCfm, setPasswordCfm] = useState("");
  const [basicInfo11, setBasicInfo11] = useState("");
  const [basicInfo1, setBasicInfo1] = useState([]);
  const [basicInfo2, setBasicInfo2] = useState([]);
  const [basicInfo3, setBasicInfo3] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [teleHandle, setTeleHandle] = useState("");
  const navigate = useNavigate();

  const basic1 = [
    "Junior College",
    "Polytechnic",
    "ITE",
    "NS",
    "Working",
    "Overseas",
  ];
  const basic2 = [
    "Healthcare",
    "Engineering",
    "Business",
    "Computing",
    "Arts and Humanities",
    "Law and Policy",
    "Social Sciences",
    "Design and Environment",
    "Mathematics and Science",
  ];
  const basic3 = [
    "Personal Finance",
    "Adulting",
    "Part-time Jobs",
    "Career",
    "Education",
  ];

  function handleCheckboxChange(data, array, setter) {
    const isChecked = array.some((checkedCheckbox) => checkedCheckbox === data);
    if (isChecked) {
      setter(array.filter((checkedCheckbox) => checkedCheckbox !== data));
    } else {
      setter(array.concat(data));
    }
  }

  function submitSignUp(event) {
    event.preventDefault();
    const match = password === passwordCfm;
    const tele = teleHandle !== "";
    if (username && password && match && tele) {
      axios
        .post("/api/register", {
          username: username,
          password: password,
          bio: bio,
          currentStatus: basicInfo11,
          pastStatus: basicInfo1,
          interests: basicInfo2.concat(basicInfo3),
          profilePicture: imageLink,
          teleHandle: teleHandle,
        })
        .then((res) => {
          if (res.data.status === "error") {
            alert("Username is already in use.");
          } else {
            alert("Successfully registered. Please log in.");
            navigate("../Login", { replace: true });
          }
        });
    } else if (!match) {
      alert("Passwords do not match");
    } else if (!tele) {
      alert("Please input your telegram handle");
    } else {
      alert("Invalid input");
    }
  }

  return (
    <>
      <header>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.mainHeader}>Welcome to UniUni</div>
          <div className={styles.subHeader}>Let's get to know you!</div>
        </div>
      </header>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            submitSignUp();
          }}
        >
          <div className={styles.questionContainer}>
            <label className={styles.question} htmlFor="bio">
              Tell us about yourself!
            </label>
            <textarea
              type="text"
              className={styles.bioInput}
              placeholder="User Bio"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.question} htmlFor="basic11">
              Where are you and where have you been?
            </label>
            <p>
              Currently:
              <select
                className={styles.dropdown}
                id="basic11"
                onChange={(e) => setBasicInfo11(e.target.value)}
                defaultValue=""
              >
                <option key="disabled1" value="" disabled>
                  Choose an option
                </option>
                {basic1.map((item) => (
                  <option value={item} key={`basic1:${item}`}>
                    {item}
                  </option>
                ))}
              </select>
            </p>
            <fieldset>
              <legend className={styles.question}>Where have you been?</legend>
              {basic1.map((item) => (
                <>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="basic1"
                    value={item}
                    id={`id:${item}`}
                    key={`basic1key:${item}`}
                    onChange={(e) =>
                      handleCheckboxChange(item, basicInfo1, setBasicInfo1)
                    }
                  />
                  <label htmlFor={item} key={`basic1label:${item}`}>
                    {item}
                  </label>
                </>
              ))}
            </fieldset>
          </div>
          <div className={styles.questionContainer}>
            <fieldset>
              <legend className={styles.question} htmlFor="basic2">
                Which courses do you want to know more about?
              </legend>
              {basic2.map((item) => (
                <>
                  <input
                    className={styles.question}
                    type="checkbox"
                    key={"basic2" + item}
                    value={item}
                    id={item}
                    onChange={(e) =>
                      handleCheckboxChange(item, basicInfo2, setBasicInfo2)
                    }
                  />
                  <label htmlFor={item}>{item}</label>
                </>
              ))}
            </fieldset>
          </div>
          <div className={styles.questionContainer}>
            <label className={styles.question} htmlFor="basic3">
              Anything else?
            </label>
            <p>
              <select
                id="basic3"
                placeholder="Others"
                className={styles.dropdown}
                onChange={(e) => setBasicInfo3(e.target.value)}
                defaultValue=""
              >
                <option key="disabled" value="" disabled>
                  Choose an option
                </option>
                {basic3.map((item) => (
                  <option value={item} key={`basic3:${item}`}>
                    {item}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <div className={styles.credentialsContainer}>
            <label htmlFor="username">Tell us your name!</label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              data-testid="username"
            />
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password"
            />
            <input
              id="passwordCfm"
              type="password"
              value={passwordCfm}
              placeholder="Type your password again"
              onChange={(e) => setPasswordCfm(e.target.value)}
              data-testid="passwordCfm"
            />

            <label htmlFor="teleHandle">Telegram Handle? </label>
            <input
              id="teleHandle"
              type="text"
              value={teleHandle}
              placeholder="Telegram Handle"
              onChange={(e) => setTeleHandle(e.target.value)}
              data-testid="teleHandle"
            />
          </div>
          <div className={styles.questionContainer}>
            <label htmlFor="profilepicture" className={styles.question}>
              Provide a image link for your profile picture!
            </label>

            <input
              type="text"
              placeholder="Image Link"
              onChange={(e) => setImageLink(e.target.value)}
            />
            <img src={`${imageLink}`} alt="No pic specified" />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={submitSignUp}
              data-testid="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupScreen;
