import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import Stats from "../components/Stats/Stats";
import Result from "../components/Stats/Result/Result";
import Sidebar from "../components/Side-bar/Sidebar";
import Standings from "../components/Standings/Standings";
import Lineups from "../components/Lineups/Lineups";
import H2h from "../components/H2h/H2h";

const MatchDetail = () => {
  let { id, seasonId, tournamentId, customId } = useParams();

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="match-detail-container">
        <div>
          <Result id={id} />
          <Stats id={id} />
          <H2h customId={customId} />
        </div>
        <Standings idOfTournament={tournamentId} idOfSeason={seasonId} />
        <Lineups id={id} />
      </div>
    </div>
  );
};

export default MatchDetail;
