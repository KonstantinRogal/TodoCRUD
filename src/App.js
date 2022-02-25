import { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(() => todos.filter((todo) => todo.completed === true));
        break;
      case "active":
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

  const checkAllHandler = (id) => {
    const newTodos = todos.map((item) => {
      if (item.completed === false) {
        item.completed = true;
      }

      return item;
    });

    setTodos(newTodos);
  };

  // const checkAllHandler2 = (id) => {
  //   const newTodos = todos.map((item) => {
  //     for (let compl in item) {
  //       if (item.completed === false) {
  //         item.completed = true;
  //       }
  //     }

  //     return item;
  //   });

  //   setTodos(newTodos);

  //   // пробегаюсь по значениям, ищя фалсе
  //   // если нашел то в туду листе ставлю тру для каждого элемента
  //   // иначе тоже самое только фолс
  // };

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
        setCheckAll={checkAllHandler2}
      />

      <TodoList
        todos={todos}
        onDelete={todoDeleteHandler}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        filteredTodos={filteredTodos}
        onComplete={completedHandler}
        // onEdit={editHandler}
      />
    </div>
  );
}

export default App;
