import SearchBar from "../Global/Searchbar";
import Feed from "./Feed";
import TopContent from "../Global/TopContent";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
      </div>
      <div className={styles.feature}>Here's a post you might like...</div>
      <div className={styles.feed}>
        <Feed />
      </div>
    </>
  );
}

export default HomePage;
