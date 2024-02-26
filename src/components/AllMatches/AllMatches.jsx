import { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./AllMatches.css";
import FilterList from "../FilterList/FilterList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Match from "../Match/Match";
import Favorite from "../../assets/Favorite.svg";

function AllMatches({ selectedDate }) {
  const getFormattedDate = () => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = selectedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formattedDate, setFormattedDate] = useState(getFormattedDate());
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userName, setUserName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);

  useEffect(() => {
    setFormattedDate(getFormattedDate());
  }, [selectedDate]);

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

  const addFavoriteTeam = async (teamId) => {
    try {
      const teamData = {
        userName: userName,
        teamName: teamId,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4200/api/user/favoriteTeam",
        teamData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Team added to favorites:", response.data);
    } catch (error) {
      console.error("Failed to add team to favorites", error);
    }
  };

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

  const addFavoriteLeague = async (leagueID) => {
    try {
      const leagueData = {
        userName: userName,
        leagueName: leagueID,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4200/api/user/favoriteLeagues",
        leagueData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Team added to favorites:", response.data);
    } catch (error) {
      console.error("Failed to add team to favorites", error);
    }
  };

  const api = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${formattedDate}`;
  const { data } = useFetch(api);

  if (!data) {
    return <CircularProgress />;
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filterAndGroupMatches = () => {
    let filteredAndGroupedMatches = {};

    let matches = data.events.filter((matchInfo) => {
      if (selectedFilter === "Your clubs") {
        return favoriteTeams.some(
          (favoriteTeam) =>
            matchInfo.homeTeam.name === favoriteTeam ||
            matchInfo.awayTeam.name === favoriteTeam
        );
      } else if (selectedFilter === "Your Leagues") {
        return favoriteLeagues.some(
          (favoriteLeague) => matchInfo.tournament.name === favoriteLeague
        );
      } else {
        return true; // If filter is not "Your clubs", don't filter out any matches
      }
    });

    matches.forEach((matchInfo) => {
      const tournamentName = matchInfo.tournament.name;
      const categoryName = matchInfo.tournament.category.name;
      const key = `${tournamentName}_${categoryName}`;

      if (!filteredAndGroupedMatches[key]) {
        filteredAndGroupedMatches[key] = [];
      }
      filteredAndGroupedMatches[key].push(matchInfo);
    });

    return filteredAndGroupedMatches;
  };

  const filteredAndGroupedMatches = filterAndGroupMatches();

  const convertTime = (time) => {
    const convertTime = new Date(time * 1000);
    const hours = convertTime.getUTCHours();
    const day = convertTime.getDate();
    let minutes = convertTime.getUTCMinutes().toString().padStart(2, "0");

    return { hours, day, minutes };
  };

  return (
    <div className="data-section">
      <FilterList
        onFilterChange={handleFilterChange}
        filters={["All", "Your clubs", "Your Leagues"]}
      />
      {Object.keys(filteredAndGroupedMatches).map((key, index) => {
        const [tournamentName, categoryName] = key.split("_");
        if (!showAllMatches && index >= 10) return null;
        return (
          <div key={key} className="all-matches-section">
            <div className="all-matches-league-info">
              <div className="league-info">
                <h3>{categoryName}</h3>
                <div>
                  <h2>
                    {tournamentName}
                    <img
                      src={Favorite}
                      alt="Add favorite"
                      onClick={() => addFavoriteLeague(tournamentName)}
                    />
                  </h2>
                </div>
              </div>
              <Link
                to={`/standings/${selectedSeasonId}`}
                onClick={() => setSelectedSeasonId()}
              >
                Standings
              </Link>
            </div>
            {filteredAndGroupedMatches[key].map((matchInfo) => {
              let { hours, day, minutes } = convertTime(
                matchInfo.startTimestamp
              );

              if (minutes === 0) {
                minutes = "00";
              }

              if (selectedDate.getDate() === day) {
                return (
                  <Match
                    matchInfo={matchInfo}
                    key={matchInfo.id}
                    hours={hours}
                    minutes={minutes}
                    addTeam={addFavoriteTeam}
                  />
                );
              }
            })}
          </div>
        );
      })}
      {Object.keys(filteredAndGroupedMatches).length >= 10 &&
        !showAllMatches && (
          <button
            className="btn btn-matches"
            onClick={() => setShowAllMatches(true)}
          >
            Show All Matches
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        )}
    </div>
  );
}

AllMatches.propTypes = {
  selectedDate: PropTypes.any.isRequired,
};

export default AllMatches;
