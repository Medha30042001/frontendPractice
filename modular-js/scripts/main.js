import {postUsers, getUsers} from "./crud.js";

document.getElementById("addBtn").addEventListener("click", postUsers);

getUsers();