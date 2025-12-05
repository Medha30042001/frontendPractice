
document.getElementById("logoutBtn").addEventListener("click", ()=>{
    window.location.href = "../html/index.html";
});


let fleets = [];

let categoryValue = '';
let availValue = '';

IMAGE_URL = "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

//sidebar expand/collapse
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");

toggleBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("expanded");
});

document.querySelectorAll("#categoryMenu .item").forEach(item =>{
    item.addEventListener("click", ()=>{
        categoryValue = item.textContent;
        document.getElementById("category-btn").textContent = categoryValue;
    });
});

document.querySelectorAll("#availMenu .item").forEach(item=>{
    item.addEventListener("click", ()=>{
        availValue = item.textContent;
        document.getElementById("avail-btn").textContent = availValue;
    })
})

//when add fleet button is clicked
document.getElementById("addBtn").addEventListener("click", ()=>{
    let regno = document.getElementById("regno").value.trim();
    let category = categoryValue;
    let dname = document.getElementById("dname").value.trim();
    let avail = availValue;


    if(regno === '' || category === '' || dname === '' || avail === ''){
        alert("Fill all the fields");
        return;
    }

    let fleet = {
        imgUrl : IMAGE_URL,
        regno,
        category,
        dname,
        avail
    };

    fleets.push(fleet);
    renderfleet(fleets);

    document.getElementById("regno").value = '';
    categoryValue = 'Category ▾';
    document.getElementById("category-btn").textContent = 'Category ▾'; 
    document.getElementById("dname").value = '';
    availValue = 'Availability ▾';
    document.getElementById("avail-btn").textContent = 'Availability ▾';

});

//make card
function renderfleet(fleets){
    let container = document.getElementById("container");
    container.innerHTML = "";

    fleets.forEach((fleet, index)=>{
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        let regno = document.createElement("p");
        let category = document.createElement("p");
        let dname = document.createElement("p");
        let avail = document.createElement("p");
        
        let updateDriverBtn = document.createElement("button");
        updateDriverBtn.className = "updateDrivrBtn";
        let changeAvailBtn = document.createElement("button");
        changeAvailBtn.className = "changeAvailBtn";
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";

        img.src = fleet.imgUrl;
        regno.innerHTML = `<span class="label">Reg No: </span>${fleet.regno}`;
        category.innerHTML = `<span class="label">Category: </span>${fleet.category}`;
        dname.innerHTML = `<span class="label">Driver: </span>${fleet.dname}`;
        avail.innerHTML = `<span class="label">Availability: </span>${fleet.avail}`;
        
        updateDriverBtn.textContent = "Update Driver";
        changeAvailBtn.textContent = "Change Availability";
        deleteBtn.textContent = "Delete";

        updateDriverBtn.addEventListener("click", ()=>{
            let newDname = prompt("New Driver Name : ");

            if(newDname !== null && newDname.trim() !== '' && newDname !==dname.textContent){
                dname.textContent = newDname;
            }else{
                alert("No new name entered");
            }
        });

        changeAvailBtn.addEventListener("click", ()=>{
            if(fleet.avail === "Available"){
                fleet.avail = "Unavailable";
                avail.innerHTML = `<span class="label">Availability: </span>${fleet.avail}`;
            }else if(fleet.avail === "Unavailable"){
                fleet.avail = "Available";
                avail.innerHTML = `<span class="label">Availability: </span>${fleet.avail}`;
            }
        });

        deleteBtn.addEventListener("click", ()=>{
            if(confirm("Are you sure?")){
                deleteCard(index);
            }
        });

        card.appendChild(img);
        card.appendChild(regno);
        card.appendChild(category);
        card.appendChild(dname);
        card.appendChild(avail);
        card.appendChild(updateDriverBtn);
        card.appendChild(changeAvailBtn);
        card.appendChild(deleteBtn);

        container.appendChild(card);

    });    
}

//delete
function deleteCard(index){
    fleets.splice(index, 1);
    renderfleet(fleets);
}

let selectedFilterCategory = "All";
let selectedFilterAvailability = "All";

//filter category and availaility
document.querySelectorAll("#filterCategory .item").forEach(item=>{
    item.addEventListener("click", ()=>{
        selectedFilterCategory = item.textContent;
        applyFilters();
    });
});

document.querySelectorAll("#filterAvail .item").forEach(item=>{
    item.addEventListener("click", ()=>{
        selectedFilterAvailability = item.textContent;
        applyFilters();
    });
});

function applyFilters(){
    let filtered = fleets.filter(fleet => {
        let categoryMatch = (selectedFilterCategory === "All" || fleet.category === selectedFilterCategory);
        let availMatch = (selectedFilterAvailability === "All" || fleet.avail === selectedFilterAvailability);
        return categoryMatch && availMatch;
    });
    renderfleet(filtered);
}

//clear button
document.getElementById("clearBtn").addEventListener("click", ()=>{
    selectedFilterAvailability = "All";
    selectedFilterCategory = "All";
    renderfleet(fleets);
})