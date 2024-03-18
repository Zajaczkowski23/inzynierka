import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Favorite from "../../assets/Favorite.svg";

const Match = ({ matchInfo, hours, minutes, addTeam }) => {
  const handleClick = (team) => {
    addTeam(team);
  };

  return (
    <div className="data-section__group" key={matchInfo.customId}>
      <div className="data-section__country">
        <div className="data-section__match-info">
          <div className="data-section__start-match">
            <div className="data-section__start-time">
              {hours ? `${hours}:${minutes}` : null}
            </div>
          </div>
          <div className="data-section__flags">
            <div>
              <img
                src={Favorite}
                alt="Add favorite"
                onClick={() => handleClick(matchInfo.homeTeam.name)}
              />
              <img
                src={`https://api.sofascore.app/api/v1/team/${matchInfo.homeTeam.id}/image/small`}
                alt={`${matchInfo.homeTeam.name} logo`}
              />
            </div>
            <div>
              <img
                src={Favorite}
                alt="Add favorite"
                onClick={() => handleClick(matchInfo.awayTeam.name)}
              />
              <img
                src={`https://api.sofascore.app/api/v1/team/${matchInfo.awayTeam.id}/image/small`}
                alt={`${matchInfo.awayTeam.name} logo`}
              />
            </div>
          </div>
          <div className="data-section__teams">
            <Link
              to={`/matches/${matchInfo.id}/season/${matchInfo.tournament.id}/tournament/${matchInfo.season.id}/${matchInfo.customId}`}
            >
              <div className="team">{matchInfo.homeTeam.name}</div>
            </Link>
            <Link
              to={`/matches/${matchInfo.id}/season/${matchInfo.tournament.id}/tournament/${matchInfo.season.id}`}
            >
              <div className="team">{matchInfo.awayTeam.name}</div>
            </Link>
          </div>
          <div className="data-section__score">
            <div className="score">{matchInfo.homeScore.current}</div>
            <div className="score">{matchInfo.awayScore.current}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Match.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.string.isRequired,
  matchInfo: PropTypes.object.isRequired,
  addTeam: PropTypes.func.isRequired,
};

export default Match;
