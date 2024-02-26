import { AiFillStar } from "react-icons/ai";
import "../Nav.css";
import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function NavClubs() {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name || "");
    }
  }, []);

  const fetchFavoriteTeams = useCallback(async () => {
    if (userName) {
      try {
        const response = await axios.get(
          `http://localhost:4200/api/favoriteTeam?userName=${userName}`
        );
        setFavoriteTeams(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [userName]);

  useEffect(() => {
    fetchFavoriteTeams();
  });

  const deleteFavoriteTeam = async (userName, teamName) => {
    try {
      await axios.delete(
        `http://localhost:4200/api/favoriteTeam?userName=${userName}&teamName=${encodeURIComponent(
          teamName
        )}`
      );
      await fetchFavoriteTeams();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (activeTeam) => {
    deleteFavoriteTeam(userName, activeTeam);
  };

  return (
    <div className="nav__favorite-leagues">
      <div className="nav__fav-title">Favorite Club</div>
      {favoriteTeams && userName.length > 0 ? (
        favoriteTeams.map((club) => (
          <div className="nav-fav-club" key={club}>
            {club}
            <span>
              <AiFillStar onClick={() => handleDeleteClick(club)} />
            </span>
          </div>
        ))
      ) : (
        <div>Create an account to follow clubs</div>
      )}
    </div>
  );
}

export default NavClubs;
