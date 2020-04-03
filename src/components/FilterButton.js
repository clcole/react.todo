import React from "react";

export function FilterButton({ filter, onFilterClick, children }) {
  return (
    <button
      className="filter-button"
      type="text"
      onClick={() => onFilterClick(filter)}
    >
      {children}
    </button>
  );
}
