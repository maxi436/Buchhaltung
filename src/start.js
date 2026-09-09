let umsatzChart;

async function diagrammLaden() {
    const response = await fetch("/monate");

    if (!response.ok) {
        throw new Error("Die Diagrammdaten konnten nicht geladen werden.");
    }

    const daten = await response.json();
    const canvas = document.getElementById("umsatzChart");
    console.log(daten);

    if (umsatzChart) {
        umsatzChart.destroy();
    }

    umsatzChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: daten.labels,
            datasets: [{
                label: "Geld am Monatsende (€)",
                data: daten.values,
                borderWidth: 2,
                pointRadius: 1.5,
                pointHoverRadius: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            animation: false,
            font: {
                family: "Trebuchet MS, sans-serif"
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: "Trebuchet MS, sans-serif"
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: "Trebuchet MS, sans-serif"
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: "Trebuchet MS, sans-serif"
                        }
                    }
                }
            }
        }
    });
}

function back(){
    window.location.href = "/";
}

const form = document.querySelector("#eintrag");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const daten = new FormData(form);

    const response = await fetch("/eintrag", {
        method: "POST",
        body: daten
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    form.reset();
    await diagrammLaden();
});

diagrammLaden().catch((error) => {
    document.querySelector("h1").textContent = error.message;
});