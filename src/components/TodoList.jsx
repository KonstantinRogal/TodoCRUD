import React from "react";
import Todo from "./Todo";

export const TodoList = ({
  onDelete,
  filteredTodos,
  onComplete,
  setInputText,
}) => {
  return (
    <>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          value={todo.text}
          onDelete={onDelete}
          onComplete={() => onComplete(todo.id)}
          setInputText={setInputText}
        />
      ))}
    </>
  );
};

export default TodoList;
