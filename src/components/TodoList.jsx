import React from "react";
import Todo from "./Todo";

export const TodoList = ({ todos, setTodos, setInputText, inputText }) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo todos={todos} value={todo.text} />
      ))}
    </>
  );
};

export default TodoList;
