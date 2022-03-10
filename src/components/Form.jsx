import React, { useState } from "react";
import { addTodo } from "../action/todoRequest";
import { v4 as uuidv4 } from "uuid";
import CheckAll from "./CheckAll";

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

  return (
    <div className="form">
      <div className="form-wrapper">
        <CheckAll setTodos={setTodos} />
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
