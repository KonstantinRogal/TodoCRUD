const API_URL = "https://exceed-todo-list.herokuapp.com";
const API_KEY = "6cbde027-1bf2-488b-bd9a-c0e004eef164";

export const fetchTodos = fetch(`${API_URL}/api/v1/todos`, {
  headers: {
    "Content-type": "application/json",
    charset: "UTF-8",
    apikey: API_KEY,
  },
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
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "POST",
    body: JSON.stringify({ title }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const removeTodo = (id) =>
  fetch(`${API_URL}/api/v1/todos/${id}`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });

export const updateTodo = (id, title) => {
  fetch(`${API_URL}/api/v1/todos/${id}/title`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "PUT",
    body: JSON.stringify({ title }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });
};

export const updateStatusTodo = (id) => {
  fetch(`${API_URL}/api/v1/todos/${id}/done`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "PUT",
  })
    .then((response) => {
      response.json();
      if (response.ok) {
        return id;
      }
    })
    .catch((err) => {
      console.log(new Error(err));
    });
};

export const deleteDone = () => {
  fetch(`${API_URL}/api/v1/todos/clear-done`, {
    headers: {
      "Content-type": "application/json",
      charset: "UTF-8",
      apikey: API_KEY,
    },
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })

    .catch((err) => {
      console.log(new Error(err));
    });
};
