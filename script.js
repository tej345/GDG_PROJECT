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

function renderGreeting(){
    document.getElementById('greeting').textContent = `Hi ${user}, let's crush your tasks!`;
}