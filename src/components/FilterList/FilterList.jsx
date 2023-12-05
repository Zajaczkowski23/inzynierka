import { useState } from "react";
import PropTypes from "prop-types";
import "./FilterList.css";

const FilterList = ({ onFilterChange }) => {
  const filters = ["All", "Live", "Finished", "Scheduled"];
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filters">
      <ul className="filters-list">
        {filters.map((item, idx) => (
          <li key={idx}>
            <button
              className={item === activeFilter ? "active" : ""}
              onClick={() => handleFilterClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

FilterList.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterList;
