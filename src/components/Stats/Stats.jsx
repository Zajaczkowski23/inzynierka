import PropTypes from "prop-types";
import Incidents from "./Incidents/Incidents";
import Statystics from "./Statistics/Statystics";

const Stats = ({ id }) => {
  return (
    <div>
      <Incidents id={id} />
      <Statystics id={id} />
    </div>
  );
};

Stats.propTypes = {
  id: PropTypes.string,
};

export default Stats;
