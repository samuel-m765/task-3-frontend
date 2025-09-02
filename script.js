const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5"; // mock API

// Fetch tasks from API
function getTasks() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // Extract titles from the mock API
      tasks = data.map((item) => ({ id: item.id, task: item.title }));
      displayTasks();
    })
    .catch((err) => console.error("Error fetching tasks:", err));
}

// Display tasks
function displayTasks() {
  todoList.innerHTML = "";
  tasks.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.task} 
      <button onclick="deleteTask(${item.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Add new task (mocked, won't persist on jsonplaceholder)
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  // POST request to API (mock)
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({ title: taskText }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((newTask) => {
      tasks.push({ id: newTask.id, task: newTask.title });
      taskInput.value = "";
      displayTasks();
    })
    .catch((err) => console.error("Error adding task:", err));
});

// Delete task (mocked)
function deleteTask(id) {
  // DELETE request to API (mock)
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      tasks = tasks.filter((item) => item.id !== id);
      displayTasks();
    })
    .catch((err) => console.error("Error deleting task:", err));
}

// Initial fetch
getTasks();
