import React from "react";

export const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  filterHandler,
  setStatus,
  status,
  setCheckAll,
  clearCompletedHandler,
}) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random().toString(36) },
    ]);
    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      submitTodoHandler();
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

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
          <div className="todos-left">{todos.length} items left</div>
          <div onClick={statusHandler} className="filter-buttons">
            <button
              value={"all"}
              className={`filter-button ${status === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              value={"active"}
              className={`filter-button ${status === "active" ? "active" : ""}`}
            >
              Active
            </button>
            <button
              value={"completed"}
              className={`filter-button ${
                status === "completed" ? "active" : ""
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
