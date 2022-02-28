import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const TodoStatus = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  ACTIVE: "ACTIVE",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState(TodoStatus.ALL);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case TodoStatus.COMPLETED:
        setFilteredTodos(() => todos.filter((todo) => todo.completed === true));
        break;
      case TodoStatus.ACTIVE:
        setFilteredTodos(() =>
          todos.filter((todo) => todo.completed === false)
        );
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  const todoDeleteHandler = (id) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  const completedHandler = (id) => {
    setTodos((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const checkAllHandler = () => {
    let allCompleted = todos.every((item) => item.completed);

    const newTodos = todos.map((item) => {
      return { ...item, completed: !allCompleted };
    });

    setTodos(newTodos);
  };

  const clearCompletedHandler = () => {
    setTodos(todos.filter((el) => el.completed === false));
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(
        localStorage.getItem("todos", JSON.stringify(todos))
      );
      setTodos(todoLocal);
    }
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
