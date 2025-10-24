import { el, empty } from "./elements.js";

export function toggleTodoItemStatus(item, isShown = true) {
  if (!item) return;

  const checkbox = item.querySelector("input[type=checkbox]");
  if (!checkbox) return;

  if (checkbox.checked) {
    item.classList.add("finished");
    if (!isShown) {
      item.classList.add("hidden");
    }
  } else {
    item.classList.remove("finished");
    item.classList.remove("hidden");
  }
}

export function removeTodoItem(item) {
  if (item && item.parentNode) {
    item.parentNode.removeChild(item);
  }
}

export function toggleFinished(todolist) {
  if (!todolist) return false;

  const list = todolist.querySelector(".list");
  if (!list) return false;

  const finishedItems = list.querySelectorAll("li.finished");
  let currentlyShown = todolist._finishedShown || false;

  for (let i = 0; i < finishedItems.length; i++) {
    const li = finishedItems[i];
    if (currentlyShown) {
      li.classList.add("hidden");
    } else {
      li.classList.remove("hidden");
    }
  }

  todolist._finishedShown = !currentlyShown;
  return !currentlyShown;
}

export function clearList(todolist) {
  if (!todolist) return;

  const list = todolist.querySelector(".list");
  if (!list) return;

  empty(list);
  updateStats(todolist);
  checkListState(todolist);
}

export function updateStats(todoList) {
  if (!todoList) return;

  const list = todoList.querySelector(".list");
  if (!list) return;

  const items = list.querySelectorAll("li");
  let finished = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains("finished")) {
      finished++;
    }
  }

  const unfinished = items.length - finished;

  const finishedSpan = todoList.querySelector(".stats .finished");
  const unfinishedSpan = todoList.querySelector(".stats .unfinished");

  if (finishedSpan) {
    finishedSpan.textContent = finished;
  }
  if (unfinishedSpan) {
    unfinishedSpan.textContent = unfinished;
  }
}

export function createTodoItem(todolist, text) {
  if (!text || text.trim() === "") return;
  if (!todolist) return;

  const list = todolist.querySelector(".list");
  if (!list) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    toggleTodoItemStatus(li, todolist._finishedShown);
    updateStats(todolist);
  });

  const span = document.createElement("span");
  span.className = "item";
  span.textContent = text;

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(span);

  const removeBtn = document.createElement("button");
  removeBtn.title = "Fjarlægja atriði";
  removeBtn.textContent = "🗑️";
  removeBtn.addEventListener("click", function () {
    removeTodoItem(li);
    updateStats(todolist);
    checkListState(todolist);
  });

  li.appendChild(label);
  li.appendChild(removeBtn);

  list.appendChild(li);

  updateStats(todolist);
  checkListState(todolist);
}

export function checkListState(todolist) {
  if (!todolist) return;

  const list = todolist.querySelector(".list");
  const emptyMessage = todolist.querySelector(".empty");

  if (!list) return;

  if (list.children.length === 0) {
    list.classList.add("hidden");
    if (emptyMessage) {
      emptyMessage.classList.remove("hidden");
    }
  } else {
    list.classList.remove("hidden");
    if (emptyMessage) {
      emptyMessage.classList.add("hidden");
    }
  }
}
