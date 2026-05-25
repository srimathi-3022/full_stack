import React from "react";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food",
  "Sports",
  "Books",
  "Home",
  "Beauty",
  "Toys",
];

export default function CategoryFilter({
  active,
  allValue = "",
  categories = CATEGORIES,
  onChange,
}) {
  return (
    <fieldset className="category-filter">
      <legend>Categories</legend>
      <FilterBtn
        label="All"
        active={active === allValue}
        onClick={() => onChange(allValue)}
      />
      {" "}
      {categories.map((cat) => (
        <React.Fragment key={cat}>
          <FilterBtn
            label={cat}
            active={active === cat}
            onClick={() => onChange(cat)}
          />
          {" "}
        </React.Fragment>
      ))}
    </fieldset>
  );
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active}>
      {active ? `${label} (selected)` : label}
    </button>
  );
}
