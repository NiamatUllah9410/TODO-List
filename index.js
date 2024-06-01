const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const searchInput = document.getElementById("search-bar");
// let count=0;

function addTask() {
  if (inputBox.value === "") {
    alert("You Moust Write something!");
  } else {
    // count++;
    // creating li list
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    //    counting list
    // let countList = document.createElement('span');
    // countList.innerHTML = count;
    // countList.classList.add("count-list");
    // li.appendChild(countList);
    // craete Delete buttn
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);
    // create Edit button
    let createBtn = document.createElement("button");
    createBtn.innerHTML = "Edit";
    createBtn.classList.add("edit-btn");
    li.appendChild(createBtn);
    // Date Edit div
    let editDate = document.createElement("span");
    editDate.classList.add("edit-date");
    editDate.innerHTML = getCurrentDateTime();
    li.appendChild(editDate);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.classList.contains("edit-btn")) {
      inputBox.value = e.target.parentElement.firstChild.textContent;
      e.target.parentElement.remove();
      saveData();
    }
  });
// Search/filter code
searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.toUpperCase();
  const listItems = listContainer.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    let textValue = listItems[i].textContent || listItems[i].innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
});

// Add the current date
function getCurrentDateTime() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let hours = currentDate.getHours().toString().padStart(2, "0");
  let minutes = currentDate.getMinutes().toString().padStart(2, "0");
  let seconds = currentDate.getSeconds().toString().padStart(2, "0");
  return `${month}-${day} ${hours}:${minutes}`;
}

// save the browser data

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
