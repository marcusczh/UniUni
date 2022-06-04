import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import articleStyles from "./Articles.module.css";

function specificArticle() {
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
        <div className={articleStyles.layout}>
            <div>
                <div className={articleStyles.articleHeader}>
                    Topic e.g. Y3 NUS Business Administration
                    <br/>
                    date | tags e.g. NUS, Business, NOC (depends on what is mentioned in the interview)
                </div>
                <div className={articleStyles.articleContent}> 
                    Course Info
                    Question 1 | How would you describe your course to someone who knows nothing about it? 

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco

                    Question 2 | What are some interesting modules you have taken or want to take?

                    Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident … Read more
                </div>
            </div>
            <div className={articleStyles.navigator}>
                Course Info
                <nav className={articleStyles.navBar}>
                    <ul className={articleStyles.list}>
                    <li className={articleStyles.list}>
                        Decision Making
                    </li>
                    <li className={articleStyles.list}>
                        Curriculum
                    </li>
                    <li className={articleStyles.list}>
                        Personal Experiences
                    </li>
                    <li className={articleStyles.list}>Career Prospects</li>
                    <li className={articleStyles.list}>Student Life</li>
                    <li className={articleStyles.list}>Others</li>
                    </ul>
                </nav>
            </div>
        </div>
    </>
    );
}

export default specificArticle;