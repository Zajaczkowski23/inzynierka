import { useParams } from "react-router-dom";

const LeagueStanding = () => {
  const { id } = useParams();

  console.log(id);

  return <div></div>;
};

export default LeagueStanding;
