let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function generateCalendar(month, year) {
    const monthYear = document.getElementById("monthYear");
    const calendarBody = document.getElementById("calendar-body");
    
    monthYear.innerHTML = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
    calendarBody.innerHTML = "";
    
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let row = document.createElement("div");
    row.className = "d-flex";
    
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("div")).className = "day";
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        let cell = document.createElement("div");
        cell.className = "day";
        cell.textContent = day;
        
        if (year === date.getFullYear() && month === date.getMonth() && day === date.getDate()) {
            let span = document.createElement("span");
            span.className = "current-day";
            span.textContent = day;
            cell.innerHTML = "";
            cell.appendChild(span);
        }
        
        row.appendChild(cell);
        if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
            calendarBody.appendChild(row);
            row = document.createElement("div");
            row.className = "d-flex";
        }
    }
}

document.getElementById("prev").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById("next").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

generateCalendar(currentMonth, currentYear);