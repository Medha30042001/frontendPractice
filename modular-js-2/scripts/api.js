const BASE_URL = "https://modular-js-2-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function postAPI(users){
    return await fetch(`${BASE_URL}users.json`, {
        method : "POST",
        body : JSON.stringify(users)
    });
}

export async function getAPI(){
    let res = await fetch(`${BASE_URL}users.json`);
    return res.json();
}

export async function patchAPI(id, newUser){
    return await fetch(`${BASE_URL}users/${id}.json`, {
        method : "PATCH",
        body : JSON.stringify(newUser)
    });
}

export async function deleteAPI(id){
    return await fetch(`${BASE_URL}users/${id}.json`, {
        method : "DELETE"
    });
}