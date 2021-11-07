const loginForm = document.querySelector("#login-form4");

//TODO: collect data from login form, make post request to log in user.  
//TODO: once you get an ok response, redirect to the profile page

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value,
        username:document.querySelector("#username").value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = `/user/${document.querySelector("#username").value}`
        } else {
            alert("trumpet sound")
        }
    })
})