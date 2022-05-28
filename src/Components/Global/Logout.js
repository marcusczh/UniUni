import { Link } from "react-router-dom";
import styles from "./Global.module.css";

function logOut() {
  return (
    <button className={styles.logOut}>
      <Link to="../">
        Welcome, User <br />
        Log out
      </Link>
    </button>
  );
}

export default logOut;
