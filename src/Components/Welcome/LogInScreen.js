import styles from "./LogIn.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

function LogInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.user) {
          alert("Login successful");

          dispatch(login(res.data.user));
          navigate("../HomePage", { replace: true });
        } else {
          alert("Please check your username and password");
        }
      });
  }

  return (
    <>
      <div className={styles.border}>
        <div className={styles.userInput}>
          <label>Username:</label>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await loginUser(e);
            }}
          >
            <input
              type="text"
              placeholder="Your Username"
              className={styles.username}
              value={username}
              id="formInput"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </form>
          <label>Password:</label>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await loginUser(e);
            }}
          >
            <input
              type="password"
              placeholder="Your Password"
              className={styles.password}
              id="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </form>
        </div>
        <button
          type="submit"
          className={styles.logInButton}
          id="loginButton"
          onClick={(e) => {
            loginUser(e);
          }}
        >
          Log In
        </button>
        <p className={styles.ORtext}>-- OR --</p>
        <button className={styles.googleButton}>Sign in with Google</button>
        <br></br>
        <button className={styles.facebookButton}>Sign in with Facebook</button>
      </div>
    </>
  );
}

export default LogInScreen;
