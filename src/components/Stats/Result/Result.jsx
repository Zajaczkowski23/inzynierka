import useFetch from "../../../hooks/fetchDataHook";
import "./Result.css";

const Result = ({ id }) => {
  const { data: CurrentResult } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}`
  );

  return (
    CurrentResult && (
      <div className="container">
        <div className="home-team">
          <img
            src={`https://api.sofascore.app/api/v1/team/${CurrentResult.event.homeTeam.id}/image`}
            alt="Team logo"
            className="team-logo"
          />
        </div>
        <div className="result-container">
          <div className="result">
            {CurrentResult.event.homeScore.current} -{" "}
            {CurrentResult.event.awayScore.current}
          </div>
        </div>
        <div className="away-team">
          <img
            src={`https://api.sofascore.app/api/v1/team/${CurrentResult.event.awayTeam.id}/image`}
            alt="Team logo"
            className="team-logo"
          />
        </div>
      </div>
    )
  );
};

export default Result;
