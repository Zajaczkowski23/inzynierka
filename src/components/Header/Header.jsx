import searchIcon from "../../assets/search.svg";
import loginIcon from "../../assets/account.svg";
import menuIcon from "../../assets/menu.svg";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1 className="header__logo">LiveScore</h1>
      <div className="header__flex">
        <div className="header__big-item">Scores</div>
        <div className="header__big-item">News</div>
      </div>
      <div className="header__flex">
        <div className="header__item">
          <button className="header__btn">
            <img src={searchIcon} alt="search players and clubs" />
          </button>
        </div>
        <div className="header__item">
          <button className="header__btn">
            <img src={loginIcon} alt="Button for your login account" />
            <span>Login</span>
          </button>
        </div>
        <div className="header__item">
          <button className="header__btn">
            <img src={menuIcon} alt="Button for your menu" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
