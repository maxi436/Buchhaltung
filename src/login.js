const form = document.querySelector("#login");
const ausgabe = document.querySelector("#ausgabe");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const daten = new FormData(form);

    const response = await fetch("/login", {
        method: "POST",
        body: daten
    });

    const ergebnis = await response.text();

    if (ergebnis === "true") {
        window.location.href = "/start";
    } else {
        window.location.href = "/";
    }

    ausgabe.textContent = ergebnis;
});

const passwortInput = document.querySelector('input[name="passwort"]');

function show() {
    if (passwortInput.type === "password") {
        passwortInput.type = "text";
    } else {
        passwortInput.type = "password";
    }
}