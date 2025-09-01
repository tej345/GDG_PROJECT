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

function renderTasks(){
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    if(tasks.length === 0){
        list.innerHTML = `<p class = "text-gray-500 text-center mt-4">No tasks yet. Add one!</p>`;
        return;
    }

    tasks.forEach(task => {
        const item = document.createElement("div");
        item.className = "flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2 transition-all";
        item.setAttribute("data-id",task.id);
        item.innerHTML = `
            <div class = "flex items-center">
              <label class = "flex items-center cursor-pointer space-x-2">
              <input type = "checkbox" class = "peer hidden" onchange = "toggleTaskComplete(${task.id})" ${task.completed ? "checked" : ""} />
              <div class = "w-5 h-5 rounded-full border-2 border-purple-500 peer-checked:bg-purple-500 transition-all"></div>
              <span class = " ${task.completed ? " line-through  text-gray-500" : ""}">${task.text}</span>
              </label>
              </div>
              <div class = "space-x-2">
                <button onclick = "editTask(${task.id})" class = " text-blue-500 hover:underline">Edit</button>
                </div>
                `;
                list.appendChild(item);
    });
}