import { getUsers, postUsers } from "./crud.js";

document.getElementById("addBtn").addEventListener("click", await postUsers);

getUsers();