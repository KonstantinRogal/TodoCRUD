import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const todoDeleteHandler = (id) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
      />
      <TodoList
        todos={todos}
        onDelete={todoDeleteHandler}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
}

export default App;
