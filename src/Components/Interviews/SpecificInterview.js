import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import interviewStyles from "./Interviews.module.css";

function specificInterview() {
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
        <div className={interviewStyles.layout}>
            <div>
                <div className={interviewStyles.interviewHeader}>
                    date | tags
                </div>
                <div className={interviewStyles.interviewContent}> 
                    Course Info
                    Question 1 | How would you describe your course to someone who knows nothing about it? 

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco

                    Question 2 | What are some interesting modules you have taken or want to take?

                    Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident … Read more
                </div>
            </div>
            <div className={interviewStyles.navigator}>
                Course Info
                <nav className={interviewStyles.navBar}>
                    <ul className={interviewStyles.list}>
                    <li className={interviewStyles.list}>
                        Decision Making
                    </li>
                    <li className={interviewStyles.list}>
                        Curriculum
                    </li>
                    <li className={interviewStyles.list}>
                        Personal Experiences
                    </li>
                    <li className={interviewStyles.list}>Career Prospects</li>
                    <li className={interviewStyles.list}>Student Life</li>
                    <li className={interviewStyles.list}>Others</li>
                    </ul>
                </nav>
            </div>
        </div>
    </>
    );
}

export default specificInterview;