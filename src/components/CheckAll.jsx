import React from "react";
import { updateStatusTodo } from "../action/todoRequest";

export const CheckAll = ({ setTodos }) => {
  const uncheckAllTodos = (prevTodos) => {
    const promises = prevTodos.map((item) => {
      return updateStatusTodo(item.id);
    });

    Promise.all(promises).then((res) => {
      return prevTodos.map((item) => {
        if (res.includes(item.id)) {
          return { ...item, isDone: false };
        }

        return item;
      });
    });

    return prevTodos;
  };

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
