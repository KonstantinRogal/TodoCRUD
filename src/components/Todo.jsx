import React, { useEffect, useRef, useState } from "react";
import { updateTodo } from "../action/todoRequest.js";

export const Todo = ({ onDelete, isDone, onComplete, title, id }) => {
  const [editable, setEditabe] = useState(false);
  const [todoText, setTodoText] = useState(title);
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
    updateTodo(id, todoText);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && editable) {
      setEditabe(false);
      updateTodo(id, todoText);
    }
  };

  return (
    <div className={"todo"}>
      <input
        onClick={onComplete}
        className={`toggle-completed`}
        type="checkbox"
        checked={isDone}
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
            className={`todo-text ${isDone ? "completed" : ""}`}
          />
        ) : (
          <div
            onDoubleClick={doubleClickHandler}
            className={`todo-text ${isDone ? "completed" : ""}`}
          >
            {todoText}
          </div>
        )}

        <button onClick={() => onDelete(id)} className="delete">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
