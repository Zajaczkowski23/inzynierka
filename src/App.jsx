import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import MatchDetail from "./pages/MatchDetail";
import LeagueStanding from "./pages/LeagueStanding";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/account/login" Component={Login}></Route>
        <Route path="/account/register" Component={Register}></Route>
        <Route path="/matches" Component={Home}></Route>
        <Route path="/news" Component={News}></Route>
        <Route path="/matches/:id" Component={MatchDetail}></Route>
        <Route path="/standings/:id" Component={LeagueStanding}></Route>
        <Route path="*" element={<Navigate to="/matches" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
