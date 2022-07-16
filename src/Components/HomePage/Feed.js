import axios from "axios";
import articleStyles from "../Articles/Articles.module.css";
import { useState, useEffect } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import BookmarkButton from "../Global/BookmarkButton";

function Feed() {
  const user = useSelector(selectUser);
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function handleSearch() {
    let tags = [];
    const current = user
      ? user.currentStatus === ""
        ? []
        : [user.currentStatus]
      : [];
    tags = user ? tags.concat(user.interests.concat(current)) : [];
    //console.log(categories);
    //Queries articles/guides/interviews with the search input
    console.log(tags);
    await axios
      .get(`/api/search?title=${[]}&types=${[]}&tags=${[tags]}`)
      .then((res) => {
        //console.log(res.data);
        setResults(res.data);
        console.log(results);
      });
  }

  useEffect(() => {
    handleSearch();
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return results.length === 0 ? null : loaded ? (
    <div className={articleStyles.layout}>
      <div>
        <div className={articleStyles.articleHeaderFeed}>
          <span>
            {results[0].title}
            <br />
            {results[0].date} | views: {results[0].views}
            <br />
            {results[0].tags.slice(0, 3).map((tag) => (
              <span key={tag} className={articleStyles.tags}>
                {tag}
              </span>
            ))}
          </span>
          <BookmarkButton user={user} title={results[0].title} />
        </div>
        <div className={articleStyles.articleContent}>
          {results[0].image ? (
            <div className={articleStyles.imageContainer}>
              <img
                className={articleStyles.picture}
                src={results[0].image}
                alt="ArticlePhoto"
              />
            </div>
          ) : null}
          {results[0].body.map((i, counter) => (
            <>
              <section id={counter}>
                <b>
                  <u>{i.header}</u>
                </b>
              </section>
              <br />
              <div>{i.text}</div>
              <br />
            </>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={articleStyles.layout}>
      <div className={articleStyles.article}>loading ... </div>
    </div>
  );
}

export default Feed;
