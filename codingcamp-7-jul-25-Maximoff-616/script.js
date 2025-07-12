document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const deleteAllBtn = document.getElementById("deleteAllBtn");
    const taskList = document.getElementById("taskList");
    const filterInput = document.getElementById("filterInput");

    const tasks = [];
    
    addTaskBtn.addEventListener("click", addTask);
    deleteAllBtn.addEventListener("click", deleteAllTasks);
    filterInput.addEventListener("input", filterTasks);

    function addTask() {
        if (!taskInput.value || !dateInput.value) return;

        const task = {
            name: taskInput.value,
            date: dateInput.value,
            completed: false,
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = "";
        dateInput.value = "";
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.date}</td>
                <td>${task.completed ? "Completed" : "Pending"}</td>
                <td><button onclick="removeTask(${index})">Delete</button></td>
            `;
            taskList.appendChild(row);
        });

        if (tasks.length === 0) {
            taskList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
        }
    }

    function deleteAllTasks() {
        tasks.length = 0;
        renderTasks();
    }

    window.removeTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    function filterTasks() {
        const filterValue = filterInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterValue));
        
        taskList.innerHTML = "";
        filteredTasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.date}</td>
                <td>${task.completed ? "Completed" : "Pending"}</td>
                <td><button onclick="removeTask(${index})">Delete</button></td>
            `;
            taskList.appendChild(row);
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
        }
    }
});
