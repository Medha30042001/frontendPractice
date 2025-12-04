
console.log("JS loaded");

//new method
//go to the admin page
document.getElementById("adminBtn").addEventListener("click", ()=>{
    console.log("Button clicked");
    window.location.href = "../html/admin.html";
});

//old method 
// document.getElementById("adminBtn").onclick = function(){
//     console.log("Button Clicked");
//     window.location.href = "../html/admin.html";
// }