import { Fragment } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./Lineups.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PersonNode = ({ name, number, position }) => {
  return (
    <div className="nodeClass">
      <span className="number">{number}</span>
      <span className="position">{position}</span>
      <span className="name">{name}</span>
    </div>
  );
};

const Lineups = ({ id }) => {
  const { data: lineupsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/lineups`
  );

  const renderPlayers = (players) => {
    return players.map((player, index) => (
      <Fragment key={index}>
        {index === 11 && <div className="subs">Subs</div>}
        <Link
          to={`/matches/player/${player.player.name}/${player.player.id}`}
          key={player.player.id}
        >
          <PersonNode
            name={player.player.name}
            number={player.shirtNumber}
            position={player.position}
          />
        </Link>
      </Fragment>
    ));
  };

  return (
    <div className="lineupContainer">
      <div className="team">
        <div className="team-site">Away</div>
        {lineupsData && renderPlayers(lineupsData.away.players)}
      </div>
      <div className="team">
        <div className="team-site">Home</div>
        {lineupsData && renderPlayers(lineupsData.home.players)}
      </div>
    </div>
  );
};

Lineups.propTypes = {
  id: PropTypes.string.isRequired,
};

PersonNode.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
};

export default Lineups;
