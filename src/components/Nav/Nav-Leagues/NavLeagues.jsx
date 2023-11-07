import { useState } from "react";
import Germany from "../../../assets/germany.png";
import Italy from "../../../assets/italy.png";
import Spain from "../../../assets/spain.png";
import England from "../../../assets/england.png";
import ArrowDown from "../../../assets/arrowDown.svg";
import "../Nav.css";

function NavLeagues() {
  const [isArrowClick, setArrowClick] = useState(true);

  const toggleArrowVisibility = () => {
    setArrowClick(!isArrowClick);
  };

  return (
    <div className="nav__leagues">
      <div className="nav__leagues__title">
        Popular Leagues
        <button onClick={toggleArrowVisibility} className="nav__btn">
          <img
            src={ArrowDown}
            alt="Arrow for closing and opening"
            className="nav__svg"
          />
        </button>
      </div>
      {isArrowClick ? (
        <div className="nav__popular-leagues">
          <div className="nav__leagues__item">
            <img src={England} alt="Flag of England" className="nav__flag" />{" "}
            Premier League
          </div>
          <div className="nav__leagues__item">
            <img src={Germany} alt="Flag of Germany" className="nav__flag" />{" "}
            Bundesliga
          </div>
          <div className="nav__leagues__item">
            <img src={Italy} alt="Flag of Italy" className="nav__flag" /> Serie
            A
          </div>
          <div className="nav__leagues__item">
            <img src={Spain} alt="Flag of Spain" className="nav__flag" /> LaLiga
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NavLeagues;
