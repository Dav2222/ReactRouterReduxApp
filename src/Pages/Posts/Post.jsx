import { Link } from "react-router-dom";

const Post = (props) => {
  const postId = props.match.params.id;

  return (
    <>
      <h1>Post {postId}</h1>
      <h2>
        <Link to={`/posts/`}> Back to Posts</Link>
      </h2>
    </>
  );
};

export default Post;
