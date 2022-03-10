import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import Todo from "./components/Todo";

import { fetchTodos, removeTodo } from "./action/todoRequest.js";

export const todoFilter = {
  ALL: "ALL",
  IS_DONE: "IS_DONE",
  ACTIVE: "ACTIVE",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(todoFilter.ALL);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case todoFilter.IS_DONE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === true));
        break;
      case todoFilter.ACTIVE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === false));
        break;

      default:
        setFilteredTodos(todos);
    }
  };

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

  const statusUpdateHandler = (id, status) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: status };
        }

        return item;
      })
    );
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <Form
        todos={todos}
        setTodos={setTodos}
        filterHandler={filterHandler}
        status={status}
        setStatus={setStatus}
      />

      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={todoDeleteHandler}
          onStatusUpdate={statusUpdateHandler}
        />
      ))}
    </div>
  );
}

export default App;

// import React from 'react'
// import "./App.scss";

// function App() {
//   return <TodoApp />
// }

// export default App;
