import { useState } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./AllMatches.css";
import FilterList from "../FilterList/FilterList";

function AllMatches() {
  const api = "http://localhost:3000/events";
  const { data } = useFetch(api);

  const [showAllMatches, setShowAllMatches] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const groupedMatches = {};

  if (data) {
    data.forEach((matchInfo) => {
      const tournamentName = matchInfo.tournament.name;
      const categoryName = matchInfo.tournament.category.name;
      const key = `${tournamentName}_${categoryName}`;

      if (!groupedMatches[key]) {
        groupedMatches[key] = [];
      }
      groupedMatches[key].push(matchInfo);
    });
  }

  const filteredMatches = Object.keys(groupedMatches)
    .filter((key) => {
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
    })
    .slice(0, showAllMatches ? undefined : 10);

  return (
    <div className="data-section">
      <FilterList onFilterChange={handleFilterChange} />
      {filteredMatches.map((key, index) => {
        const [tournamentName, categoryName] = key.split("_");
        if (!showAllMatches && index >= 10) return null;
        return (
          <div key={key} className="all-matches-section">
            <h3>{categoryName}</h3>
            <h2>{tournamentName}</h2>

            {groupedMatches[key].map((matchInfo) => {
              const convertTime = new Date(matchInfo.startTimestamp * 1000);
              const hours = convertTime.getUTCHours();
              let minutes = convertTime.getUTCMinutes();

              if (minutes === 0) {
                minutes = "00";
              }

              return (
                <div className="data-section__group" key={matchInfo.customId}>
                  <div className="data-section__country">
                    <div className="data-section__match-info">
                      <div className="data-section__start-match">
                        <div className="data-section__start-time">{`${hours}:${minutes}`}</div>
                      </div>
                      <div className="data-section__flags">
                        <img
                          src={
                            matchInfo.homeTeam.country.alpha2 === "EN"
                              ? `https://flagcdn.com/24x18/gb-eng.png`
                              : `https://flagcdn.com/24x18/${matchInfo.homeTeam.country.alpha2.toLowerCase()}.png`
                          }
                        />
                        <img
                          src={
                            matchInfo.awayTeam.country.alpha2 === "EN"
                              ? `https://flagcdn.com/24x18/gb-eng.png`
                              : `https://flagcdn.com/24x18/${matchInfo.awayTeam.country.alpha2.toLowerCase()}.png`
                          }
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
                </div>
              );
            })}
          </div>
        );
      })}
      {Object.keys(groupedMatches).length >= 10 && !showAllMatches && (
        <button onClick={() => setShowAllMatches(true)}>
          Show All Matches
        </button>
      )}
    </div>
  );
}

export default AllMatches;
