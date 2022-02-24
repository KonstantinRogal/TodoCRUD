import React from "react";

export const Form = ({ inputText, setInputText, todos, setTodos }) => {
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
      console.log("asdfsadf");
      submitTodoHandler();
    }
  };

  return (
    <div className="form">
      <button className="toggle-all">Check all</button>
      <input
        value={inputText}
        onChange={inputTextHandler}
        onKeyDown={handleKeyPress}
        type="text"
        className="form-input"
        placeholder="I need..."
      />
    </div>
  );
};

export default Form;
