import React from "react";
import { addTodo, updateStatusTodo } from "../action/todoRequest.js";
import { v4 as uuidv4 } from "uuid";

export const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  status,
  clearCompletedHandler,
  todoStatus,
}) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    const newTodo = { title: inputText, isDone: false, id: uuidv4() };

    setTodos([...todos, newTodo]);
    setInputText("");

    addTodo(newTodo.title);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      submitTodoHandler();
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  let leftItems = todos.filter((item) => item.isDone !== true);

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
          <div className="todos-left">{leftItems.length} items left</div>
          <div onClick={statusHandler} className="filter-buttons">
            <button
              value={todoStatus.ALL}
              className={`filter-button ${
                status === todoStatus.ALL ? "active" : ""
              }`}
            >
              All
            </button>
            <button
              value={todoStatus.ACTIVE}
              className={`filter-button ${
                status === todoStatus.ACTIVE ? "active" : ""
              }`}
            >
              Active
            </button>
            <button
              value={todoStatus.IS_DONE}
              className={`filter-button ${
                status === todoStatus.IS_DONE ? "active" : ""
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
