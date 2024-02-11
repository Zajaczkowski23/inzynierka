import { useEffect, useState } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./AllMatches.css";
import FilterList from "../FilterList/FilterList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

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

  useEffect(() => {
    setFormattedDate(getFormattedDate());
  }, [selectedDate]);

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
                  <Link
                    className="data-section__group"
                    key={matchInfo.customId}
                    to={`/matches/${matchInfo.id}`}
                  >
                    <div className="data-section__country">
                      <div className="data-section__match-info">
                        <div className="data-section__start-match">
                          <div className="data-section__start-time">
                            {`${hours}:${minutes}`}
                          </div>
                        </div>
                        <div className="data-section__flags">
                          <img
                            src={`https://api.sofascore.app/api/v1/team/${matchInfo.homeTeam.id}/image/small`}
                            alt={`${matchInfo.homeTeam.name} logo`}
                          />
                          <img
                            src={`https://api.sofascore.app/api/v1/team/${matchInfo.awayTeam.id}/image/small`}
                            alt={`${matchInfo.awayTeam.name} logo`}
                          />
                        </div>
                        <div className="data-section__teams">
                          <div className="team">{matchInfo.homeTeam.name}</div>
                          <div className="team">{matchInfo.awayTeam.name}</div>
                        </div>
                        <div className="data-section__score">
                          <div className="score">
                            {matchInfo.homeScore.current}
                          </div>
                          <div className="score">
                            {matchInfo.awayScore.current}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
