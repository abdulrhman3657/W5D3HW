let apiUrl = "https://682199fa259dad2655afc100.mockapi.io/"

let signup_btn = document.getElementById("signup-btn");
let signup_username = document.getElementById("username-id");
let signup_password = document.getElementById("password-id");
let err_msg = document.getElementById("err-msg");


signup_btn.addEventListener("click", () => {
    singUp();
})

const singUp = async () => {
    try {

        if(signup_username.value == "" || signup_password.value == "") {
            alert("username or password must not be empty")
            return;
        }

        console.log(signup_username.value)

        const res = await fetch(`${apiUrl}/users`);
        const users = await res.json();
        const userExist = users.find((user) => {
            return user.username == signup_username.value
        });

        if(userExist){
            alert("user already exists");
            throw new Error("user already exists");
        }

        console.log(signup_password.value)

        const response = await fetch(`${apiUrl}/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({username: signup_username.value, password: signup_password.value}),
        });
        
        localStorage.setItem("username", signup_username.value);
        localStorage.setItem("password", signup_password.value);

        alert("you have signed up successfully")

        window.location.href = "./login.html"


    } catch (error) {
        console.log(error)
    }
}