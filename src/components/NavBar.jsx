import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";

const NavBar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="posts" icon={<MailOutlined />}>
        <Link to="/posts"> Posts</Link>
      </Menu.Item>
      <Menu.Item key="favorit" icon={<AppstoreOutlined />}>
        <Link to="/favorites">Favorites page</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
