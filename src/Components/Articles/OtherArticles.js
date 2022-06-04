import styles from "./Articles.module.css";

function otherArticles() {
  axios
    .get("http://localhost:4000/api/information", {
      params: {
        type: "Article",
        title: "*",
        date: "*",
        tags: "*",
        body: "*",
      },
    })
    .then((res) => {
      if (res.data.length === 0) {
        updatePost("No post.");
      } else {
        console.log(res);
        res.data[0];
      }
    });

  return (
    <>
      <div className={styles.otherArticlesHeader}>
        Y3 NUS Business Administration
      </div>
      <div className={styles.otherArticlesContent}>
        Course Info
        <br />
        Question 1 | How would you describe your course to someone who knows
        nothing about it?
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </div>
    </>
  );
}

export default otherArticles;
