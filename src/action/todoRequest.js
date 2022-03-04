const API_URL = "https://exceed-todo-list.herokuapp.com";
const API_KEY = "6cbde027-1bf2-488b-bd9a-c0e004eef164";

export const fetchTodos = fetch(`${API_URL}/api/v1/todos`, {
  headers: {
    "Content-type": "application/json",
    charset: "UTF-8",
    apikey: API_KEY,
  },
})
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    return data.map((todo) => {
      const { _id, ...restProps } = todo;

      return { id: _id, ...restProps };
    });
  });

export const addTodo = (title) =>
  fetch(`${API_URL}/api/v1/todos`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "POST",
    body: JSON.stringify({ title }),
  }).then(function (data) {
    return data.json();
  });

export const removeTodo = (id) =>
  fetch(`${API_URL}/api/v1/todos/${id}`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "DELETE",
  }).then(function (data) {
    return data.json();
  });

export const updateTodo = (id, title) =>
  fetch(`${API_URL}/api/v1/todos/${id}/title`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "PUT",
    body: {
      title: title,
    },
  }).then(function (data) {
    return data.json();
  });
