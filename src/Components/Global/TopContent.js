import NavBar from "./Navbar";
import LogOut from "./Logout";
import Logo from "./Logo";
import styles from "./Global.module.css";

function TopContent({ user, setUser }) {
  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default TopContent;
