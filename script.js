document.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const currentDay = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    const calendarTable = document.getElementById("calendarTable");
    let row = document.createElement("tr");

    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement("td");
        cell.textContent = i;
        
        if (i === currentDay) {
            cell.classList.add("today");
        }

        cell.addEventListener("click", () => loadReflection(i));
        row.appendChild(cell);

        if (i % 7 === 0 || i === daysInMonth) {
            calendarTable.appendChild(row);
            row = document.createElement("tr");
        }
    }
});

function loadReflection(day) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let reflection = data.find(item => item.day === day);
            if (reflection) {
                document.getElementById("reflection-title").innerText = reflection.title;
                document.getElementById("reflection-content").innerText = reflection.content;
                document.getElementById("reflection-author").innerText = "Autor: " + reflection.author;

                let linksContainer = document.getElementById("reflection-links");
                linksContainer.innerHTML = "";
                if (reflection.links.length > 0) {
                    reflection.links.forEach(link => {
                        let a = document.createElement("a");
                        a.href = link;
                        a.innerText = "Zobacz więcej";
                        a.target = "_blank";
                        a.style.display = "block";
                        linksContainer.appendChild(a);
                    });
                }
            } else {
                document.getElementById("reflection-title").innerText = "Brak rozważania na ten dzień.";
                document.getElementById("reflection-content").innerText = "";
                document.getElementById("reflection-author").innerText = "";
                document.getElementById("reflection-links").innerHTML = "";
            }
        })
        .catch(error => console.error("Błąd ładowania JSON:", error));
}