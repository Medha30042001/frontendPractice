import { getAPI, postAPI, patchAPI, deleteAPI } from "./api.js";
import { renderUsers } from "./ui.js";

export async function postUsers(){
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();

    if(!name || !age){
        alert("Enter name and age");
        return;
    }

    const data = {name, age};

    await postAPI(data);

    alert("User added successfully!");

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";

    getUsers();
}

export async function getUsers(){
    const data = await getAPI();
    
    const usersArray = data ?
    Object.entries(data).map(([id, user]) => ({
        id, 
        ...user
    })) : [];

    renderUsers(usersArray);
}

export async function editUsers(id, oldName, oldAge) {
    let newName = prompt("Enter new name", oldName);
    let newAge = prompt("Enter new age", oldAge);

    if(!newName || !newAge) return;

    let newUser = {name:newName, age:newAge};

    await patchAPI(id, newUser);

    alert("User Updated!");
    getUsers();
}
export async function deleteUsers(id){
    await deleteAPI(id);
    alert("User Deleted!");

    getUsers();
}

