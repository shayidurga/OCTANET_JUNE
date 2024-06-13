document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const task = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        category: category,
        completed: false
    };

    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(task, tasks.length - 1);
    clearInputs();
}

function clearInputs() {
    document.getElementById("taskName").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "low";
    document.getElementById("category").value = "work";
}

function renderTask(task, index) {
    const taskList = document.getElementById("taskList");
    const taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.dataset.index = index;

    taskElement.innerHTML = `
        <span>${task.name}</span>
        <span>${task.dueDate}</span>
        <span>${task.priority}</span>
        <span>${task.category}</span>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(taskElement);
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) return;

    const filterPriority = document.getElementById("filterPriority").value;
    const filterCategory = document.getElementById("filterCategory").value;
    const filterCompletion = document.getElementById("filterCompletion").value;
    const filterDate = document.getElementById("filterDate").value;

    tasks = tasks.filter(task => {
        let matchesPriority = filterPriority === "all" || task.priority === filterPriority;
        let matchesCategory = filterCategory === "all" || task.category === filterCategory;
        let matchesCompletion = filterCompletion === "all" || (filterCompletion === "completed" && task.completed) || (filterCompletion === "incomplete" && !task.completed);
        let matchesDate = !filterDate || task.dueDate === filterDate;

        return matchesPriority && matchesCategory && matchesCompletion && matchesDate;
    });

    tasks.forEach((task, index) => renderTask(task, index));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach((task, index) => renderTask(task, index));
    }
}
