import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import guideStyles from "./Guides.module.css";

function specificGuide() {
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
      <div className={guideStyles.layout}>
        <div>
          <div className={guideStyles.guideHeader}>
            Topic e.g. Y3 NUS Business Administration
            <br />
            date | tags e.g. NUS, Business, NOC (depends on what is mentioned in
            the interview)
          </div>
          <div className={guideStyles.guideContent}>
            Course Info Question 1 | How would you describe your course to
            someone who knows nothing about it? Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco Question 2 | What are some interesting modules
            you have taken or want to take? Laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident … Read more
          </div>
        </div>
        <div className={guideStyles.navigator}>
          Course Info
          <nav className={guideStyles.navBar}>
            <ul className={guideStyles.list}>
              <li className={guideStyles.list}>Decision Making</li>
              <li className={guideStyles.list}>Curriculum</li>
              <li className={guideStyles.list}>Personal Experiences</li>
              <li className={guideStyles.list}>Career Prospects</li>
              <li className={guideStyles.list}>Student Life</li>
              <li className={guideStyles.list}>Others</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default specificGuide;
