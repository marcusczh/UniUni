import { Link, useNavigate } from "react-router-dom";
import styles from "./Global.module.css";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LogOut() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const HandleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    useNavigate("../");
  };
  
  const HandleViewMyProfile = (e) => {
    e.preventDefault();
    useNaigate("../MyProfile");
  };

  return user ? (
    <div className={styles.buttonContainer}>
      Welcome, {user ? user.username : null}
      <button className={styles.logOut} onClick={(e) => HandleViewMyProfile(e)}>View my profile</button>
      <button onClick={(e) => HandleLogout(e)} className={styles.logOut}>
        Log out
      </button>
    </div>
  ) : (
    <div>
      <button onClick={(e) => HandleLogout(e)} className={styles.logOut}>
        <Link to="../Login">Log In</Link>
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
