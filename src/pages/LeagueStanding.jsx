import { useParams } from "react-router-dom";
import Standings from "../components/Standings/Standings";
import Header from "../components/Header/Header";
import Sidebar from "../components/Side-bar/Sidebar";
import LeagueBestPlayers from "../components/Standings/LeagueBestPlayers/LeagueBestPlayers";
import TopTeams from "../components/Standings/TopTeams/TopTeams";

const LeagueStanding = () => {
  let { id, tournamentId, leagueId } = useParams();

  return (
    <div>
      <Header />
      <Sidebar />
      <div
        style={{
          marginLeft: "200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Standings idOfTournament={id} idOfSeason={tournamentId} />
        <LeagueBestPlayers id={id} uniq={leagueId} />
        <TopTeams id={id} uniq={leagueId} />
      </div>
    </div>
  );
};

export default LeagueStanding;
