document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    
    if (!calendar) {
        console.error("Błąd: Nie znaleziono elementu #calendar.");
        return;
    }

    generateCalendar(calendar);
});

function generateCalendar(calendar) {
    for (let i = 1; i <= 30; i++) {
        let day = document.createElement("div");
        day.classList.add("day");
        day.innerText = i;
        day.onclick = () => loadReflection(i);
        calendar.appendChild(day);
    }
}

function loadReflection(day) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const reflection = data.find(item => item.id === day);
            document.getElementById("reflection-content").innerText = reflection ? reflection.title : "Brak rozważania.";
            document.getElementById("author").innerText = reflection ? reflection.author.name : "";
            document.getElementById("bio").innerText = reflection ? reflection.author.bio : "";
            document.getElementById("link").href = reflection ? reflection.author.link : "#";
        })
        .catch(error => console.error("Błąd ładowania JSON:", error));
}
