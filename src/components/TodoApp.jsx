import { useState, useEffect } from "react";
import Form from "./Form";
import Header from "./Header";
import TodoList from "./TodoList";
import "../App.scss";

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  return (
    <div className="App">
      <h1>Todo</h1>

      <Form todos={todos} setTodos={setTodos} />

      <Header
        todos={todos}
        setTodos={setTodos}
        setFilteredTodos={setFilteredTodos}
      />
      <TodoList
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default TodoApp;
