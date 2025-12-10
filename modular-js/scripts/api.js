const BASE_URL = "https://modular-js-crud-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function postAPI(data){
    return await fetch(`${BASE_URL}users.json`,{
            method : "POST",
            body : JSON.stringify(data)
        });
}

export async function getAPI(){
    let res = await fetch(`${BASE_URL}users.json`);
    return res.json();
        // let data = await res.json();
        // console.log("data", data);
}

export async function editAPI(id, newUser){
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

