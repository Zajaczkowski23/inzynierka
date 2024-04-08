import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";
import BoxStat from "../components/BoxStat/BoxStat";
import Sidebar from "../components/Side-bar/Sidebar";
import Header from "../components/Header/Header";

const Player = () => {
  const { name, id } = useParams();
  const api =
    "https://api.sofascore.com/api/v1/sport/football/trending-top-players";
  const eventsApi = `https://api.sofascore.com/api/v1/player/${id}/events/last/0`;
  const { data } = useFetch(api);
  const { data: eventsData } = useFetch(eventsApi);

  const [organizedEvents, setOrganizedEvents] = useState({});
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedUniqueId, setSelectedUniqueId] = useState("");
  const [statsUrl, setStatsUrl] = useState("");
  const [lastUrl, setLastUrl] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    if (!eventsData) return;

    const eventsBySeason = {};
    let maxEvents = 0;
    let seasonWithMostEvents = "";
    let uniqueIdOfMostEvents = "";

    eventsData.events.forEach((event) => {
      const seasonId = event.season.id;
      const uniqueId = event.tournament.uniqueTournament.id;
      const eventName = event.season.name;

      if (!eventsBySeason[seasonId]) {
        eventsBySeason[seasonId] = {
          name: eventName,
          unique: uniqueId,
          events: [],
        };
      }

      eventsBySeason[seasonId].events.push(event);

      // Update the season with the most events if necessary
      if (eventsBySeason[seasonId].events.length > maxEvents) {
        maxEvents = eventsBySeason[seasonId].events.length;
        seasonWithMostEvents = seasonId;
        uniqueIdOfMostEvents = uniqueId;
      }
    });

    setOrganizedEvents(eventsBySeason);
    setSelectedSeason(seasonWithMostEvents);
    setSelectedUniqueId(uniqueIdOfMostEvents);
  }, [eventsData]);

  useEffect(() => {
    if (selectedSeason && selectedUniqueId) {
      const newStatsUrl = `https://api.sofascore.com/api/v1/player/${id}/unique-tournament/${selectedUniqueId}/season/${selectedSeason}/statistics/overall`;
      const lastEvents = `https://api.sofascore.com/api/v1/player/${id}/unique-tournament/${selectedUniqueId}/season/${selectedSeason}/last-ratings`;
      setStatsUrl(newStatsUrl);
      setLastUrl(lastEvents);
    }
  }, [selectedSeason, selectedUniqueId, id]);

  useEffect(() => {
    const fetchStatsData = async () => {
      if (!statsUrl) return;

      try {
        const response = await fetch(statsUrl);
        const data = await response.json();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStatsData();
  }, [statsUrl]);

  useEffect(() => {
    const fetchLastData = async () => {
      if (!lastUrl) return;

      try {
        const response = await fetch(lastUrl);
        const data = await response.json();
        setLastData(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchLastData();
  }, [lastUrl]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="fix">
        <div className="something-container">
          <div>
            <img
              src={`https://api.sofascore.app/api/v1/player/${id}/image`}
              alt="Face of the player"
            />
            <div style={{ fontSize: "24px" }}>{name}</div>
          </div>
          <div className="lastMatchesContainer">
            {lastData &&
              lastData.lastRatings.map((last) => (
                <div key={last.eventId} className="matchItem">
                  <div className="teamScore">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${last.event.homeTeam.id}/image/small`}
                      alt={`${last.event.homeTeam.name} logo`}
                    />
                    <span className="homeTeam">{last.event.homeTeam.name}</span>
                    <span className="homeScore">
                      {last.event.homeScore.current}
                    </span>
                  </div>
                  <div className="teamScore">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${last.event.awayTeam.id}/image/small`}
                      alt={`${last.event.awayTeam.name} logo`}
                    />
                    <span className="awayTeam">{last.event.awayTeam.name}</span>
                    <span className="awayScore">
                      {last.event.awayScore.current}
                    </span>
                  </div>
                  <div className="rating">{last.rating}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="idk">
          <div className="header-stats">Season Stats</div>
          <div className="stats-container">
            {statsData &&
              Object.entries(statsData.statistics)
                .slice(0, 18)
                .map(([key, value]) => (
                  <BoxStat key={key} statKey={key} statValue={value} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
