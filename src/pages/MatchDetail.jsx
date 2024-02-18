import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";
import Stats from "../components/Stats/Stats";
import Result from "../components/Stats/Result/Result";
import Sidebar from "../components/Side-bar/Sidebar";
import Standings from "../components/Standings/Standings";

const MatchDetail = () => {
  let { id, seasonId, tournamentId } = useParams();

  const { data: lineupsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/lineups`
  );

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="match-detail-container">
        <div>
          <Result id={id} />
          <Stats id={id} />
        </div>
        <Standings idOfTournament={tournamentId} idOfSeason={seasonId} />
      </div>
    </div>
  );
};

export default MatchDetail;
