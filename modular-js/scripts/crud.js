
import { postAPI, getAPI, editAPI, deleteAPI } from "./api.js";
import { renderUsers } from "./ui.js";

//postusers
export async function postUsers(){
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();

        if(!name || !age){
            alert("Enter name and age");
            return;
        }

        const data = {name, age};

        await postAPI(data); //forgot await here

        alert("User added successfully!");

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";

        getUsers();
    }

//getUsers();
export async function getUsers(){
    //try{
         const data = await getAPI();

        // let before = Object.entries(data);
        // console.log("before", before);

        const userArray = data ?
        Object.entries(data).map(([id, user])=>({
            id,
            ...user
        })) : [];

        renderUsers(userArray);

    //}catch(err){
        //console.log(err);
    //}
}



//editUsers()
export async function editUsers(id, oldName, oldAge){
    let newName = prompt("Enter new name", oldName);
    let newAge = prompt("Enter new age", oldAge);

    if(!newName || !newAge) return;

    let newUser = {name:newName, age:newAge};

    await editAPI(id, newUser);
    
    alert("User Updated!");
    getUsers();
}

//deleteUsers()
export async function deleteUsers(id){
    await deleteAPI(id);
    alert("User Deleted!");
    getUsers();
}


