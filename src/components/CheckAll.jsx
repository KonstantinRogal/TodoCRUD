import React from "react";
import { updateStatusTodo } from "../action/todoRequest";

export const CheckAll = ({ setTodos }) => {
  const uncheckAllTodos = (prevTodos) =>
    prevTodos.map((item) => {
      updateStatusTodo(item.id);

      return { ...item, isDone: false };
    });

  const checkAllTodos = (prevTodos) =>
    prevTodos.map((element) => {
      if (element.isDone === false) {
        updateStatusTodo(element.id);
      }

      return { ...element, isDone: true };
    });

  const checkAllHandler = () => {
    setTodos((prevTodos) => {
      if (prevTodos.every((item) => item.isDone)) {
        return uncheckAllTodos(prevTodos);
      }
      return checkAllTodos(prevTodos);
    });
  };

  return (
    <button onClick={checkAllHandler} className="toggle-all">
      Check all
    </button>
  );
};

export default CheckAll;
