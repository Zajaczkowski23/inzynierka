import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";

const MatchDetail = () => {
  const { id } = useParams();

  const { data: lineupsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/lineups`
  );

  const { data: incidentsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/incidents`
  );

  console.log(incidentsData);
  return (
    <div>
      <Header />
      <div className="match-detail-container">
        {incidentsData &&
          incidentsData.incidents.map((incident) => {
            if (incident.reason) {
              return (
                <div key={incident.id}>
                  <div className="reason">{incident.reason}</div>
                  <div className="player">{incident.player.name}</div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default MatchDetail;
