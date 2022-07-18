import { Link, useNavigate } from "react-router-dom";
import styles from "./Global.module.css";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LogOut() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HandleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("../");
  }

  function HandleViewMyProfile(e) {
    e.preventDefault();
    navigate("../MyProfile");
  }

  return user ? (
    <div className={styles.buttonContainer}>
      <span>Welcome,</span>
      <div className={styles.username}>{user ? user.username : null}</div>
      <div className={styles.buttonContainer2}>
        <button
          className={styles.profile}
          onClick={(e) => HandleViewMyProfile(e)}
        >
          👤
        </button>
        <button onClick={(e) => HandleLogout(e)} className={styles.logOut}>
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.buttonContainer}>
      <button onClick={(e) => HandleLogout(e)} className={styles.logOut}>
        <Link className={styles.logOut} to="../Login">
          Log In
        </Link>
      </button>
    </div>
  );
}

export default LogOut;
