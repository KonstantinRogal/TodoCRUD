import React from "react";
import Todo from "./Todo";

export const TodoList = ({
  todos,
  onDelete,
  setTodos,
  setInputText,
  inputText,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo onDelete={onDelete} todo={todo} value={todo.text} />
      ))}
    </>
  );
};

export default TodoList;
