
//base url of firebase reaaltime database
const BASE_URL = "https://crud-firebase-c5e86-default-rtdb.asia-southeast1.firebasedatabase.app/";

//add user to firebase
document.getElementById("addBtn").addEventListener("click", 
    async function(){
        const name = document.getElementById("name").value.trim(); //get name
        const age = document.getElementById("age").value.trim(); //get age

        if(!name || !age){ //validation
            alert("Please enter name and age");
            return;
        }

        const data = {name, age}; //object to send

        //POST => save new data in Firebase
        await fetch(`${BASE_URL}users.json`, {
            method : "POST",
            body: JSON.stringify(data)
        });

        alert("User added successfully");

        document.getElementById("name").value = ""; //clear input
        document.getElementById("age").value = ""; //clear input

        getUsers(); //Refresh List
});

//fetch all users from firebase
async function getUsers(){
    try{
        const res = await fetch(`${BASE_URL}users.json`); //GET request
        const data = await res.json();

        console.log("data", data);

        //what is this, why is this??
        const before = Object.entries(data);
        console.log("before", before);

        const usersArray = data
            ? Object.entries(data).map(([id, user])=>({
                id,
                ...user
            })) : [];
        //till here, what is this?


        renderUsers(usersArray); //render to ui
    }catch(error){
        console.log(error);
    }
}

function renderUsers(users){
    const mainDiv = document.getElementById("userList");
    mainDiv.innerHTML = "";

    users.forEach((user) => {
        let card = document.createElement("div");
        card.className = "card";

        let name = document.createElement("h3");
        name.textContent = user.name;

        let age = document.createElement("p");
        age.textContent = `Age : ${user.age}`;

        //edit button
        let editBtn = document.createElement("button");
        editBtn.className = "btnEdit";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => updateUser(user.id, user.name, user.age);

        //delete button
        let delBtn = document.createElement("button");
        delBtn.className = "btnDel";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteUser(user.id);

        //append elements to card
        card.append(name, age, editBtn, delBtn);

        //add card to mainpage
        mainDiv.appendChild(card);
    });
}

// Update user in Firebase
async function updateUser(id, oldName, oldAge){
    const name = prompt("Enter new name", oldName);
    const age = prompt("Enter new age", oldAge);

    if(!name || !age) return;

    const updatedUser = {name, age};

    await fetch(`${BASE_URL}users/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser)
    });

    alert("User Updated!");

    getUsers(); //reload list
}

async function deleteUser(id){
    const res = await fetch(`${BASE_URL}users/${id}.json`,{
        method: "DELETE"
    });

    
    alert("User Deleted!");
    if(res.ok){
        getUsers();
    }
}

getUsers(); //load users on page load