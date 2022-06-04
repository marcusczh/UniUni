import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import stylesGuide from "./Guides.module.css";
import RecommendedGuide from "./RecommendedGuide";
import OtherGuides from "./OtherGuide";
import { Link } from "react-router-dom";

function guides() {
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
      <Link to="./TestGuide" className={stylesGuide.recommendedGuide}>
        <RecommendedGuide />
      </Link>
      <div className={stylesGuide.otherGuides}>
          <div><OtherGuides /></div>
          <div><OtherGuides /></div>
          <div><OtherGuides /></div>
      </div>
    </>
  );
}

export default guides;
