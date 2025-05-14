let apiUrl = "https://682199fa259dad2655afc100.mockapi.io/"

let login_btn = document.getElementById("login-btn");
let login_username = document.getElementById("username-id");
let login_password = document.getElementById("password-id");

login_btn.addEventListener("click", () => {

    login();

})


const login = async () => {
    try {
        const res = await fetch(`${apiUrl}/users`);
        const users = await res.json();

        const userExist = users.find(user => {
            return user.username == login_username.value && user.password == login_password.value
        });

        // console.log(userExist.username);
        localStorage.setItem("username", userExist.username);

        if(!userExist){
            alert("invalid username or password");
            return;
        }

        alert("you are logged in");
        window.location.href = "../index.html";
        
    } catch (error) {
        console.log(error)
    }
}