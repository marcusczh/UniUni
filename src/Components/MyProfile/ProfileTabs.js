import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import Posts from "../Forum/Posts";
import "./ProfileTabs.css";

export default function ProfileTabs({ posts }) {
  const [numPosts, setNumPosts] = useState(4);
  return posts ? (
    <Tabs className="Tabs">
      <div className="OuterTabsContainer">
        <div className="BookmarksLabel">Bookmarks</div>
        <div className="TabsContainer">
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Guides</Tab>
            <Tab>Interviews</Tab>
            <Tab>Forums</Tab>
            <Tab disabled>Events</Tab>
            <Tab disabled>Your chats</Tab>
          </TabList>
        </div>
      </div>
      <TabPanel>
        {posts.filter((post) => post.type === "Article") ? (
          <div className="postContainer">
            {posts
              .filter((post) => post.type === "Article")
              .sort((a, b) => b.score - a.score)
              .map((post) => <Posts post={post} />)
              .slice(0, Math.min(numPosts, posts.length))}
          </div>
        ) : null}
      </TabPanel>
      <TabPanel>
        {posts.filter((post) => post.type === "Guide") ? (
          <div className="postContainer">
            {posts
              .filter((post) => post.type === "Guide")
              .sort((a, b) => b.score - a.score)
              .map((post) => <Posts post={post} />)
              .slice(0, Math.min(numPosts, posts.length))}
          </div>
        ) : null}
      </TabPanel>
      <TabPanel>
        {posts.filter((post) => post.type === "Interview") ? (
          <div className="postContainer">
            {posts
              .filter((post) => post.type === "Interview")
              .sort((a, b) => b.score - a.score)

              .map((post) => <Posts post={post} />)
              .slice(0, Math.min(numPosts, posts.length))}
          </div>
        ) : null}
      </TabPanel>
      <TabPanel>
        {posts.filter((post) => post.type === "Forum") ? (
          <div className="postContainer">
            {posts
              .filter((post) => post.type === "Forum")
              .sort((a, b) => b.score - a.score)

              .map((post) => <Posts post={post} id={post} />)
              .slice(0, Math.min(numPosts, posts.length))}
          </div>
        ) : null}
      </TabPanel>
      <TabPanel>
        <p>temp Events</p>
      </TabPanel>
      <TabPanel>
        <p>temp Chats</p>
      </TabPanel>
    </Tabs>
  ) : (
    <Tabs className="Tabs">
      <div className="OuterTabsContainer">
        <div className="BookmarksLabel">Bookmarks</div>
        <div className="TabsContainer">
          <TabList>
            <Tab>Articles</Tab>
            <Tab>Guides</Tab>
            <Tab>Interviews</Tab>
            <Tab>Forums</Tab>
            <Tab disabled>Events</Tab>
            <Tab disabled>Your chats</Tab>
          </TabList>
        </div>
      </div>
      <TabPanel>Please log-in first</TabPanel>
      <TabPanel>Please log-in first</TabPanel>
      <TabPanel>Please log-in first</TabPanel>
      <TabPanel>Please log-in first</TabPanel>
      <TabPanel>Please log-in first</TabPanel>
      <TabPanel>Please log-in first</TabPanel>
      <div className="react-tabs__tab-panel--selected"> No Posts to Show</div>
    </Tabs>
  );
}
