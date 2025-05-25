const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const prioritySelect = document.getElementById('priority');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        dueDate: dueDate,
        priority: priority
    };

    tasks.push(task);
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'low';
    renderTasks();
}

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
    <span><i class="fas fa-tasks"></i> ${task.text} (Due: ${task.dueDate || 'N/A'})</span>
    <div>
        <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash"></i> Delete</button>
        <button onclick="toggleTask(${index})"><i class="${task.completed ? 'fas fa-undo' : 'fas fa-check'}"></i> ${task.completed ? 'Undo' : 'Complete'}</button>
    </div>
`;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        renderTasks(filter);
    });
});



