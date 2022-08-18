/* start todo section */
let todoTextInput = document.getElementById("todoTextInput");
let selectStatus = document.getElementById("selectTaskStatus");
let submitBtn = document.getElementById("submitData");
let updateBtn = document.getElementById("updateData");
let allTabs = document.querySelectorAll(".tab-pane");
let currentTab = document.getElementById("pills-current");
let pendingTab = document.getElementById("pills-pending");
let completedTab = document.getElementById("pills-completed");

let arrOfTasks = [];

$(document).ready(function () {
  $(".todo-app").fadeIn(1500);
});

if (localStorage.getItem("tasks") != null) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks(arrOfTasks);
}
//-----------------------------------------------------------------------------------
function randomId(id) {
  let index = 0;
  while (arrOfTasks.length > index) {
    if (arrOfTasks[index].id == id) {
      return randomId(id + 1);
    }
    index++;
  }
  return id;
}

function sumbitTask() {
  let task = {
    id: randomId(arrOfTasks.length),
    text: todoTextInput.value,
    status: selectStatus.value,
  };
  let input_regex = /[a-zA-Z0-9_&-\s]{8,}/;
  if (input_regex.test(task.text)) {
    todoTextInput.classList.add("is-valid");
    todoTextInput.classList.remove("is-invalid");
    $(todoTextInput.nextElementSibling).hide(250);
    arrOfTasks.push(task);
    //add array of tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
    //display tasks
    displayTasks(arrOfTasks);
    todoTextInput.value = "";
  } else {
    todoTextInput.classList.add("is-invalid");
    todoTextInput.classList.remove("is-valid");
    $(todoTextInput.nextElementSibling).show(250);
  }
}

todoTextInput.addEventListener("input", function () {
  let text = todoTextInput.value;
  let input_regex = /[a-zA-Z0-9_&-\s]{8,}/;
  if (input_regex.test(text) && text != "") {
    todoTextInput.classList.add("is-valid");
    todoTextInput.classList.remove("is-invalid");
    $(todoTextInput.nextElementSibling).hide(250);
  } else {
    todoTextInput.classList.add("is-invalid");
    todoTextInput.classList.remove("is-valid");
    $(todoTextInput.nextElementSibling).show(250);
  }
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sumbitTask();
});
//-----------------------------------------------------------------------------------
function displayTasks(arrOfTasks) {
  let currentTasks = "";
  let pendingTasks = "";
  let completedTasks = "";
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].status == "current") {
      currentTasks += `
        <div class="todo-item row bg-light" data-id="${arrOfTasks[i].id}">
              <div class="col-md-2 arrows">
                <span class="bg-warning p-3 rounded rounded-circle">
                  <a href="#" class="arrowUp" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-up"></i></a>
                </span>
                <span class="bg-warning p-3 rounded rounded-circle">
                  <a href="#" class="arrowDown" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-down"></i></a>
                </span>
              </div>
              <div class="todo-text col-md-6 bg-light">
                <p>${arrOfTasks[i].text}</p>
              </div>
              <div class="todo-status col-md-2">
                <select class="status fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                  <option selected value="current">current</option>
                  <option value="pending">pending</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div class="todo-edit col-md-2">
                <select class="edit fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                  <option value="none">none</option>
                  <option value="update">update</option>
                  <option value="delete">delete</option>
                </select>
              </div>
            </div>
        `;
    }
    if (arrOfTasks[i].status == "pending") {
      pendingTasks += `
          <div class="todo-item row bg-light" data-id="${arrOfTasks[i].id}">
                <div class="col-md-2 arrows">
                  <span class="bg-warning p-3 rounded rounded-circle">
                    <a href="#" class="arrowUp" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-up"></i></a>
                  </span>
                  <span class="bg-warning p-3 rounded rounded-circle">
                    <a href="#" class="arrowDown" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-down"></i></a>
                  </span>
                </div>
                <div class="todo-text col-md-6 bg-light">
                  <p>${arrOfTasks[i].text}</p>
                </div>
                <div class="todo-status col-md-2">
                  <select class="status fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                    <option value="current">current</option>
                    <option selected value="pending">pending</option>
                    <option value="completed">completed</option>
                  </select>
                </div>
                <div class="todo-edit col-md-2">
                  <select class="edit fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                    <option value="none">none</option>
                    <option value="update">update</option>
                    <option value="delete">delete</option>
                  </select>
                </div>
              </div>
          `;
    }
    if (arrOfTasks[i].status == "completed") {
      completedTasks += `
          <div class="todo-item row bg-light" data-id="${arrOfTasks[i].id}">
                <div class="col-md-2 arrows">
                  <span class="bg-warning p-3 rounded rounded-circle">
                    <a href="#" class="arrowUp" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-up"></i></a>
                  </span>
                  <span class="bg-warning p-3 rounded rounded-circle">
                    <a href="#" class="arrowDown" data-id="${arrOfTasks[i].id}"><i class="fa-solid fa-arrow-down"></i></a>
                  </span>
                </div>
                <div class="todo-text col-md-6 bg-light">
                  <p>${arrOfTasks[i].text}</p>
                </div>
                <div class="todo-status col-md-2">
                  <select class="status fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                    <option value="current">current</option>
                    <option value="pending">pending</option>
                    <option selected value="completed">completed</option>
                  </select>
                </div>
                <div class="todo-edit col-md-2">
                  <select class="edit fw-bolder p-1" data-id="${arrOfTasks[i].id}">
                    <option value="none">none</option>
                    <option value="update">update</option>
                    <option value="delete">delete</option>
                  </select>
                </div>
              </div>
          `;
    }
  }
  currentTab.innerHTML = currentTasks;
  pendingTab.innerHTML = pendingTasks;
  completedTab.innerHTML = completedTasks;
  retrieve();
  deleteTask();
  statusChange();
  arrowUp();
  arrowDown();
  currentProgress();
  checkCompletionProgress();
}
//-----------------------------------------------------------------------------------
/* start update function */
function retrieve() {
  let retrieveBtns = document.querySelectorAll(".edit");
  let options = selectStatus.children;
  retrieveBtns.forEach(function (elem) {
    elem.addEventListener("change", function (e) {
      if (e.target.value == "update") {
        submitBtn.style.display = "none";
        updateBtn.style.display = "block";
        Array.from(options).forEach((option) =>
          option.removeAttribute("selected")
        );
        let elemId = e.target.dataset.id;
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == elemId) {
            todoTextInput.value = arrOfTasks[i].text;
            let selectedAttr = document.createAttribute("selected");
            selectStatus
              .querySelector(`option[value='${arrOfTasks[i].status}']`)
              .setAttributeNode(selectedAttr);
            updateBtn.setAttribute("data-id", elemId);
            break;
          }
        }
      }
      // e.target.querySelector("option[value='none']").selected = "selected";
    });
  });
}

updateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == e.target.dataset.id) {
      arrOfTasks[i].text = todoTextInput.value;
      arrOfTasks[i].status = selectStatus.value;
      break;
    }
  }
  submitBtn.style.display = "block";
  updateBtn.style.display = "none";
  updateBtn.removeAttribute("data-id");
  let options = selectStatus.children;
  Array.from(options).forEach((option) => option.removeAttribute("selected"));
  todoTextInput.value = "";
  localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
  displayTasks(arrOfTasks);
});
/* end update function */
//-----------------------------------------------------------------------------------
/* start delete function  */
function deleteTask() {
  let retrieveBtns = document.querySelectorAll(".edit");
  retrieveBtns.forEach(function (elem) {
    elem.addEventListener("change", function (e) {
      if (e.target.value == "delete") {
        let elemId = e.target.dataset.id;
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == elemId) {
            e.target.querySelector("option[value='none']").selected =
              "selected";
            popup(arrOfTasks[i].text, i); //using popup for deletion process
            /*
            arrOfTasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
            displayTasks(arrOfTasks);
            */
            break;
          }
        }
      }
      /*
      if (e.target) {
        e.target.querySelector("option[value='none']").selected = "selected";
      }
      */
    });
  });
}
/* end delete function  */
//-----------------------------------------------------------------------------------
// start changing status from dropdown

function statusChange() {
  let statusElements = document.querySelectorAll(".status");
  statusElements.forEach(function (elem) {
    elem.addEventListener("change", function (e) {
      for (let i = 0; i < arrOfTasks.length; i++) {
        if (arrOfTasks[i].id == e.target.dataset.id) {
          arrOfTasks[i].status = e.target.value;
          localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
          displayTasks(arrOfTasks);
          break;
        }
      }
    });
  });
}

// end changing status from dropdown

/* start arrows configuration */
function arrowUp() {
  let arrowUpLinks = document.querySelectorAll(".arrowUp");
  arrowUpLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let elemId = e.target.parentElement.dataset.id;
      let prevElem =
        e.target.parentElement.parentElement.parentElement.parentElement
          .previousElementSibling;
      if (prevElem) {
        let prevElemId = prevElem.dataset.id;
        let removedElem = [];
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == elemId) {
            removedElem = arrOfTasks.splice(i, 1);
            break;
          }
        }
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == prevElemId) {
            arrOfTasks.splice(i, 0, removedElem[0]);
            break;
          }
        }
        localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
        displayTasks(arrOfTasks);
      }
    });
  });
}

function arrowDown() {
  let arrowDownLinks = document.querySelectorAll(".arrowDown");
  arrowDownLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let elemId = e.target.parentElement.dataset.id;
      let nextElem =
        e.target.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling;
      if (nextElem) {
        let nextElemId = nextElem.dataset.id;
        let removedElem = [];
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == nextElemId) {
            removedElem = arrOfTasks.splice(i, 1);
            break;
          }
        }
        for (let i = 0; i < arrOfTasks.length; i++) {
          if (arrOfTasks[i].id == elemId) {
            arrOfTasks.splice(i, 0, removedElem[0]);
            break;
          }
        }
        localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
        displayTasks(arrOfTasks);
      }
    });
  });
}
/* end arrows configuration */
//-----------------------------------------------------------------------------------------
//start popup section
function popup(taskTitle, removeIndex) {
  let popup = document.createElement("div");
  popup.className = "popup-container";
  popup.style.cssText =
    "width:100vw;height:100vh;position:fixed;z-index:2000;top:0;left:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5)";

  let popup_text = document.createElement("div");
  popup_text.style.cssText =
    "text-align: center ; padding : 30px 30px 0 ; position:relative ; background:#ffc107;border-radius:15px ; box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;";
  popup.appendChild(popup_text);

  let heading = document.createElement("h2");
  heading.style.color = "#fd7e14";
  heading.appendChild(
    document.createTextNode(
      "Are You Sure you Want to Delete The Following Task ?"
    )
  );
  let TitleOfTask = document.createElement("h3");
  let titleTextNode = document.createTextNode(taskTitle);
  TitleOfTask.appendChild(titleTextNode);
  TitleOfTask.style.color = "#b66700";
  popup_text.appendChild(heading);
  popup_text.appendChild(TitleOfTask);

  let yesBtn = document.createElement("button");
  yesBtn.style.cssText =
    "width:100px;padding:10px 15px;margin:50px 50px 50px 0;cursor:pointer;font-weight:bold";
  yesBtn.appendChild(document.createTextNode("Yes"));
  popup_text.appendChild(yesBtn);

  let noBtn = document.createElement("button");
  noBtn.style.cssText =
    "width:100px;padding:10px 15px;cursor:pointer;font-weight:bold";
  noBtn.appendChild(document.createTextNode("No"));
  popup_text.appendChild(noBtn);

  yesBtn.addEventListener("click", () => {
    arrOfTasks.splice(removeIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
    displayTasks(arrOfTasks);

    $(popup_text)
      .children()
      .fadeOut(600, function () {
        $(popup_text).hide(400, function () {
          popup.remove();
        });
      });
  });

  noBtn.addEventListener("click", function () {
    $(popup_text)
      .children()
      .fadeOut(600, function () {
        $(popup_text).hide(400, function () {
          popup.remove();
        });
      });
  });

  let close = document.createElement("span");
  close.appendChild(document.createTextNode("X"));
  close.style.cssText =
    "position:absolute ; top: -15px ; right: -15px ; background: #b66700 ; color: #fff ; cursor:pointer ; border-radius:50% ; width:40px ; height:40px ; padding: 12px ; box-sizing:border-box";
  popup_text.appendChild(close);

  document.body.append(popup);

  close.onclick = function (e) {
    $(popup_text)
      .children()
      .fadeOut(600, function () {
        $(popup_text).hide(400, function () {
          this.parentElement.remove();
        });
      });
  };

  popup.onclick = function (e) {
    if (e.target.className == "popup-container") {
      $(popup_text)
        .children()
        .fadeOut(600, function () {
          $(popup_text).hide(400, function () {
            popup.remove();
          });
        });
    }
  };
}
//end popup section
//-----------------------------------------------------------------------------------
//starting progressbar section
function currentProgress() {
  const progress = document.querySelector(".progress");
  let tasksNumber = arrOfTasks.length;
  let currentTasksNum = 0;
  let pendingTasksNum = 0;
  let completedTasksNum = 0;
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].status == "current") {
      currentTasksNum += 1;
    }
    if (arrOfTasks[i].status == "pending") {
      pendingTasksNum += 1;
    }
    if (arrOfTasks[i].status == "completed") {
      completedTasksNum += 1;
    }
  }
  let currentPercent = (currentTasksNum * 100) / tasksNumber;
  let pendingPercent = (pendingTasksNum * 100) / tasksNumber;
  let completedPercent = (completedTasksNum * 100) / tasksNumber;
  progress.children[0].style.width = `${currentPercent}%`;
  progress.children[0].innerHTML = `${currentPercent.toPrecision(2)}%`;
  progress.children[1].style.width = `${pendingPercent}%`;
  progress.children[1].innerHTML = `${pendingPercent.toPrecision(2)}%`;
  progress.children[2].style.width = `${completedPercent}%`;
  progress.children[2].innerHTML = `${completedPercent.toPrecision(2)}%`;
}

function checkCompletionProgress() {
  let dashboardFace = document.querySelector(".dashboard").querySelector("i");
  let tasksNumber = arrOfTasks.length;
  let completedTasksNum = 0;
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].status == "completed") {
      completedTasksNum += 1;
    }
  }
  let completedPercent = (completedTasksNum / tasksNumber) * 360; //number of 360
  let completedRealNum = 360 - completedPercent;
  if (completedPercent >= 0 * 360 && completedPercent < 0.25 * 360) {
    dashboardFace.className = "fas fa-face-sad-cry";
  } else if (completedPercent >= 0.25 * 360 && completedPercent < 0.5 * 360) {
    dashboardFace.className = "fas fa-face-frown-open";
  } else if (completedPercent >= 0.5 * 360 && completedPercent < 0.75 * 360) {
    dashboardFace.className = "fa-solid fa-face-meh";
  } else if (completedPercent >= 0.75 * 360 && completedPercent < 360) {
    dashboardFace.className = "fas fa-smile";
  } else if (completedPercent == 360) {
    dashboardFace.className = "fa-solid fa-face-laugh-beam";
  }
  document.documentElement.style.setProperty(
    "--completion-percent",
    completedRealNum
  );
}
//end progressbar section
//-----------------------------------------------------------------------------------
/* end todo section */
