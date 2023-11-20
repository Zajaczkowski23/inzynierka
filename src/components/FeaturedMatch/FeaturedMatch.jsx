import useFetch from "../../hooks/fetchDataHook";
import "./FeaturedMatch.css";

function FeaturedMatch() {
  const api = "http://localhost:3000/events";
  const { data } = useFetch(api);
  let featuredMatch;

  if (data) {
    const randomIndex = data[Math.floor(Math.random() * data.length)];
    const randomId = randomIndex.id;

    featuredMatch = data.find(
      (match) =>
        (match.id === randomId && match.status.code !== 100) ||
        match.status.code !== 0
    );
  }
  return (
    <div>
      <h3>Featured Match</h3>
      {featuredMatch && (
        <div className="featured__flex">
          <div className="featured__home-team">
            {featuredMatch.homeTeam.name}
          </div>
          <div className="featured__score">
            <div className="featured__score-home">
              {featuredMatch.homeScore.current}
            </div>
            <span>-</span>
            <div className="featured__score-away">
              {featuredMatch.awayScore.current}
            </div>
          </div>
          <div className="featured__away-team">
            {featuredMatch.awayTeam.name}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedMatch;
