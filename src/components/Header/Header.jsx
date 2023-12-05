import searchIcon from "../../assets/search.svg";
import loginIcon from "../../assets/account.svg";
import menuIcon from "../../assets/menu.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [active, setActive] = useState("Scores");

  const changeActiveLink = (link) => {
    console.log(link);
    link === "Scores" ? setActive("Scores") : setActive("News");
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActive("Scores");
    } else if (path === "/news") {
      setActive("News");
    }
  }, []);

  return (
    <div className="header">
      <h1 className="header__logo">LiveScore</h1>
      <div className="header__flex">
        <div
          className="header__big-item"
          onClick={() => changeActiveLink("Scores")}
        >
          <Link
            to="/"
            className={`header__link ${
              active === "Scores" ? "active__link" : ""
            }`}
          >
            Scores
          </Link>
        </div>
        <div
          className="header__big-item"
          onClick={() => changeActiveLink("News")}
        >
          <Link
            to="/news"
            className={`header__link ${
              active === "News" ? "active__link" : ""
            }`}
          >
            News
          </Link>
        </div>
      </div>
      <div className="header__flex">
        <div className="header__item">
          <button className="header__btn">
            <img
              className="header__img"
              src={searchIcon}
              alt="search players and clubs"
            />
          </button>
        </div>
        <div className="header__item">
          <button className="header__btn">
            <img
              className="header__img"
              src={loginIcon}
              alt="Button for your login account"
            />
            <span>Login</span>
          </button>
        </div>
        <div className="header__item">
          <button className="header__btn">
            <img
              className="header__img"
              src={menuIcon}
              alt="Button for your menu"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
