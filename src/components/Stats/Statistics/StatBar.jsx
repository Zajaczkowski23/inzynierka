import PropTypes from "prop-types";
import "./StatBar.css";

const StatBar = ({ label, valueHome, valueAway }) => {
  const max = Math.max(valueHome, valueAway, 1);
  const widthHome = `${(valueHome / max) * 100}%`;
  const widthAway = `${(valueAway / max) * 100}%`;

  return (
    <div className="statItem">
      <span className="statLabel">{label}</span>
      <div className="statBarContainer">
        <div className="statBarHome" style={{ width: widthHome }}>
          {valueHome}
        </div>
        <div className="statBarAway" style={{ width: widthAway }}>
          {valueAway}
        </div>
      </div>
    </div>
  );
};

const Statistics = ({ stats }) => {
  return (
    <div className="statistics">
      <h2 className="statsTitle">Statistics</h2>
      {stats.map((stat, index) => (
        <StatBar
          key={index}
          label={stat.groupName}
          valueHome={stat.statisticsItems[0].homeValue}
          valueAway={stat.statisticsItems[0].awayValue}
        />
      ))}
    </div>
  );
};

Statistics.propTypes = {
  id: PropTypes.string,
};

export default Statistics;
