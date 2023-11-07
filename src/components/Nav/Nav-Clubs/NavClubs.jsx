import { AiFillStar } from "react-icons/ai";
import "../Nav.css";
import { useState } from "react";
function NavClubs() {
  const [favorites, setFavorites] = useState([
    "Liverpool",
    "Manchester United",
    "Lech Poznań",
  ]);

  const toggleFavorite = (clubName) => {
    if (favorites.includes(clubName)) {
      setFavorites(favorites.filter((club) => club !== clubName));
    }
  };

  return (
    <div className="nav__favorite-leagues">
      <div className="nav__fav-title">Favorite Club</div>
      {favorites.map((club) => (
        <div className="nav-fav-club" key={club}>
          {club}
          <span onClick={() => toggleFavorite(club)}>
            <AiFillStar />
          </span>
        </div>
      ))}
    </div>
  );
}

export default NavClubs;
