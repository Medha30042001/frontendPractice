

const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");
const container = document.getElementById("container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("addBtn").addEventListener("click", ()=>{
    
    let text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    let newTask = {
        id : Date.now(),
        text,
        completed : false
    };

    tasks.push(newTask);
    //save
    saveTask();
    //render
    renderTask();

    taskInput.value = "";
});

function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(){
    container.innerHTML = "";

    let searchText = searchInput.value.toLowerCase().trim() || "";
    //let text = taskInput.value.trim();

    let filterTasks = tasks.filter(item => item.text.toLowerCase().includes(searchText));

    filterTasks.forEach(item => {
        let taskDiv = document.createElement("div");
        taskDiv.className = "taskDiv";

        let taskPoint = document.createElement("span");
        taskPoint.textContent = item.text;

        let btnDiv = document.createElement("div");
        btnDiv.className = "btnDiv";

        let completedBtn = document.createElement("button");
        completedBtn.textContent = item.completed ? "Undo" : "Done";
        if(item.completed){
            taskPoint.classList.add("completed");
            completedBtn.classList.add("completedBtn");
        }else{
            completedBtn.classList.add("finishBtn");
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";

        completedBtn.addEventListener("click", ()=>{
            item.completed = !item.completed;
            saveTask();
            renderTask();
        });

        deleteBtn.addEventListener("click", ()=>{
            tasks = tasks.filter(t => t.id !== item.id);
            saveTask();
            renderTask();
        });

        btnDiv.append(completedBtn, deleteBtn)
        taskDiv.append(taskPoint, btnDiv);
        container.appendChild(taskDiv);
    });
}

searchInput.addEventListener("input", renderTask);