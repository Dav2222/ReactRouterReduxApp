import { Route } from "react-router-dom";
import Posts from "../Pages/Posts/Posts";
import Post from "../Pages/Posts/Post";

const PostsRoutes = () => {
  return (
    <>
      <Route path="/posts" component={Posts} />
      <Route path="/post/:id" component={Post} />
    </>
  );
};

export default PostsRoutes
