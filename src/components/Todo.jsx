import React from "react";

export const Todo = ({ todos, todo, value, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

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
        // className={
        // todo.completed ? "toggle-completed done" : "toggle-completed "
        // }
        type="checkbox"
      />
      <div className="todo-container">
        <div className="todo-text">{value}</div>
        <button onClick={deleteHandler} className="delete">
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
