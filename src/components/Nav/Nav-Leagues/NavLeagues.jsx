import { useCallback, useEffect, useState } from "react";
import "../Nav.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AiFillStar } from "react-icons/ai";

function NavLeagues() {
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name || "");
    }
  }, []);

  const fetchFavoriteLeagues = useCallback(async () => {
    if (userName) {
      try {
        const response = await axios.get(
          `http://localhost:4200/api/favoriteLeagues?userName=${userName}`
        );
        setFavoriteLeagues(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [userName]);

  useEffect(() => {
    fetchFavoriteLeagues();
  });

  const deleteFavoriteLeagues = async (userName, leagueName) => {
    try {
      await axios.delete(
        `http://localhost:4200/api/favoriteLeagues?userName=${userName}&leagueName=${encodeURIComponent(
          leagueName
        )}`
      );
      await fetchFavoriteLeagues();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (activeLeague) => {
    deleteFavoriteLeagues(userName, activeLeague);
  };
  return (
    <div className="nav__leagues">
      <div className="nav__leagues__title">Popular Leagues</div>
      {favoriteLeagues ? (
        <div className="nav__popular-leagues">
          {favoriteLeagues.map((league) => (
            <div className="nav__leagues__item" key={league}>
              {league}
              <span>
                <AiFillStar onClick={() => handleDeleteClick(league)} />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default NavLeagues;
