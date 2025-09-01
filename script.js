let user = localStorage.getItem('username');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function submitName(){
    const input = document.getElementById("name-input");
    const name = input.value.trim();
    if(name){
        user = name;
        localStorage.setItem('username',user);
        document.getElementById("name-modal").classList.add("hidden");
        renderGreeting();
    }
}

function changeName(){
    localStorage.removeItem('username');
    document.getElementById("name-input").value = "";
    user = null;
    getUsername();
}

function getUsername(){
    if(!user){
        document.getElementById("name-modal").classList.remove("hidden");
        setTimeout(() => document.getElementById("name-input").focus(),100);
    } else {
        renderGreeting();
    }
}

function renderGreeting(){
    document.getElementById('greeting').textContent = `Hi ${user}, let's crush your tasks!`;
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
    document.getElementById("task-input").value = "";
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}