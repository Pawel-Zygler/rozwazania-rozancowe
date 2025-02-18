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
            if (data[day]) {
                document.getElementById("reflection").innerHTML = `
                    <h2>${data[day].tajemnica}</h2>
                    <p>${data[day].rozwazanie}</p>
                `;

                document.getElementById("author").innerHTML = `
                    <h3>Autor: ${data[day].autor.imie}</h3>
                    <p>${data[day].autor.bio}</p>
                    <a href="${data[day].autor.link}" target="_blank">Więcej</a>
                `;
            } else {
                document.getElementById("reflection").innerHTML = "<p>Brak rozważania na ten dzień.</p>";
                document.getElementById("author").innerHTML = "";
            }
        });
}