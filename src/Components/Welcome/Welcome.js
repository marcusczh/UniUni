import { Link } from "react-router-dom";
import Avatar from "./avatarphoto.png";
import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomeContainer}>
        <div className={styles.header}>Welcome to UniUni</div>
        <Link to="/">
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={Avatar} alt="avatar" />
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <Link className={styles.button} to="/SignUp">
            Sign up
          </Link>
          <Link className={styles.button} to="/LogIn">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
