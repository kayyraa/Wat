import * as Api from "./api.js";

const UsernameInput = document.querySelector(".Username");
const PasswordInput = document.querySelector(".Password");
const SubmitButton = document.querySelector(".Submit");
const SignInTopbar = document.querySelectorAll(".SignInTopbar");

if (SubmitButton) {
    SubmitButton.addEventListener("click", async () => {
        const Username = UsernameInput.value;
        const Password = PasswordInput.value;

        if (Username && Password) {
            try {
                const User = await Api.Table.Users.GetRow("username", Username);

                if (User && User.data) {
                    if (User.data.password === Password) {
                        localStorage.setItem("User", JSON.stringify(User.data));
                        location.href = "../index.html";
                    } else {
                        alert("Incorrect password. Please try again.");
                    }
                } else {
                    const UserData = {
                        uuid: Api.GenerateUuid(),
                        username: Username,
                        password: Password,
                        timestamp: Math.floor(Date.now() / 1000)
                    };

                    await Api.Table.Users.InsertRow(UserData);
                    localStorage.setItem("User", JSON.stringify(UserData));
                    location.href = "../index.html";
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Username and password cannot be empty.");
        }
    });
} else if (SignInTopbar) {
    if (localStorage.getItem("User")) {
        SignInTopbar.forEach(N => N.remove());
    }
}