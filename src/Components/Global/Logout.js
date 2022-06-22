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
    <button onClick={(e) => handleLogout(e)} className={styles.logOut}>
      Welcome, {user ? user.username : null}
      ||
      <div>
        <Link to="../">Log out</Link>
      </div>
    </button>
  ) : (
    <div>
      <button onClick={(e) => handleLogout(e)} className={styles.logOut}>
        <Link to="../Login">Log In</Link>
      </button>
    </div>
  );
}

export default LogOut;
