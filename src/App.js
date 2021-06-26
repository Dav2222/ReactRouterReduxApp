import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch} from "react-reouter-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
