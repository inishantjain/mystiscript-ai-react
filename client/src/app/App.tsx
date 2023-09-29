import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import AuthenticationPage, { Login, Register } from "../pages/Authentication";
import ProfilePage from "../pages/UserProfile";
import PostPage from "../pages/Post";
import ExploreStoriesPage from "../pages/ExploreStories";
import RequireUser from "../components/RequireUser";
import AddPost from "../pages/AddPost";
import { EditProfile } from "../pages/UserProfile";
import NotFoundPage from "../pages/NotFound";

function App() {
  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<RequireUser />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="addPost" element={<AddPost />} />
          </Route>
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="post/exploreStories" element={<ExploreStoriesPage />} />
        </Route>
        <Route element={<AuthenticationPage />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <div className="flex justify-end mr-5 p-1">Made with ❤️ by Nish</div>
    </div>
  );
}

export default App;
