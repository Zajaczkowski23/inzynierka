import NavClubs from "./Nav-Clubs/NavClubs";
import NavLeagues from "./Nav-Leagues/NavLeagues";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav__container">
      <NavLeagues />
      <NavClubs />
    </div>
  );
}

export default Nav;
