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
      Welcome, {user ? user.username : null}
      <button className={styles.logOut} onClick={(e) => HandleViewMyProfile(e)}>
        View my profile
      </button>
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
  );
}

export default LogOut;
