const form = document.querySelector("form");
const input = document.querySelector("input");
const addButton = document.querySelector("#addButton");
const list = document.querySelector("ul");
const clearButton = document.querySelector("#clear");

document.addEventListener("DOMContentLoaded", loadAllTodosToUI());
clearButton.onclick = clearTodos;
list.onclick = listFunctions;
addButton.addEventListener("click", (e) => {
  addTodoToUI(input.value);
  addTodoToStorage(input.value);

  input.value = "";
  e.preventDefault();
});
function loadAllTodosToUI() {
  let todos = getTodosFromLocalStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}
function createTodo(todo) {
  addTodoToUI(todo);
}
function addTodoToUI(todo) {
  if (todo != "" && todo.length < 65) {
    list.innerHTML += `<li><p>${todo}</p><span><button class="edit">Edit</button><button class="delete">Delete</button></span></li>`;
  } else if (todo == "") {
    showError("Todo must have a name.");
  } else if (todo.length > 64) {
    showError("Todo name length can be maximum 64 characters.");
  }
}
function addTodoToStorage(todo) {
  let todos = getTodosFromLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodosFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function showError(message) {
  alert(message);
}

// <li>Complete homework<span><button class="edit">Edit</button><button class="delete">Delete</button></span></li>

function listFunctions(e) {
  if (e.target.className == "edit") {
    editTodo();
  } else if (e.target.className == "delete") {
    deleteTodoFromStorage(e.target.parentElement.previousSibling.textContent);
    deleteTodoFromUI(e.target.parentElement.parentElement);
  }
}
function clearTodos() {
  localStorage.removeItem("todos");
  list.innerHTML = "";
}
function deleteTodoFromUI(todo) {
  todo.remove();
}
function deleteTodoFromStorage(todo) {
  let todos = getTodosFromLocalStorage();
  let x = todos.indexOf(todo);
  todos.splice(x, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
