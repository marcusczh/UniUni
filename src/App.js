import React from "react";

import { Routes, Route } from "react-router-dom";

import LogIn from "./Components/Welcome/LogInScreen";
import HomePage from "./Components/HomePage/HomePage";
import Welcome from "./Components/Welcome/Welcome";
import SignupScreen from "./Components/Welcome/SingupScreen";
import Interviews from "./Components/Interviews/Interviews";
import SpecificInterview from "./Components/Interviews/SpecificInterview";
import Guides from "./Components/Guides/Guides";
import SpecificGuide from "./Components/Guides/SpecificGuide";
import Articles from "./Components/Articles/Articles";
import SpecificArticle from "./Components/Articles/SpecificArticle";
import ArticleCreation from "./Components/Articles/ArticleCreation";
import Forum from "./Components/Forum/Forum";
import SpecificForum from "./Components/Forum/SpecificForum";
import ForumCreation from "./Components/Forum/ForumCreation";
import PostManagement from "./Components/Forum/PostManagement";
import CommentCreation from "./Components/Forum/CommentCreation";
import { Provider } from "react-redux";
import Store from "./Store.js";
import SearchPage from "./Components/Global/SearchPage";

function App() {
  return (
    <Provider store={Store}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="Login" element={<LogIn />} />
        <Route path="HomePage" element={<HomePage />} />
        <Route path="Signup" element={<SignupScreen />} />
        <Route path="Interviews" element={<Interviews />} />
        <Route path="Interviews/:title" element={<SpecificInterview />} />
        <Route path="Guides" element={<Guides />} />
        <Route path="Guides/:title" element={<SpecificGuide />} />
        <Route path="Articles" element={<Articles />} />
        <Route path="Articles/:title" element={<SpecificArticle />} />
        <Route path="Articles/Create" element={<ArticleCreation />} />
        <Route path="Forum" element={<Forum />} />
        <Route path="Forum/:title" element={<SpecificForum />} />
        <Route path="Forum/Create" element={<ForumCreation />} />
        <Route path="Forum/MyPosts" element={<PostManagement />} />
        <Route
          path="Forum/:title/CreateComment"
          element={<CommentCreation />}
        />
        <Route path="SearchResults" element={<SearchPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
