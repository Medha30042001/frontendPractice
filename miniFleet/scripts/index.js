


document.getElementById("loginBtn").addEventListener("click", ()=>{

    let emailInput = document.getElementById("eml").value.trim();
    let passwordInput = document.getElementById("pwd").value.trim();

    let trueEmail = "admin@gmail.com"
    let truePassword = "admin1234";

    if(emailInput === '' || passwordInput === ''){
        alert("Enter all the fields")
    }
    if(emailInput === trueEmail && passwordInput === truePassword){
        alert("Login Success");
        window.location.href = "../html/admin.html";
    }else if(emailInput !== trueEmail && passwordInput === truePassword){
        alert("Wrong email");
    }else if(emailInput === trueEmail && passwordInput !== truePassword){
        alert("Wrong password");
    }else alert("Both email and password wrong");
})