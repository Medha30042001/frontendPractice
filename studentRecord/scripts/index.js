
document.getElementById("loginBtn").addEventListener("click", ()=>{
    let emailInput = document.getElementById("eml").value.trim();
    let pwdInput = document.getElementById("pwd").value.trim();

    let trueEmail = "admin@gmail.com";
    let truePwd = "admin1234";

    if(emailInput === '' || pwdInput === ''){
        alert("Please enter your email/password");
        return;
    }

    if(emailInput === trueEmail && pwdInput === truePwd){
        alert("Login Success!")
        window.location.href = "../html/dashboard.html";
    }else if(emailInput !== trueEmail && pwdInput === truePwd){
        alert("Invalid Email");
    }else if(emailInput === trueEmail && pwdInput !== truePwd){
        alert("Invalid Password");
    }else{
        alert("Invalid Email and Password");
    }
});