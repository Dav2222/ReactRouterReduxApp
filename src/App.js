import 'antd/dist/antd.css'
import NavBar from "./components/NavBar";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes/>
      </div>
    </Router>
  );
}

export default App;
