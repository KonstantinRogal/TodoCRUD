import React, { useState } from "react";
import { addTodo, updateStatusTodo } from "../action/todoRequest";
import { v4 as uuidv4 } from "uuid";

export const Form = ({ setTodos }) => {
  const [inputText, setInputText] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = () => {
    const newTodo = { title: inputText, isDone: false, id: uuidv4() };

    addTodo(newTodo.title).then(() => {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText("");
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      submitTodoHandler();
    }
  };

  const checkAllTodos = (prevTodos) =>
    prevTodos.map((item) => {
      updateStatusTodo(item.id);

      return { ...item, isDone: false };
    });

  const uncheckAllTodos = (prevTodos) =>
    prevTodos.map((element) => {
      if (element.isDone === false) {
        updateStatusTodo(element.id);
      }

      return { ...element, isDone: true };
    });

  const checkAllHandler = () => {
    setTodos((prevTodos) => {
      if (prevTodos.every((item) => item.isDone)) {
        return checkAllTodos(prevTodos);
      }
      return uncheckAllTodos(prevTodos);
    });
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
    </div>
  );
};

export default Form;
