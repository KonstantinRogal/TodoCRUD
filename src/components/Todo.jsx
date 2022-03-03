import React, { useEffect, useRef, useState } from "react";

export const Todo = ({ onDelete, completed, onComplete, title, id }) => {
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

  const onBlurHandler = () => {
    setEditabe(false);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && editable) {
      setEditabe(false);
    }
  };

  return (
    <div className={"todo"}>
      <input
        onClick={onComplete}
        className={`toggle-completed`}
        type="checkbox"
        checked={completed}
        readOnly
      />
      <div className="todo-container">
        {editable ? (
          <input
            ref={ref}
            onChange={todoTextHandler}
            value={todoText}
            onKeyDown={keyPressHandler}
            onBlur={onBlurHandler}
            className={`todo-text ${completed ? "completed" : ""}`}
          />
        ) : (
          <div
            onDoubleClick={doubleClickHandler}
            className={`todo-text ${completed ? "completed" : ""}`}
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
