import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";

const MatchDetail = () => {
  // const { id } = useParams();

  const { data } = useFetch(
    `https://api.sofascore.com/api/v1/event/11352455/lineups`
  );

  return (
    <div>
      <Header />
      {/* {console.log(data)} */}
    </div>
  );
};

export default MatchDetail;
