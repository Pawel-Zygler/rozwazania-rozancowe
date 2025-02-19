document.addEventListener("DOMContentLoaded", function () {
    const calendarElement = document.getElementById("calendar");
    const reflectionContent = document.getElementById("reflection-content");
    const authorElement = document.getElementById("author");
    const bioElement = document.getElementById("bio");
    const linkElement = document.getElementById("link");

    if (!calendarElement) {
        console.error("Błąd: Brak elementu #calendar w HTML!");
        return;
    }

    let reflections = {}; // Tu będą przechowywane dane z JSON

    // Funkcja do pobrania danych z JSON
    function loadReflections() {
        fetch("data.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Błąd ładowania danych");
                }
                return response.json();
            })
            .then(data => {
                reflections = data;
                generateCalendar(); // Po załadowaniu danych generujemy kalendarz
            })
            .catch(error => console.error("Błąd: ", error));
    }

    function generateCalendar() {
        calendarElement.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
            let dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = i;

            dayElement.addEventListener("click", function () {
                document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
                dayElement.classList.add("selected");
                loadReflection(i);
            });

            calendarElement.appendChild(dayElement);
        }
    }

    function loadReflection(day) {
        if (reflections[day]) {
            reflectionContent.innerText = reflections[day].title + ": " + reflections[day].text;
            authorElement.innerText = reflections[day].author;
            bioElement.innerText = reflections[day].bio;
            linkElement.href = reflections[day].link;
            linkElement.style.display = "inline";
        } else {
            reflectionContent.innerText = "Brak rozważania na ten dzień.";
            authorElement.innerText = "";
            bioElement.innerText = "";
            linkElement.style.display = "none";
        }
    }

    loadReflections(); // Na start ładuje dane z JSON
});
