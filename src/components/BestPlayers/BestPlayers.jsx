import { useState } from "react";
import useFetch from "../../hooks/fetchDataHook";
import "./BestPlayer.css";

const BestPlayers = () => {
  const api =
    "https://api.sofascore.com/api/v1/sport/football/trending-top-players";

  const { data } = useFetch(api);
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  return (
    <div className="best-player-section">
      {data &&
        data.topPlayers.map((player, idx) => {
          if (!showAllPlayers && idx >= 5) return null;
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
      {data && data.topPlayers.length >= 5 && !showAllPlayers && (
        <div className="display">
          <button
            onClick={() => setShowAllPlayers(true)}
            className="btn btn-players"
          >
            Show More
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BestPlayers;
