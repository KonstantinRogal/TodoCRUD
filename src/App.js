import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
// import TodoList from "./components/TodoList";
import Todo from "./components/Todo";

import {
  fetchTodos,
  removeTodo,
  updateStatusTodo,
  deleteDone,
} from "./action/todoRequest.js";

const todoStatus = {
  ALL: "ALL",
  IS_DONE: "IS_DONE",
  ACTIVE: "ACTIVE",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState(todoStatus.ALL);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case todoStatus.IS_DONE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === true));
        break;
      case todoStatus.ACTIVE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === false));
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  const todoDeleteHandler = (id) => {
    removeTodo(id).then((i) =>
      setTodos(() => todos.filter((todo) => todo.id !== id))
    );
  };

  const clearCompletedHandler = () => {
    deleteDone();
    setTodos(todos.filter((el) => el.isDone === false));
  };

  const getTodos = () => {
    fetchTodos.then((todos) => {
      return setTodos(todos);
    });
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        filterHandler={filterHandler}
        status={status}
        setStatus={setStatus}
        clearCompletedHandler={clearCompletedHandler}
        todoStatus={todoStatus}
      />

      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={todoDeleteHandler}
          setInputText={setInputText}
        />
      ))}
    </div>
  );
}

export default App;
