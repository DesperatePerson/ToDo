"use strict";

const todoList = document.querySelector(".task-list");
const formText = document.querySelector(".form-adding__text");
const formBtn = document.querySelector(".form-adding__btn");

let counter = 0;
const taskList = [];

if (taskList.length) {
  taskList.forEach((elem) => {
    counter = Math.max(elem.id, counter);
  });
}

formBtn.addEventListener("click", addItem);

function addItem(event) {
  event.preventDefault();
  if (formText.value.trim().length) {
    const taskItem = {
      id: counter++,
      text: formText.value.trim(),
      isDone: false,
    };
    taskList.push(taskItem);
    formText.value = "";
    render();
  }
}

function createHtmlTemplate(obj) {
  const listItem = document.createElement("li");
  listItem.className = "task-list__item";
  listItem.dataset.number = counter;
  todoList.appendChild(listItem);

  const clickArea = document.createElement("div");
  clickArea.className = "task-list__click-area";
  
  listItem.appendChild(clickArea);

  const itemCheckbox = document.createElement("input");
  itemCheckbox.className = "task-list__checkbox";
  itemCheckbox.type = "checkbox";
  
  clickArea.appendChild(itemCheckbox);

  if (obj.isDone) {
    listItem.classList.add("task-list__item-done");
    itemCheckbox.checked = true;
  }

  const itemText = document.createElement("span");
  itemText.className = "task-list__text";
  itemText.innerText = obj.text;
  clickArea.appendChild(itemText);

  const listBtn = document.createElement("button");
  listBtn.className = "task-list__btn";
  listItem.appendChild(listBtn);

  const itemImg = document.createElement("img");
  itemImg.className = "task-list__btn-img";
  itemImg.src = "/img/trash.svg";
  itemImg.alt = "Удалить";
  listBtn.append(itemImg);

  clickArea.addEventListener("click", () => {
    if (!obj.isDone) {
      listItem.classList.add("task-list__item-done");
      itemCheckbox.checked = true;
      obj.isDone = true;
    } else {
      listItem.classList.remove("task-list__item-done");
      itemCheckbox.checked = false;
      obj.isDone = false;
    }
  });

  listBtn.addEventListener("click", () => {
    taskList.splice(obj.dataset, 1);
    listItem.remove();
  });

  return listItem;
}

function render() {
  todoList.innerHTML = "";
  for (let item of taskList) {
    const domElement = createHtmlTemplate(item);
    todoList.appendChild(domElement);
  }
}

render();
