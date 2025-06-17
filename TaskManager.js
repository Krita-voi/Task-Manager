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


//task management 
const taskForm = documnet.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title-input');
const taskDateInput = document.getElementById('task-date-input');
const taskList = document.getElementById('task-list');

//to hold task declaed arry
let task = []

function Tasks() {
    // Clearing list
    taskList.innerHTML = '';

    task.forEach((task, index) => {
        const li = document.createElement('li');

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark task "${task.title}" as completed`);
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
        });

        // title and date
        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${task.title} (Due: ${task.date})`;
        if (task.completed) {
            titleSpan.style.textDecoration = 'line-through';
            titleSpan.style.color = 'black';
        }
        // Delete btn for task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete task "${task.title}"`);
        deleteBtn.addEventListener('click', () => {
            task.splice(index, 1);
            Tasks();
        });

        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}