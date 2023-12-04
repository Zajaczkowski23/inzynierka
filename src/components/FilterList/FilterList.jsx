import { useState } from "react";
import "./FilterList.css";

const FilterList = () => {
  const filters = ["All", "Live", "Finished", "Scheduled"];
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
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

export default FilterList;
