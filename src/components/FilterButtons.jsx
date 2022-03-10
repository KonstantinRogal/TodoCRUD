import React from "react";

export const FilterButtons = ({
  status,
  setStatus,
  todos,
  setFilteredTodos,
  todoFilter,
}) => {
  const filterButtonsHandler = (e) => {
    setStatus(e.target.value);
  };

  console.log(todos, "hhhhhhhhhhhh");

  return (
    <>
      {todos.length ? (
        <div onClick={filterButtonsHandler} className="filter-buttons">
          <button
            value={todoFilter.ALL}
            className={`filter-button ${
              status === todoFilter.ALL ? "active" : ""
            }`}
          >
            All
          </button>
          <button
            value={todoFilter.ACTIVE}
            className={`filter-button ${
              status === todoFilter.ACTIVE ? "active" : ""
            }`}
          >
            Active
          </button>
          <button
            value={todoFilter.IS_DONE}
            className={`filter-button ${
              status === todoFilter.IS_DONE ? "active" : ""
            }`}
          >
            Completed
          </button>
        </div>
      ) : null}
    </>
  );
};

export default FilterButtons;
