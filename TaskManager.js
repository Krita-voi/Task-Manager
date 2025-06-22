document.addEventListener('DOMContentLoaded',()=>{
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page');

    buttons.forEach(button => {
        button.addEventListener('click',()=>{
            const targetId = button.getAttribute('data-target');
            
            //remove ative class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            //add active to clicked button
            button.classList.add('active');

            //hide all secitons
            sections.forEach(secition => secition.classList.add('hidden'));

            //show target section
            const targetSection = document.getElementById(targetId);
            if(targetSection){
                targetSection.classList.remove('hidden');
            }
        });
    });


    //task management elements
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title-input');
    const taskDateInput = document.getElementById('task-date-input');
    const taskList = document.getElementById('task-list');

    // Dashboard elements
    const totalTasksEl = document.getElementById('Total-tasks');
    const completedTasksEl = document.getElementById('completed-task');
    const pendingTasksEl = document.getElementById('Pending-task');
    const todayTasksEl = document.getElementById('Today-task');
    // Dark mode toggle
    const themeSwitch = document.getElementById('theme-switch');

    //to hold task declaed arry
    let tasks = []

    function saveToLocalStorage(){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }


    function loadTaskFromLocalStorage(){
        const storedTasks = localStorage.getItem('tasks');
        if(storedTasks){
            tasks = JSON.parse(storedTasks)
        }
    }

     //  Dashboard Update 
    function updateDashboard() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(t => t.date === today).length;

        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;
        todayTasksEl.textContent = todayTasks;
    }

    function renderTask() {
        // Clearing list
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', `Mark task "${task.title}" as completed`);
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveToLocalStorage();
                renderTask();

            });

            // title and date
            const titleSpan = document.createElement('span');
            titleSpan.textContent = `${task.title} (Due: ${task.date})`;
            if (task.completed) {
                titleSpan.style.textDecoration = 'line-through';
                titleSpan.style.color = 'grey';
            }

            // Delete btn for task
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('aria-label', `Delete task "${task.title}"`);
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveToLocalStorage();
                renderTask();
            });

            li.appendChild(checkbox);
            li.appendChild(titleSpan);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
        
        
        updateDashboard();
    }


    // Add task on form submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = taskTitleInput.value.trim();
        const date = taskDateInput.value;

        if (!title || !date) {
            alert('Please fill in both title and date.');
            return;
        }

        tasks.push({
            title: title,
            date: date,
            completed: false
        });

        taskTitleInput.value = '';
        taskDateInput.value = '';
        saveToLocalStorage();
        renderTask();
    });   

    //  Dark Mode
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme', themeSwitch.checked);
    });
    }

    loadTaskFromLocalStorage();
    renderTask();
   
});