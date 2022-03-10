const API_URL = "https://exceed-todo-list.herokuapp.com";
const API_KEY = "6cbde027-1bf2-488b-bd9a-c0e004eef164";

let headers = {
  "Content-type": "application/json",
  charset: "UTF-8",
  apikey: API_KEY,
};

export const fetchTodos = () =>
  fetch(`${API_URL}/api/v1/todos`, {
    headers: headers,
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      return data.map((todo) => {
        const { _id, ...restProps } = todo;

        return { id: _id, ...restProps };
      });
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const addTodo = (title) =>
  fetch(`${API_URL}/api/v1/todos`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({ title }),
  })
    .then((response) => {
      if (response.ok) {
        return title;
      } else if (!response.ok) {
        throw new Error("Error!");
      }
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const removeTodo = (id) =>
  fetch(`${API_URL}/api/v1/todos/${id}`, {
    headers: headers,
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const updateTodo = (id, title) =>
  fetch(`${API_URL}/api/v1/todos/${id}/title`, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify({ title }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const updateStatusTodo = (id) =>
  fetch(`${API_URL}/api/v1/todos/${id}/done`, {
    headers: headers,
    method: "PUT",
  })
    .then((response) => {
      if (response.ok) {
        return id;
      } else if (!response.ok) {
        throw new Error("Error!");
      }
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const deleteDone = () =>
  fetch(`${API_URL}/api/v1/todos/clear-done`, {
    headers: headers,
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const a = response.json();
        console.log(555555, a);
        return a;
      }

      throw new Error("Error!");
    })

    .catch((err) => {
      console.log(new Error(err));
    });
