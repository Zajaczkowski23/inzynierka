import { Link } from "react-router-dom";

const Match = ({ matchInfo, hours, minutes }) => {
  return (
    <Link
      className="data-section__group"
      key={matchInfo.customId}
      to={`/matches/${matchInfo.id}/season/${matchInfo.tournament.id}/tournament/${matchInfo.season.id}`}
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
            <div className="score">{matchInfo.homeScore.current}</div>
            <div className="score">{matchInfo.awayScore.current}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Match;
