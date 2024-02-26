import { useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const api =
    "https://api.sofascore.com/api/v1/player/913594/unique-tournament/1032/season/52944/statistics/overall";
  return <div>{id}</div>;
};

export default Player;
