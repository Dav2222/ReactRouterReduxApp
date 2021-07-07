import { useState, useEffect } from "react";
import { LoadingOutlined, StarFilled } from "@ant-design/icons";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createAddFavorite, createRemoveFavorite } from "../../store/actions";
import { Input, Row, Select, Button, Col } from "antd";

const { Option } = Select;

const Posts = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterStatement, setFilterStatement] = useState("");
  const [authors, setAuthors] = useState({});
  const [filteredPosts, setFilteredPosts] = useState({});

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
    setFilteredPosts(arr);
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

    setAuthors(userMap);
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

  const formatString = (string) => {
    return string.trim().toLowerCase();
  };

  const applyFilter = () => {
    if (filterStatement.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    if (filterColumn.length === 0) {
      setFilteredPosts(
        posts.filter((post) => {
          for (let i = 0; i < columns.length; i++) {
            if (
              columns[i].key !== "x" &&
              formatString(post[columns[i].key]).includes(
                formatString(filterStatement)
              )
            ) {
              return true;
            }
          }
          return false;
        })
      );
      return;
    }
    if (formatString(filterStatement) && filterColumn) {
      setFilteredPosts(
        posts.filter((post) =>
          formatString(post[filterColumn]).includes(
            formatString(filterStatement)
          )
        )
      );
      return;
    }
  };

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          <Row>
            <Col span="24">
              <Input.Group compact>
                <Select
                  style={{ width: "150px" }}
                  defaultValue={filterColumn}
                  onChange={(value) => setFilterColumn(value)}
                >
                  <Option value="">All</Option>
                  {columns.map((e) =>
                    e.key !== "x" ? (
                      <Option key={e.key} value={e.key}>
                        {e.title}
                      </Option>
                    ) : (
                      ""
                    )
                  )}
                </Select>
                {filterColumn === "author" ? (
                  <Select
                    style={{ width: "calc(50% - 250px)" }}
                    defaultValue={filterStatement}
                    onChange={(value) => setFilterStatement(value)}
                  >
                    {Object.values(authors).map((e) => (
                      <Option key={e} value={e}>
                        {e}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    style={{ width: "calc(50% - 250px)" }}
                    defaultValue={filterStatement}
                    onChange={(evt) => setFilterStatement(evt.target.value)}
                  />
                )}
                <Button
                  style={{ width: "100px" }}
                  type="primary"
                  onClick={applyFilter}
                >
                  Filter
                </Button>
              </Input.Group>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Table dataSource={filteredPosts} columns={columns} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  favorits: state.favoritsList,
});

export default connect(mapStateToProps)(Posts);
