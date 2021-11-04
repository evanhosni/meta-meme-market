const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#signup-username").value.trim()
    const email = document.querySelector("#signup-email").value.trim()
    const password1 = document.querySelector("#password1").value.trim()
    const password2 = document.querySelector("#password2").value.trim()
    const state_identification = document.querySelector("#state-id").value.trim()
    const bank_name = document.querySelector("#bank-name").value.trim()
    const account_number = document.querySelector("#account-number").value.trim()
    const routing_number = document.querySelector("#bank-routing").value.trim()

    console.log(username, email, state_identification, bank_name, password1, password2, account_number, routing_number)

    console.log(routing_number.length)

    if (username && email && state_identification && bank_name && password1 && password2 && account_number && routing_number) {
        if (password1 !== password2) {
            alert("Passwords must match!")
        } else if (routing_number.length != 9) {
            alert("Your routing number must be 9 digits.")
        } else {
            fetch("/api/users/create", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password1,
                    state_identification: state_identification,
                    bank_name: bank_name,
                    account_number: account_number,
                    routing_number: routing_number
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    console.log(res)
                    location.href = "/profile"
                } else {
                    console.log(res)
                    console.log(res.err)
                    alert("Username, email, or ID already used.")
                    alert(res.err)
                }
            })
        }
    } else {
        alert("something unaccounted for went wrong")
    }

})
