import { Link } from "react-router-dom";

const Post = (props) => {
  const postId = props.match.params.id;

  return (
    <>
      <h1>
        <Link to={`/posts/`}> Back to Posts</Link>Post {postId}
      </h1>
    </>
  );
};

export default Post;
