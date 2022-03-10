import React from "react";
import { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";

import { deleteDone } from "../action/todoRequest.js";

export const todoFilter = {
  ALL: "ALL",
  IS_DONE: "IS_DONE",
  ACTIVE: "ACTIVE",
};

export const Header = ({ todos, setTodos, setFilteredTodos }) => {
  const [status, setStatus] = useState(todoFilter.ALL);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case todoFilter.IS_DONE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === true));
        break;
      case todoFilter.ACTIVE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === false));
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  let completedTodosAmount = todos.filter(
    (item) => item.isDone !== true
  ).length;

  const clearCompletedHandler = () => {
    deleteDone().then(() => {
      setTodos(todos.filter((el) => el.isDone === false));
    });
  };

  return (
    <>
      {todos.length ? (
        <div className="filter">
          <div className="todos-left">{completedTodosAmount} items left</div>
          <FilterButtons
            todos={todos}
            todoFilter={todoFilter}
            status={status}
            setStatus={setStatus}
          />
          <button onClick={clearCompletedHandler} className="clear-completed">
            Clear completed
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Header;
