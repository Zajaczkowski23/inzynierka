import useFetch from "../../hooks/fetchDataHook";
import Incidents from "./Incidents/Incidents";

const Stats = ({ id }) => {
  return (
    <div>
      <Incidents id={id} />
    </div>
  );
};

export default Stats;
