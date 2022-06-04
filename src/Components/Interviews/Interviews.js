import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import stylesInterview from "./Interviews.module.css";
import RecommendedInterview from "./RecommendedInterview";
import OtherInterviews from "./OtherInterviews";
import { Link } from "react-router-dom";

function interviews() {
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
      <Link to="./TestInterview" className={stylesInterview.recommendedInterview}>
        <RecommendedInterview /> 
      </Link>
      <div className={stylesInterview.otherInterviews}>
          <div><OtherInterviews /></div>
          <div><OtherInterviews /></div>
          <div><OtherInterviews /></div>
      </div>
    </>
  );
}

export default interviews;
