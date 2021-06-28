import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const setData = (json) => {
    let arr = json.map((post) => ({
      name: post.title,
      author: post.userId,
      key: post.id,
    }));
    setPosts(arr);
    setLoading(false);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <>
          <Link to={`/post/${record.key}`}>Preview</Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => alert(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Table dataSource={posts} columns={columns} />
      )}
    </>
  );
};

export default Posts;
