import NavBar from "./Navbar";
import LogOut from "./Logout";
import Logo from "./Logo";
import styles from "./Global.module.css";

function TopContent() {
  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut />
      </div>
    </>
  );
}

export default TopContent;
