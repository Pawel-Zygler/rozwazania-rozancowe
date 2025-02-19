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

    const reflections = {
        1: { title: "Tajemnica 1", text: "Opis tajemnicy 1", author: "Jan Kowalski", bio: "Autor duchowych rozważań", link: "https://example.com/1" },
        2: { title: "Tajemnica 2", text: "Opis tajemnicy 2", author: "Maria Nowak", bio: "Pisarz duchowy", link: "https://example.com/2" },
        3: { title: "Tajemnica 3", text: "Opis tajemnicy 3", author: "Ks. Piotr", bio: "Duchowny", link: "https://example.com/3" }
    };

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

    generateCalendar();
});
