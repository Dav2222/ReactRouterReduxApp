import { useState, useEffect } from "react";
import { LoadingOutlined, StarFilled} from "@ant-design/icons";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {createAddFavorite, createRemoveFavorite} from "../../store/actions"


const Posts = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

const toggleFavorite = (record) => {
  if(record.favorite){
    props.dispatch(createRemoveFavorite(record.key)); 
  }
  else{
    props.dispatch(createAddFavorite(record));
  }
  
  setPosts(posts.map((e) => (e.key === record.key ? {...record, favorite: !e.favorite} : e)));
}

  const setData = (json) => {
    let arr = json.map((post) => ({
      name: post.title,
      author: post.userId,
      key: post.id,
      favorite: props.favorits.some((e) => (e.key === post.id) )
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
          <StarFilled   style = {{color: record.favorite ? "red" : "blue"}}  onClick = {() => toggleFavorite(record)} />
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
        <Table dataSource={posts} columns={columns}  />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  favorits : state.favoritsList
})


export default connect(mapStateToProps)(Posts);
