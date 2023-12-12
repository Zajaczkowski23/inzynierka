import useFetch from "../../../hooks/fetchDataHook";
import "./Incidents.css";
import PropTypes from "prop-types";

const Incidents = ({ id }) => {
  const { data: incidentsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/incidents`
  );

  const incidentType = {
    CARD: "card",
    PERIOD: "period",
    VAR: "varDecision",
    GOAL: "goal",
    SUB: "substitution",
    TIME: "injuryTime",
  };

  return (
    <div className="incidents-container">
      {incidentsData &&
        incidentsData.incidents.map((incident, idx) => {
          return (
            <div
              key={idx}
              className={
                incident.isHome
                  ? "incidents-info home"
                  : incident.isLive === false
                  ? "incidents-info time-end"
                  : "incidents-info away"
              }
            >
              {incident.incidentType === incidentType.CARD && (
                <>
                  <div className="time">{incident.time}&apos;</div>
                  {incident.incidentClass === "yellow" && (
                    <svg width="24" height="24" viewBox="0 0 16 16">
                      <title>Yellow card</title>
                      <path fill="yellow" d="M3 1h10v14H3z"></path>
                    </svg>
                  )}
                  {incident.incidentClass === "yellowRed" && (
                    <svg width="24" height="24" viewBox="0 0 16 16">
                      <title>Red card</title>
                      <path fill="red" d="M3 1h10v14H3z"></path>
                    </svg>
                  )}
                  <div className="reason">{incident.reason}</div>
                  <div className="player">{incident.playerName}</div>
                </>
              )}
              {incident.incidentType === incidentType.PERIOD && (
                <div>
                  <div>
                    {incident.text + " "}
                    {incident.homeScore + "-" + incident.awayScore}
                  </div>
                </div>
              )}
              {incident.incidentType === incidentType.GOAL && (
                <>
                  <div className="time">{incident.time}&apos;</div>

                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <title>Goal</title>
                    <g fill="green">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        d="M22 12c0-.09-.01-.18-.01-.28C21.84 6.33 17.43 2 12 2 6.57 2 2 6.48 2 12s4.48 10 10 10 9.84-4.33 9.99-9.72c0-.09.01-.18.01-.28zm-1.94-2.67-.92-.11-.93-2.99c.82.88 1.46 1.94 1.85 3.11v-.01zm-16 3.89 2.03 2.4-.93 1.4c-.81-1.1-1.36-2.4-1.56-3.81h.46v.01zm.91-.51 1.32-3.9h3.99l1.75 3.31-1.56 3.07H7.09l-2.11-2.48h-.01zm6.22-4.39 2.41-2.44 3.62.75.98 2.97-1.71 2.8-3.48-.57-1.83-3.51h.01zm-.18-4.75 1.67 1.8-2.36 2.39H6.36l-.67-1.4v-.02a8.415 8.415 0 0 1 5.32-2.77zM5.86 17.86l1.09-1.65h3.26l2.59 2.59-.56 1.68c-.08 0-.16.01-.24.01-2.42 0-4.59-1.02-6.14-2.64v.01zm7.5 2.52.33-1 3.78-1.91.67.4a8.511 8.511 0 0 1-4.78 2.52v-.01zm5.45-3.32-1.11-.66-.53-3.14v-.01l1.87-3.03 1.3.16a8.389 8.389 0 0 1-1.53 6.68z"
                        fill="secondary.default"
                      ></path>
                    </g>
                  </svg>
                  <div className="score">
                    {incident.homeScore}-{incident.awayScore}
                  </div>
                  <div className="player">{incident.player.name}</div>
                  {incident.assist1 && (
                    <div className="player-assist">
                      Assist: {incident.assist1.shortName}
                    </div>
                  )}
                </>
              )}
              {incident.incidentType === incidentType.SUB && (
                <>
                  <div className="time">{incident.time}&apos;</div>

                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M19 12v5l-2 2H7v3H6l-4-4 4-4h1v3h10v-5h2zM18 2l4 4-4 4h-1V7H7v5H5V7l2-2h10V2h1z"
                      fill="#fff"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <div className="player">In: {incident.playerIn.name} </div>
                  <div className="player-out">
                    Out: {incident.playerOut.name}
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

Incidents.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Incidents;
