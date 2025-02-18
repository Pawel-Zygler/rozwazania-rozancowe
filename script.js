document.addEventListener("DOMContentLoaded", function() {
    const dniTygodnia = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    const dzisiaj = new Date().getDay();
    
    const daysContainer = document.getElementById("days");

    dniTygodnia.forEach((dzien, index) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = dzien;
        
        if (index === dzisiaj) {
            dayElement.classList.add("today");
        }

        dayElement.addEventListener("click", () => loadReflection(dzien));
        daysContainer.appendChild(dayElement);
    });

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            loadReflection(dniTygodnia[dzisiaj], data);
        })
        .catch(error => console.error("Błąd wczytywania danych:", error));
});

function loadReflection(dzien, data) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            if (data[dzien]) {
                document.getElementById("reflection").innerHTML = `
                    <h2>${data[dzien].tajemnica}</h2>
                    <p>${data[dzien].rozwazanie}</p>
                `;

                document.getElementById("author").innerHTML = `
                    <h3>Autor: ${data[dzien].autor.imie}</h3>
                    <p>${data[dzien].autor.bio}</p>
                    <a href="${data[dzien].autor.link}" target="_blank">Więcej</a>
                `;
            }
        });
}