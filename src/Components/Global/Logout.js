import { Link } from "react-router-dom";
import styles from "./Global.module.css";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LogOut() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return user ? (
    <div className={styles.logOut}>
      <div className={styles.logOutWelcome}>
        Welcome, {user ? user.username : null}
      </div>
      <div className={styles.viewMyProfile}>
        <Link to="../MyProfile">View my profile</Link>
      </div>
      <button onClick={(e) => handleLogout(e)} className={styles.logoutButton}>
        <div>
          <Link to="../">Log out</Link>
        </div>
      </button>
    </div>
  ) : (
    <div className={styles.logOutContainer}>
      <div className={styles.logOut}>
        <button
          onClick={(e) => handleLogout(e)}
          className={styles.logoutButton}
        >
          <Link to="../Login">Log In</Link>
        </button>
      </div>
    </div>
  );
}

export default LogOut;
