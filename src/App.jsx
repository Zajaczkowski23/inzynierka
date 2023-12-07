import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import MatchDetail from "./pages/MatchDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/matches" Component={Home}></Route>
        <Route path="/news" Component={News}></Route>
        <Route path="/matches/:id" Component={MatchDetail}></Route>
      </Routes>
    </Router>
  );
}

export default App;
