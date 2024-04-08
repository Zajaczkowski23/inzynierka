import { Fragment, useCallback, useEffect, useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";

function AllMatches({ selectedDate }) {
  const getFormattedDate = () => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = selectedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formattedDate, setFormattedDate] = useState(getFormattedDate());
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userName, setUserName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
  }, [userName, fetchFavoriteTeams]);

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
      setSnackbarMessage(`${teamId} added to favorites!`);
      setSnackbarOpen(true);
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
  }, [userName, fetchFavoriteLeagues]);

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
        return true;
      }
    });

    const handleWinnerSelection = async (matchId, selectedWinner) => {
      const token = localStorage.getItem("token"); // Assuming you're using JWT for auth
      try {
        await axios.post(
          "http://localhost:4200/api/match/winner",
          { matchId, selectedWinner },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle success (e.g., showing a notification)
      } catch (error) {
        // Handle error
        console.error("Failed to submit winner selection", error);
      }
    };

    matches.forEach((matchInfo) => {
      const tournamentName = matchInfo.tournament.name;
      const categoryName = matchInfo.tournament.category.name;
      const tournamentId = matchInfo.tournament.id;
      const seasonId = matchInfo.season.id;
      const uniqId = matchInfo.tournament.uniqueTournament.id;
      const key = `${tournamentName}_${categoryName}`;

      if (!filteredAndGroupedMatches[key]) {
        filteredAndGroupedMatches[key] = {
          matches: [],
          tournamentId,
          seasonId,
          uniqId,
        };
      }
      filteredAndGroupedMatches[key].matches.push(matchInfo);
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
        const group = filteredAndGroupedMatches[key];
        const { matches, seasonId, tournamentId, uniqId } = group;

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
              {/* Use tournamentId for navigation link */}
              <Link to={`/standings/${tournamentId}/${uniqId}/${seasonId}`}>
                Standings
              </Link>
            </div>
            {matches.map((matchInfo) => {
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
                    currentUser={userName}
                  />
                );
              }
              return null;
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

AllMatches.propTypes = {
  selectedDate: PropTypes.any.isRequired,
};

export default AllMatches;
