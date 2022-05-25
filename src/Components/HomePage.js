import NavBar from "./Navbar";
import LogOut from "./Logout";
import SearchBar from "./Searchbar";
import Feed from "./Feed";
import styles from "./HomePage.module.css";

function homePage() {
    return (
        <>
        
        <div className={styles.topContent}>
            <img className={styles.logo} src={require("./download.jpg")} alt="dummy img"></img>
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