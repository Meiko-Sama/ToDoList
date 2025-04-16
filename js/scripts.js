const taskInput = document.getElementById("task_input");
const addTaskBtn = document.getElementById("add_task_btn");
const progress = document.getElementById("progress");
const progressNumbers = document.getElementById("number");
const taskList = document.getElementById("task_list");

console.log("JS CONECTADO!");
console.log(taskInput);
console.log(addTaskBtn);
console.log(progress);
console.log(progressNumbers);
console.log(taskList);

const updateProgress = () => {
    const totaltask = taskList.chilfren.length;
    const completedTask = taskList.querySelectorAll(".checkbox:checked").length;

    progress.style.width = totaltask 
    ? `${(completedTask / totaltask) = 100}%`
    : "0%";

     progressNumbers.textContent = `${completedTask} / ${totaltask}`;
};

const addTask = (event, completed = false) => {
  event.preventDefault();

  //TRIM - Remove os espaços na parte de trás e da frente da STRING
  const taskText = taskInput.value.trim();

  if (!taskText) {
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
  <input type="checkbox" class = "checkbox" ${completed ? "checked" : ""}>
  <span>${taskText}</span>
  <div class = "task_buttons">
      <button class = "edit_btn"> 
          <i class = "fa-solid fa-pen"></i>
      </button>

      <button class = "delete_btn"> 
         <i class = "fa-solid fa-trash"></i>
      </button>
  </div>
  `;

  const checkbox = li.querySelector(".checkbox");
  const editBtn = li.querySelector(".edit_btn");

  if (completed) {
    li.classList.add("completed");
    editBtn.disabled = true;
    editBtn.style.opacity = "0.5";
    editBtn.style.pointerEvents = "none";
    updateProgress();
  }

  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    li.classList.toggle("completed", isChecked);
    editBtn.disabled = isChecked;
    editBtn.style.opacity = isChecked ? "0.5" : "1";
    editBtn.style.pointerEvents = isChecked ? "none" : "auto";
    updateProgress();
  });

  editBtn.addEventListener("click", () => {
    taskInput.value = li.querySelector("span").textContent;
    li.remove();
  });

  li.querySelector(".delete_btn").addEventListener("click", () => {
    li.remove();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();
};

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(event);
  }
});
