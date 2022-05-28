import styles from "./LogIn.module.css";

function LogInScreen() {
  return (
    <>
      <div className={styles.border}>
        <div className={styles.userInput}>
          <label>Username:</label>
          <form>
            <input
              type="text"
              placeholder="Your Username"
              className={styles.username}
            ></input>
          </form>
          <label>Password:</label>
          <form>
            <input
              type="text"
              placeholder="Your Password"
              className={styles.password}
            ></input>
          </form>
        </div>
        <button
          className={styles.logInButton}
          onClick={(event) => (window.location.href = "/HomePage")}
        >
          LogIn
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
