/* eslint-disable no-unused-vars */
import styles from "./LogIn.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import { useNavigate, Link } from "react-router-dom";

function LogInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    axios
      .post("/api/login", {
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
        <div>
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
          <br />
          <button
            className={styles.logInButton}
            id="signUpButton"
            onClick={(e) => {
              navigate("../SignUp", { replace: true });
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default LogInScreen;
