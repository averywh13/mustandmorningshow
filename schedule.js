let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let events = {}; // Store events fetched from schedule.json

// Fetch events from the schedule.json file
async function loadEvents() {
    try {
        let response = await fetch('schedule.json');
        if (response.ok) {
            events = await response.json();
        } else {
            console.error('Failed to load events');
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Save events to the schedule.json file (Simulating POST request for demo)
async function saveEvents() {
    try {
        let response = await fetch('schedule.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(events),
        });

        if (!response.ok) {
            console.error('Failed to save events');
        }
    } catch (error) {
        console.error('Error saving events:', error);
    }
}

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
        let dayOfWeek = (firstDay + day - 1) % 7;
        cell.className = "day";
        cell.textContent = day;

        let eventDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        let isCurrentDay = (year === date.getFullYear() && month === date.getMonth() && day === date.getDate());

        // Add hover effect for weekdays
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            cell.classList.add("weekday");
            let hoverBox = document.createElement("span");
            hoverBox.className = "hover-box";
            hoverBox.textContent = events[eventDate] || "No events";
            cell.appendChild(hoverBox);

            let eventIndicator = document.createElement("div");
            eventIndicator.className = "event-indicator";
            if (events[eventDate]) {
                eventIndicator.style.display = "block";
            }
            cell.appendChild(eventIndicator);

            // Event click handler
            cell.addEventListener("click", () => {
                let newEvent = prompt("Enter event for " + eventDate, events[eventDate] || "");
                if (newEvent !== null) {
                    events[eventDate] = newEvent;
                    hoverBox.textContent = newEvent;
                    eventIndicator.style.display = "block";
                    saveEvents(); // Save events to the schedule.json file
                }
            });
        }

        // Handle the current day with notification and hover effect
        if (isCurrentDay) {
            let span = document.createElement("span");
            span.className = "current-day";
            span.textContent = day;
            cell.innerHTML = ""; // Clear the default text
            cell.appendChild(span);

            // Add hover effect to the current day
            let hoverBox = document.createElement("span");
            hoverBox.className = "hover-box";
            hoverBox.textContent = events[eventDate] || "No events"; // Show event on hover
            cell.appendChild(hoverBox);

            let eventIndicator = document.createElement("div");
            eventIndicator.className = "event-indicator";
            if (events[eventDate]) {
                eventIndicator.style.display = "block";
            }
            cell.appendChild(eventIndicator);

            // Add a notification on the current day
            let notification = document.createElement("div");
            notification.className = "current-day-notification";
            notification.textContent = events[eventDate] ? "" : "No events for today";
            cell.appendChild(notification);
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

// Load events on page load and generate the initial calendar
loadEvents().then(() => generateCalendar(currentMonth, currentYear));
