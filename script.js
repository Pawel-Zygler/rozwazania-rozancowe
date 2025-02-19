document.addEventListener("DOMContentLoaded", function () {
    generateCalendar();
});

function generateCalendar() {
    const calendar = document.getElementById("calendar");
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
            if (reflection) {
                document.getElementById("reflection-content").innerText = reflection.title;
                document.getElementById("author").innerText = reflection.author.name;
                document.getElementById("bio").innerText = reflection.author.bio;
                document.getElementById("link").href = reflection.author.link;
            } else {
                document.getElementById("reflection-content").innerText = "Brak rozważania na ten dzień.";
                document.getElementById("author").innerText = "";
                document.getElementById("bio").innerText = "";
                document.getElementById("link").href = "#";
            }
        })
        .catch(error => console.error("Błąd ładowania JSON:", error));
}
