import SearchBar from "../Global/Searchbar";
import Posts from "./Posts";
import PostActions from "./PostActions";
import TopContent from "../Global/TopContent";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Forum() {
  const [forum, setForum] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/forum`)
      .then((res) => {
        setForum(res.data);
      });
  }, []);

  if (!forum) return null;

  return (
    <>
      <TopContent />
      <div>
        <SearchBar />
        <PostActions />
      </div>
      {forum.map((i) => (
        <Link to={`/Forum/${i.title}`}>
          <Posts forum={i}/>
        </Link>
        ))
      }
    </>
  );
}

export default Forum;
