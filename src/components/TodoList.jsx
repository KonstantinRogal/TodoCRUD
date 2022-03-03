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
          title={todo.title}
          onDelete={onDelete}
          onComplete={() => onComplete(todo.id)}
          setInputText={setInputText}
        />
      ))}
    </>
  );
};

export default TodoList;
