
import { deleteUsers, editUsers } from "./crud.js";


export function renderUsers(users){
    let container = document.getElementById("container");
    container.innerHTML = "";

    users.forEach(user => {
        let card = document.createElement("div");
        card.className = "card";

        let nameCard = document.createElement("h3");
        nameCard.textContent = user.name;

        let ageCard = document.createElement("p");
        ageCard.textContent = `Age: ${user.age}`;

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "editBtn";
        editBtn.addEventListener("click", ()=>editUsers(user.id, user.name, user.age));

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";
        deleteBtn.addEventListener("click", ()=>deleteUsers(user.id));

        card.append(nameCard, ageCard, editBtn, deleteBtn);
        container.appendChild(card);

    });
}