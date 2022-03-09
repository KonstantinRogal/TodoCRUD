import React, { useState } from "react";
import {
  addTodo,
  updateStatusTodo,
  deleteDone,
} from "../action/todoRequest.js";
import { v4 as uuidv4 } from "uuid";

export const Form = ({
  todos,
  setTodos,
  status,
  setStatus,
  todoFilter,
  completedTodosAmount,
}) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = () => {
    const newTodo = { title: inputText, isDone: false, id: uuidv4() };

    addTodo(newTodo.title).then(() => {
      setTodos([...todos, newTodo]);
      setInputText("");
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      submitTodoHandler();
    }
  };

  const filterHandler = (e) => {
    setStatus(e.target.value);
  };

  const checkAllHandler = () => {
    if (todos.every((item) => item.isDone)) {
      const newTodos = todos.map((item) => {
        updateStatusTodo(item.id);

        return { ...item, isDone: false };
      });

      setTodos(newTodos);
    } else {
      const newTodos = todos.map((element) => {
        if (element.isDone === false) {
          updateStatusTodo(element.id);
        }

        return { ...element, isDone: true };
      });

      setTodos(newTodos);
    }
  };

  const clearCompletedHandler = () => {
    deleteDone().then(() => {
      setTodos(todos.filter((el) => el.isDone === false));
    });
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <button onClick={checkAllHandler} className="toggle-all">
          Check all
        </button>
        <input
          value={inputText}
          onChange={inputTextHandler}
          onKeyDown={handleKeyPress}
          type="text"
          className="form-input"
          placeholder="I need..."
        />
      </div>

      {todos.length ? (
        <div className="filter">
          <div className="todos-left">{completedTodosAmount} items left</div>
          <div onClick={filterHandler} className="filter-buttons">
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
          <button onClick={clearCompletedHandler} className="clear-completed">
            Clear completed
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Form;
