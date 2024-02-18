import { useEffect, useState } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./AllMatches.css";
import FilterList from "../FilterList/FilterList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Match from "../Match/Match";

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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setFormattedDate(getFormattedDate());
  }, [selectedDate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.name);
    }
  }, []);

  // const updateFavoriteTeamsByName = async (name, favoriteTeams) => {
  //   try {
  //     const response = await fetch("/api/user/favoriteTeams", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, favoriteTeams }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update favorite teams");
  //     }
  //     const updatedUser = await response.json();
  //     console.log("Updated favorite teams:", updatedUser.favoriteTeams);
  //   } catch (error) {
  //     console.error("Error updating favorite teams:", error);
  //   }
  // };

  const api = `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${formattedDate}`;
  const { data } = useFetch(api);

  if (!data) {
    return <CircularProgress />;
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const groupedMatches = {};

  data.events.forEach((matchInfo) => {
    const tournamentName = matchInfo.tournament.name;
    const categoryName = matchInfo.tournament.category.name;
    const key = `${tournamentName}_${categoryName}`;

    if (!groupedMatches[key]) {
      groupedMatches[key] = [];
    }
    groupedMatches[key].push(matchInfo);
  });

  const filteredMatches = Object.keys(groupedMatches).filter((key) => {
    if (selectedFilter === "All") {
      return true;
    }

    const matchesForFilter = groupedMatches[key];
    const typeMap = {
      All: true,
      Live: "inprogress",
      Finished: "finished",
      Scheduled: "notstarted",
    };

    return matchesForFilter.some((matchInfo) => {
      return typeMap[selectedFilter]
        ? matchInfo.status.type === typeMap[selectedFilter]
        : false;
    });
  });

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
        filters={["All", "Live", "Finished", "Scheduled"]}
      />
      {filteredMatches.map((key, index) => {
        const [tournamentName, categoryName] = key.split("_");
        if (!showAllMatches && index >= 10) return null;
        return (
          <div key={key} className="all-matches-section">
            <div className="all-matches-league-info">
              <div className="league-info">
                <h3>{categoryName}</h3>
                <h2>{tournamentName}</h2>
              </div>
              <Link
                to={`/standings/${selectedSeasonId}`}
                onClick={() => setSelectedSeasonId()}
              >
                Standings
              </Link>
            </div>
            {groupedMatches[key].map((matchInfo) => {
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
                  />
                );
              }
            })}
          </div>
        );
      })}
      {Object.keys(groupedMatches).length >= 10 && !showAllMatches && (
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
