const BASE_URL = "https://crud-firebase-2-688e5-default-rtdb.asia-southeast1.firebasedatabase.app/";

document.getElementById("addBtn").addEventListener("click", 
    async function(){
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();

        if(!name || !age){
            alert("Enter name and age");
            return;
        }

        let data = {name, age};

        //POST method
        await fetch(`${BASE_URL}users.json`,{
            method: "POST",
            body: JSON.stringify(data)
        });
        
        alert("User Added successfully!");

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";

        getUsers();
    }
)

async function getUsers(){
    try{
        let res = await fetch(`${BASE_URL}users.json`);
        let data = await res.json();
        console.log("data", data);

        let before = Object.entries(data);
        console.log("before", before);

        let usersArray = data ?
        Object.entries(data).map(([id, user]) => ({
            id,
            ...user
        })) : [];

        renderUser(usersArray);

    }catch(err){
        console.log(err);
    }
}

function renderUser(users){
    let container = document.getElementById("container");
    container.innerHTML = "";

    users.forEach(user => {
        let card = document.createElement("div");
        card.className = "card";

        let nameCard = document.createElement("h3");
        nameCard.className = "nameCard";
        nameCard.textContent = user.name;

        let ageCard = document.createElement("p");
        ageCard.className = "ageCard";
        ageCard.textContent = `Age : ${user.age}`;

        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", ()=>{
            //edit function
            editUser(user.id, user.name, user.age);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn"
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", ()=>{
            //delete function
            deleteUser(user.id);
        });

        card.append(nameCard, ageCard, editBtn, deleteBtn);
        container.appendChild(card);

    });
}

async function editUser(id, oldName, oldAge){
    let newName = prompt("Enter new name", oldName);
    let newAge = prompt("Enter new age", oldAge);

    if(!newName || !newAge) return;

    const updatedUser = {name:newName, age:newAge};

    await fetch(`${BASE_URL}users/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser)
    });
    alert("User Updated!");
    getUsers()
}

async function deleteUser(id){
    await fetch(`${BASE_URL}users/${id}.json`,{
        method:"DELETE"
    });
    alert("User Deleted!");
    getUsers();
}
getUsers();