import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/fetchDataHook";
import Stats from "../components/Stats/Stats";
import Result from "../components/Stats/Result/Result";
import FilterList from "../components/FilterList/FilterList";

const MatchDetail = () => {
  const { id } = useParams();

  const { data: lineupsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/lineups`
  );

  const filters = ["Summary", "Stats", "Lineups"];

  return (
    <div>
      <Header />
      <div className="match-detail-container">
        <Result id={id} />
        <FilterList filters={filters} />
        <Stats id={id} />
      </div>
    </div>
  );
};

export default MatchDetail;
