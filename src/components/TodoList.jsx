import { useEffect } from "react";
import Todo from "./Todo";
import { fetchTodos, removeTodo } from "../action/todoRequest";

export const TodoList = ({ filteredTodos, todos, setTodos }) => {
  useEffect(() => {
    getTodos();
  }, []);

  const todoDeleteHandler = (id) => {
    removeTodo(id).then(() =>
      setTodos(() => todos.filter((todo) => todo.id !== id))
    );
  };

  const getTodos = () => {
    fetchTodos.then((todos) => {
      return setTodos(todos);
    });
  };

  return (
    <>
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          setTodos={setTodos}
          onDelete={todoDeleteHandler}
        />
      ))}
    </>
  );
};

export default TodoList;
