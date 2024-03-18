function camelCaseToTitle(camelCase) {
  const result = camelCase
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  return result;
}

// Component to display stats
const BoxStat = ({ statKey, statValue }) => {
  return (
    <div className="stat-box">
      <div className="stat-key">{camelCaseToTitle(statKey)}</div>
      <div className="stat-value">{statValue}</div>
    </div>
  );
};

export default BoxStat;
