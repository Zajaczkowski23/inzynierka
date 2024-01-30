import PropTypes from "prop-types";
import useFetch from "../../../hooks/fetchDataHook";

const Statistics = ({ id }) => {
  const { data: statysticsData } = useFetch(
    `https://api.sofascore.com/api/v1/event/${id}/statistics`
  );
  return (
    <div>
      <h3>Statistics</h3>
      <div className="stats-container">
        <div className="stats-bar">
          <div className="stat">Pass</div>
          <div className="stat-number">
            <div className="number">542</div>
            <div className="line"></div>
          </div>
          <div className="stat-number">
            <div className="number">342</div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  id: PropTypes.string,
};

export default Statistics;
