import "antd/dist/antd.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Layout, Row, Col } from "antd";
const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <Row justify="center">
            <Col span={22} >
              <Routes />
            </Col>
          </Row>
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
};

export default App;
