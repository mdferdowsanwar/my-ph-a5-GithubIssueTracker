// Login Functionality
document.getElementById("signIn-btn").addEventListener("click", () => {
    // Get the username
    const inputUsername = document.getElementById("username");
    const username = inputUsername.value;
    // Get the password
    const inputPassword = document.getElementById("password");
    const password = inputPassword.value;
    // Check the username & password
    if(username === "admin" && password === "admin123"){
        alert("Congratulations! you have successfully logged in.");
        window.location.assign("./dashboard.html");
    } else {
        alert("Opps! login failed. Please try again with correct username & password.");
        return;
    }
});