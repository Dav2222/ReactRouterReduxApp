import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";

const NavBar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        <Link to="/posts"> Posts</Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        <Link to="/post/15">Single Post</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
