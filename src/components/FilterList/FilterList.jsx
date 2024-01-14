import { useState } from "react";
import PropTypes from "prop-types";
import "./FilterList.css";

const FilterList = ({ onFilterChange, filters }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

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
  filters: PropTypes.array.isRequired,
};

export default FilterList;
