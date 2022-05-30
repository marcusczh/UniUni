import styles from "./LogIn.module.css";
import React, { useState } from "react";
import axios from "axios";

function LogInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("ada");
        if (res.data.user) {
          alert("Login successful");
          window.location.href = "/HomePage";
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
          <form onSubmit={loginUser}>
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
          <form>
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
          onClick={loginUser}
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
