/* TODO import á allt viðeigandi úr ./lib/todo.js */
import {
  createTodoItem,
  toggleFinished,
  clearList,
  updateStats,
  checkListState,
} from "./lib/todo.js";

/**
 * @param {HTMLElement} todolist
 */
function initialize(todolist) {
  const form = todolist.querySelector("form");
  const input = form.querySelector("input[name='string']");
  const toggleBtn = todolist.querySelector(".toggle-finished");
  const clearBtn = todolist.querySelector(".clear-all");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text.length === 0) return;

    createTodoItem(todolist, text);

    input.value = "";
    input.focus();

    updateStats(todolist);
    checkListState(todolist);
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const shown = toggleFinished(todolist);
      toggleBtn.textContent = shown ? "Fela kláruð atriði" : "Sýna kláruð atriði";
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Ertu viss um að þú viljir eyða öllum atriðum?")) {
        clearList(todolist);
      }
    });
  }

  updateStats(todolist);
  checkListState(todolist);
}


const todoList = document.querySelector(".todo-list");

if (todoList && todoList instanceof HTMLElement) {
  initialize(todoList);
} else {
  console.error("no todo list found");
}