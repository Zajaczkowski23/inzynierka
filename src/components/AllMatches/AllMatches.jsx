import useFetch from "../../hooks/fetchDataHook";
import "./AllMatches.css";

function AllMatches() {
  const api = "http://localhost:3000/events";
  const { data } = useFetch(api);

  return (
    <div className="data-section">
      {data &&
        data.map((matchInfo) => {
          // Convert timestamp to a human-readable time
          const convertTime = new Date(matchInfo.startTimestamp * 1000);
          const hours = convertTime.getUTCHours();
          let minutes = convertTime.getUTCMinutes();

          {
            /* const convertCurrTime = new Date(
            matchInfo.statusTime.timestamp * 1000
          );
          const hoursCurr = convertCurrTime.getUTCHours();
          let minutesCurr = convertCurrTime.getUTCMinutes(); */
          }

          if (minutes === 0) {
            minutes = "00";
          }

          return (
            <div className="data-section__group" key={matchInfo.customId}>
              <div className="data-section__country">
                <div className="data-section__tournament-info">
                  <div className="data-section__country">
                    {matchInfo.tournament.category.name}
                  </div>
                  <div className="data-section__tournament-name">
                    {matchInfo.tournament.name}
                  </div>
                </div>
                <div className="data-section__match-info">
                  <div className="data-section__start-match">
                    <div className="data-section__start-time">{`${hours}:${minutes}`}</div>
                  </div>
                  <div className="data-section__teams">
                    <div className="team">{matchInfo.homeTeam.name}</div>
                    <div className="team">{matchInfo.awayTeam.name}</div>
                  </div>
                  <div className="data-section__score">
                    <div className="score">{matchInfo.homeScore.current}</div>
                    <div className="score">{matchInfo.awayScore.current}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AllMatches;
