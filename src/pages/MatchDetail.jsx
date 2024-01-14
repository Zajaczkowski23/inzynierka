import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";
import Stats from "../components/Stats/Stats";
import Result from "../components/Stats/Result/Result";
import FilterList from "../components/FilterList/FilterList";
import Sidebar from "../components/Side-bar/Sidebar";

const MatchDetail = () => {
  const { id } = useParams();

  const { data: lineupsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/lineups`
  );

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="match-detail-container">
        <Result id={id} />
        <Stats id={id} />
      </div>
    </div>
  );
};

export default MatchDetail;
