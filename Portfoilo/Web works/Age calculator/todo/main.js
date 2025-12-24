let tasks= []
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
    <span onclick="toggleTask(${index})">${task.text}</span>
    <button onclick="deleteTask(${index})">Delete</button>
    `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const tasktext = taskInput.value.trim();
    if (tasktext) {
        tasks.push({text: tasktext, completed: false});
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}