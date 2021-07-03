import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { Row, Col, Card, Tooltip, List } from "antd";


const Post = (props) => {
  const postId = props.match.params.id;
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [user, setUser] = useState({});

  const fetchData = async (postId) => {
    const post_req = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post_data = await post_req.json();
    setPostData(post_data);

    const users_req = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users_data = await users_req.json();
    const tempUser = users_data.find((e) => e.id === post_data.userId);
    setUser(tempUser);

    const com_req = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const com_data = await com_req.json();
    setCommentsData(com_data);

    setLoading(false);
  };
  useEffect(() => {
    fetchData(postId);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          <h1>
            <Link to={`/posts/`}> Back to Posts</Link>
          </h1>
          <Row>
            <Col span={18}>
              <h2>{postData.title}</h2>
              <p>{postData.body}</p>

              <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={commentsData}
                renderItem={(item) => (
                  <List.Item>
                    <Tooltip title={item.email} color="cyan">
                      {item.name}
                    </Tooltip>
                    {item.body}
                  </List.Item>
                )}
              />

            </Col>
            <Col span={6}>
              <Card title={user.name} bordered={false} style={{ width: 300 }}>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Company: {user.company.name}</p>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Post;
