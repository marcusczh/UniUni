import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import Feed from "./Feed";
import styles from "./HomePage.module.css";
import Logo from "../Global/Logo";

function homePage() {
  return (
    <>
      <div className={styles.topContent}>
        <Logo />
        <NavBar />
        <LogOut />
      </div>
      <div>
        <SearchBar />
      </div>
      <Feed />
    </>
  );
}

export default homePage;
