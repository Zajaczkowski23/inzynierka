import useFetch from "../../hooks/fetchDataHook";
import "./BestPlayer.css";

const BestPlayers = () => {
  const api =
    "https://api.sofascore.com/api/v1/sport/football/trending-top-players";

  const { data } = useFetch(api);

  return (
    <div className="best-player-section">
      {data &&
        data.topPlayers.map((player, idx) => {
          return (
            <div key={player.player.id} className="best-player">
              <div className="best-player-ranking">{(idx += 1)}</div>
              <img
                src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`}
                alt="Face of the player"
                className="best-player-avatar"
              />
              <div className="best-player-info">
                <div>{player.player.name}</div>
                <div>{player.team.name}</div>
              </div>
              <div>{player.ratingVersions.original}</div>
            </div>
          );
        })}
    </div>
  );
};

export default BestPlayers;
