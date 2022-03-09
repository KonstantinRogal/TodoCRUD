import React, { useEffect, useRef, useState } from "react";
import { updateTodo, updateStatusTodo } from "../action/todoRequest.js";

export const Todo = ({ onDelete, todo, calculateLeftItemsAmount }) => {
  const [editable, setEditabe] = useState(false);
  const [todoText, setTodoText] = useState(todo.title);
  const ref = useRef(null);

  const todoTextHandler = (e) => {
    setTodoText(e.target.value);
  };

  useEffect(() => {
    if (ref.current !== null && editable === true) {
      ref.current.focus();
    }
  }, [editable]);

  const doubleClickHandler = (e) => {
    setEditabe(true);
  };

  const updateHandler = () => {
    setEditabe(false);
    updateTodo(todo.id, todoText);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && editable) {
      setEditabe(false);
      updateTodo(todo.id, todoText);
    }
  };

  const completedHandler = () => {
    todo.isDone = !todo.isDone;
    updateStatusTodo(todo.id);
    calculateLeftItemsAmount();
  };

  return (
    <div className={"todo"}>
      <input
        onClick={completedHandler}
        className={`toggle-completed`}
        type="checkbox"
        checked={todo.isDone}
        readOnly
      />
      <div className="todo-container">
        {editable ? (
          <input
            ref={ref}
            onChange={todoTextHandler}
            value={todoText}
            onKeyDown={keyPressHandler}
            onBlur={updateHandler}
            className={`todo-text ${todo.isDone ? "completed" : ""}`}
          />
        ) : (
          <div
            onDoubleClick={doubleClickHandler}
            className={`todo-text ${todo.isDone ? "completed" : ""}`}
          >
            {todoText}
          </div>
        )}

        <button onClick={() => onDelete(todo.id)} className="delete">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
