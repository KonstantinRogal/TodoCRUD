import React from "react";

export const Todo = ({ onDelete, todos, todo, value, setTodos }) => {
  const completedHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <input
        onClick={completedHandler}
        className={
          todo.completed ? "toggle-completed done" : "toggle-completed"
        }
        type="checkbox"
      />
      <div className="todo-container">
        <div className="todo-text">{value}</div>
        <button onClick={() => onDelete(todo.id)} className="delete">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
