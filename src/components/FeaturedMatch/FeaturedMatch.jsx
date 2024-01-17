import useFetch from "../../hooks/fetchDataHook";
import "./FeaturedMatch.css";

function FeaturedMatch({ date }) {
  const currentDate = new Date();
  const api =
    "https://api.sofascore.com/api/v1/sport/football/scheduled-events/2023-12-07";
  const { data } = useFetch(api);
  let featuredMatch;

  if (data) {
    const randomIndex =
      data.events[Math.floor(Math.random() * data.events.length)];
    const randomId = randomIndex.id;

    featuredMatch = data.events.find(
      (match) =>
        (match.id === randomId && match.status.code !== 100) ||
        match.status.code !== 0
    );
  }
  return (
    <div>
      <h3 className="featured-title">Featured Match</h3>
      {featuredMatch && (
        <div className="featured__flex">
          <div className="featured-team">
            <img
              src={`https://api.sofascore.app/api/v1/team/${featuredMatch.homeTeam.id}/image`}
              alt={`${featuredMatch.homeTeam.name} logo`}
            />
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
          <div className="featured-team">
            <img
              src={`https://api.sofascore.app/api/v1/team/${featuredMatch.awayTeam.id}/image`}
              alt={`${featuredMatch.awayTeam.name} logo`}
            />
            {featuredMatch.awayTeam.name}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedMatch;
