import React from "react";
import { addTodo } from "../action/todoRequest.js";

export const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  status,
  setCheckAll,
  clearCompletedHandler,
  TodoStatus,
}) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    const newTodo = { title: inputText, isDone: false, id: Date.now() };

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

  return (
    <div className="form">
      <div className="form-wrapper">
        <button onClick={setCheckAll} className="toggle-all">
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
              value={TodoStatus.ALL}
              className={`filter-button ${
                status === TodoStatus.ALL ? TodoStatus.ACTIVE : ""
              }`}
            >
              All
            </button>
            <button
              value={TodoStatus.ACTIVE}
              className={`filter-button ${
                status === TodoStatus.ACTIVE ? TodoStatus.ACTIVE : ""
              }`}
            >
              Active
            </button>
            <button
              value={TodoStatus.COMPLETED}
              className={`filter-button ${
                status === TodoStatus.COMPLETED ? TodoStatus.ACTIVE : ""
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
