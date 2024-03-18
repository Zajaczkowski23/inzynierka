import useFetch from "../../../hooks/fetchDataHook";
import "./LeagueBestPlayers.css"; // Import the CSS file

const LeagueBestPlayers = ({ id, uniq }) => {
  const api = `https://api.sofascore.com/api/v1/unique-tournament/${uniq}/season/${id}/top-players/overall`;

  const { data } = useFetch(api);

  return (
    <div className="league-best-players" style={{ marginRight: "20px" }}>
      <div style={{ margin: "10px 0", fontSize: "16px", fontWeight: "bold" }}>
        Best players with Most Goals + Assists
      </div>
      {data &&
        data.topPlayers.goalsAssistsSum.slice(0, 10).map((player, index) => (
          <div className="player-item" key={player.player.id}>
            <div className="player-ranking">{index + 1}</div>
            <img
              className="player-image"
              src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`}
              alt={player.player.name}
            />
            <div className="player-info">
              <div className="player-name">{player.player.name}</div>
              <div className="player-team">{player.team.name}</div>
            </div>
            <div className="player-rating">
              {player.statistics.goalsAssistsSum}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LeagueBestPlayers;
