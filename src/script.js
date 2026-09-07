async function diagrammLaden() {
    const response = await fetch("/daten");

    if (!response.ok) {
        throw new Error("Die Diagrammdaten konnten nicht geladen werden.");
    }

    const daten = await response.json();
    const canvas = document.getElementById("umsatzChart");

    new Chart(canvas, {
        type: "line",
        data: {
            labels: daten.labels,
            datasets: [{
                label: "Geld am Monatsende (€)",
                data: daten.values,
                borderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 3,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

diagrammLaden().catch((error) => {
    document.querySelector("h1").textContent = error.message;
});

function back(){
    window.location.href = "/";
}