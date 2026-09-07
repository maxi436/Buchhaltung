const form = document.querySelector("#myForm");
const ausgabe = document.querySelector("#ausgabe");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const daten = new FormData(form);

    const response = await fetch("/pruefen", {
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