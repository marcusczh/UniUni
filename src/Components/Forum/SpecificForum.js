import NavBar from "../Global/Navbar";
import LogOut from "../Global/Logout";
import SearchBar from "../Global/Searchbar";
import styles from "../HomePage/HomePage.module.css";
import Logo from "../Global/Logo";
import forumStyles from "./Forum.module.css";
import PostActions from "./PostActions";
import Comments from  "./Comments";

function specificForum() {
    return (
        <>
        <div className={styles.topContent}>
            <Logo />
            <NavBar />
            <LogOut />
        </div>
        <div>
            <SearchBar /> 
            <PostActions />
        </div>
        <div>
            <div className={forumStyles.forumHeader}>
                Topic e.g. Y3 NUS Business Administration
                <br/>
                date | tags e.g. NUS, Business, NOC (depends on what is mentioned in the interview)
                <button className={forumStyles.moreOptions}>Delete post</button>
            </div>
            <div className={forumStyles.forumContent}> 
                Course Info
                Question 1 | How would you describe your course to someone who knows nothing about it? 

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                Question 2 | What are some interesting modules you have taken or want to take?

                Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident … Read more
            </div>
        </div>
        <Comments />
        <Comments />
        <Comments />
    </>
    );
}

export default specificForum;