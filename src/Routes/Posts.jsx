import { Route } from "react-reouter-dom";

const PostsRoutes = () => {
  return (
    <>
      <Route path="/posts" component={Posts} />
      <Route path="/post/:id" component={Post} />
    </>
  );
};

export default PostsRoutes
