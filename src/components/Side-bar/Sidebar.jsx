import MenuIcon from "../../assets/Menu.svg";
import FireIcon from "../../assets/FireIcon.svg";
import CompassIcon from "../../assets/CompassIcon.svg";
import FootballIcon from "../../assets/FootballIcon.svg";
import GameIcon from "../../assets/GameIcon.svg";
import NewsIcon from "../../assets/NewsIcon.svg";
import MessageIcon from "../../assets/MessageIcon.svg";
import SunIcon from "../../assets/SunIcon.svg";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={MenuIcon} alt="Menu icon" className="sidebar-menu" />
      <div className="sidebar-icons">
        <img src={FireIcon} alt="Fire icon" />
        <img src={CompassIcon} alt="Compass icon" />
        <img src={MessageIcon} alt="Message icon" />
      </div>
      <div className="vector"></div>

      <div className="sidebar-icons">
        <img src={FootballIcon} alt="Football icon" />
        <Link to="/matches">
          <img src={GameIcon} alt="Game icon" />
        </Link>
        <Link to="/news">
          <img src={NewsIcon} alt="News icon" />
        </Link>
      </div>
      <img src={SunIcon} alt="Sun icon" className="sidebar-mode" />
    </div>
  );
};

export default Sidebar;
