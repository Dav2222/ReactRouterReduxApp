import { useState, useEffect } from "react";
import { LoadingOutlined, StarFilled } from "@ant-design/icons";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createAddFavorite, createRemoveFavorite } from "../../store/actions";

const Posts = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const toggleFavorite = (record) => {
    if (record.favorite) {
      props.dispatch(createRemoveFavorite(record.key));
    } else {
      props.dispatch(createAddFavorite(record));
    }

    setPosts(
      posts.map((e) =>
        e.key === record.key ? { ...record, favorite: !e.favorite } : e
      )
    );
  };

  const setData = (posts, usersMap) => {
    let arr = posts.map((post) => ({
      name: post.title,
      author: usersMap[post.userId],
      key: post.id,
      favorite: props.favorits.some((e) => e.key === post.id),
    }));
    setPosts(arr);
    setLoading(false);
  };

  const FetchData = async () => {
    let req = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await req.json();

    let req_user = await fetch("https://jsonplaceholder.typicode.com/users");
    let res_user = await req_user.json();

    let userMap = {};
    res_user.forEach((element) => {
      userMap[element.id] = element.name;
    });

    setData(posts, userMap);
  };

  useEffect(() => {
    FetchData();
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
          <StarFilled
            style={{ color: record.favorite ? "red" : "blue" }}
            onClick={() => toggleFavorite(record)}
          />
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

const mapStateToProps = (state) => ({
  favorits: state.favoritsList,
});

export default connect(mapStateToProps)(Posts);
