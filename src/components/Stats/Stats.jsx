import PropTypes from "prop-types";
import Incidents from "./Incidents/Incidents";
import Statystics from "./Statistics/StatBar";
import useFetch from "../../hooks/fetchDataHook";

const Stats = ({ id }) => {
  const api = `https://api.sofascore.com/api/v1/event/${id}/statistics`;

  const { data } = useFetch(api);

  return (
    <div>
      <Incidents id={id} />
      {data && <Statystics stats={data.statistics[0].groups} />}
    </div>
  );
};

Stats.propTypes = {
  id: PropTypes.string,
};

export default Stats;
