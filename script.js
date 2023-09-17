"use strict";

const addButton = document.querySelector(".adding-button");
const taskList = document.querySelector(".area__search-list-container");

addButton.addEventListener("click", () => {
  const taskInput = document.querySelector(".text-area");
  const listText = taskInput.value.trim();
  let isBackgroundChanged = false;

  if (listText) {
    const listItem = document.createElement("li");
    listItem.className = "area__search-list-item";
    listItem.innerHTML = `
      <div class="active-area">
        <input type="checkbox" class="custom-checkbox" />
        <div class="list-text">${listText}</div>
      </div>
      <button class="trash-btn">
        <img class="trash-btn" src="./img/trash.svg" alt="Удалить" />
      </button>
      `;

    taskList.addEventListener("click", (event) => {
      const taskItem = event.target.parentNode.parentNode;

      if (event.target.type === "checkbox") {
        if (event.target.checked) {
          taskItem.classList.add("completed");
        } else {
          taskItem.classList.remove("completed");
        }
      }

      if (event.target.className === "list-text") {
        const checkbox = event.target.previousElementSibling;

        if (isBackgroundChanged) {
          taskItem.classList.remove("completed");
          checkbox.checked = false;
        } else {
          taskItem.classList.add("completed");
          checkbox.checked = true;
        }

        isBackgroundChanged = !isBackgroundChanged;
      }

      if (event.target.className === "trash-btn") {
        taskItem.remove();
      }
    });

    taskList.append(listItem);
    taskInput.value = "";
  }
});
