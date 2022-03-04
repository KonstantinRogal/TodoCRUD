import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import {
  fetchTodos,
  removeTodo,
  updateStatusTodo,
  deleteDone,
} from "./action/todoRequest.js";

const TodoStatus = {
  ALL: "ALL",
  IS_DONE: "IS_DONE",
  ACTIVE: "ACTIVE",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState(TodoStatus.ALL);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case TodoStatus.IS_DONE:
        setFilteredTodos(() => todos.filter((todo) => todo.isDone === true));
        break;
      case TodoStatus.ACTIVE:
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

  const completedHandler = (id) => {
    setTodos((prevState) => {
      updateStatusTodo(id);
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      });
    });
  };

  const checkAllHandler = () => {
    let allCompleted = todos.every((item) => item.isDone);

    const newTodos = todos.map((item) => {
      updateStatusTodo(item.id);
      return { ...item, isDone: !allCompleted };
    });

    setTodos(newTodos);
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
        setCheckAll={checkAllHandler}
        clearCompletedHandler={clearCompletedHandler}
        TodoStatus={TodoStatus}
      />

      <TodoList
        todos={todos}
        onDelete={todoDeleteHandler}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        filteredTodos={filteredTodos}
        onComplete={completedHandler}
      />
    </div>
  );
}

export default App;
