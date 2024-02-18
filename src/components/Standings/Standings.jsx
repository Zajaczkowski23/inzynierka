import useFetch from "../../hooks/fetchDataHook";
import "./Standings.css";

const Standings = ({ idOfTournament, idOfSeason }) => {
  const api = `https://api.sofascore.com/api/v1/tournament/${idOfSeason}/season/${idOfTournament}/standings/total`;

  const { data } = useFetch(api);

  function getClassNameByPosition(position) {
    if (position >= 1 && position <= 4) {
      return "championsleague";
    } else if (position === 5 || position === 6) {
      return "europa";
    } else if (position === 7) {
      return "conference";
    } else if (position >= 18 && position <= 20) {
      return "relegation";
    } else {
      return ""; // default case if no conditions match
    }
  }

  return (
    <div className="tableContainer">
      <table className="leagueTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Goals</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.standings[0].rows.map((team, index) => (
              <tr key={index}>
                <td className={getClassNameByPosition(team.position)}>
                  {team.position}
                </td>

                <td>{team.team.name}</td>
                <td>{team.matches}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>
                  {team.scoresFor}:{team.scoresAgainst}
                </td>
                <td>{team.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
