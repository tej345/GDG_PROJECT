// global states

let user = localStorage.getItem('username');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// element references

const dom={
    register:document.getElementById("registerBtn"),
    submitNameBtn:document.getElementById("submitNameBtn"),
    nameInput:document.getElementById("name-input"),
    nameModal:document.getElementById("name-modal"),
    nameGreeting:document.getElementById("greeting"),
    taskInput:document.getElementById("task-input"),
    taskList:document.getElementById("task-list"),
    editInput:document.getElementById("edit-input"),
    editModal:document.getElementById("edit-modal"),
    changenameBtn:document.getElementById("change-name-btn"),
    themeToggle:document.getElementById("theme-toggle"),
};

let taskBeingEdited=null;

function handleNameSubmission(){
    const name = dom.nameInput.value.trim();
    if(name){
        user = name;
        localStorage.setItem('username',user);
        dom.nameModal.classList.add("hidden");
        updateGreeting();
    }
}

function updateGreeting(){
    dom.nameGreeting.textContent = `Hello, ${user}`;
}

function showNameModal(){
    dom.nameModal.classList.remove("hidden");
    setTimeout(() => dom.nameInput.focus(),100);
}
function handleChangeName(){
    localStorage.removeItem('username');
    dom.nameInput.value = "";
    user = null;
    showNameModal();
}

function addTask(text) {
    if(text.trim() === "")return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    dom.taskInput.value = "";
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks(){
    dom.taskList.innerHTML = "";

    if(tasks.length === 0){
        dom.taskList.innerHTML = `<p class="text-gray-500 text-center mt-4">No tasks yet. Add one!</p>`;
        return;
    }

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2 transition-all";
        taskItem.dataset.id=task.id;

        const taskTextClass=task.completed?"line-through text-gray-500":"";
        taskItem.innerHTML = `
            <label class="flex items-center space-x-2">
                <input type="checkbox" class="task-checkbox peer hidden" data-id="${task.id}" ${task.completed ? "checked" : ""} />
                <div class="w-5 h-5 rounded-full border-2 border-purple-500 transition-all cursor-pointer peer-checked:bg-purple-500 peer-checked:border-purple-500 hover:bg-purple-200 hover:border-purple-600"></div>
                <span class="${taskTextClass}">${task.text}</span>
            </label>
            <div class="space-x-2">
                <button class="edit-btn text-blue-500 hover:underline" data-id="${task.id}">Edit</button>
            </div>
        `;
        dom.taskList.appendChild(taskItem);
    });
    addEventListenersToTasks();
}

function handleTaskDeletion(id) {
    tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
}

function openEditModal(taskElement){
    dom.editInput.value = "";
    dom.editModal.classList.remove("hidden");
    taskBeingEdited = taskElement;
    setTimeout(() => dom.editInput.focus(), 100);
}

function handleEditSubmission(){
    const newText = dom.editInput.value.trim();
    if(newText && taskBeingEdited){
        const id = parseInt(taskBeingEdited.dataset.id);
        const task = tasks.find(t => t.id === id);
        if(task){
            task.text = newText;
            saveTasks();
            renderTasks();
        }
        taskBeingEdited = null;
        dom.editModal.classList.add("hidden");
    }
}

//initializes the event listeners
function addEventListenersToTasks(){
    dom.taskList.querySelectorAll(".edit-btn").forEach(button=>{
        button.addEventListener("click",(event)=>{
            const taskId=parseInt(event.target.dataset.id);
            const taskElement=document.querySelector(`[data-id="${taskId}"]`);
            if(taskElement){
                openEditModal(taskElement);
            }
        });
    });

    dom.taskList.querySelectorAll(".task-checkbox").forEach(checkbox=>{
        checkbox.addEventListener("change",(event)=>{
            const taskId=parseInt(event.target.dataset.id);
            handleTaskDeletion(taskId);
        });
    });
}
// event listeners go here

dom.register.addEventListener("click",showNameModal);

dom.submitNameBtn.addEventListener("click",handleNameSubmission);

dom.taskInput.addEventListener("keydown",(event)=> {
    if(event.key==="Enter"){
        addTask(dom.taskInput.value);
    }
});

dom.nameInput.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        handleNameSubmission();
    }
});

dom.editInput.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        handleEditSubmission();
    }
});

dom.changenameBtn?.addEventListener("click",handleChangeName);

document.addEventListener("DOMContentLoaded",()=>{
    const storedName=localStorage.getItem("username");
    if(storedName){
        user=storedName;
        updateGreeting();
        renderTasks();
    }else{
        showNameModal();
    }

    if(localStorage.getItem("theme")==="dark"){
        document.documentElement.classList.add("dark");
    }else{
        document.documentElement.classList.remove("dark");
    }
});


dom.themeToggle.addEventListener("click",()=>{
    document.documentElement.classList.toggle("dark");
    if(document.documentElement.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeToggle.textContent="Light Mode"
    }else{
        localStorage.setItem("theme","light");
        themeToggle.textContent="Dark Mode";
    }
});