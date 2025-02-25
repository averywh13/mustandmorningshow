let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const events = JSON.parse(localStorage.getItem("schedule")) || {}; // Load events from localStorage or initialize empty

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Function to save events to localStorage
function saveEvents() {
    localStorage.setItem("schedule", JSON.stringify(events));
}

// Function to generate the calendar
function generateCalendar(month, year) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";
    document.getElementById("monthYear").innerText = `${monthNames[month]} ${year}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekDays.forEach(day => {
        let dayHeader = document.createElement("div");
        dayHeader.classList.add("day-header");
        dayHeader.innerText = day;
        calendar.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("div");
        emptyCell.classList.add("day");
        calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.innerText = day;
        const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Check if there's an event for this day
        if (events[dateString]) {
            // Add event indicator (dot) in the top-right corner of the cell
            let eventIndicator = document.createElement("div");
            eventIndicator.classList.add("event-indicator");
            dayCell.appendChild(eventIndicator);

            // Display the events on the day
            events[dateString].forEach((event, index) => {
                let eventElement = document.createElement("div");
                eventElement.classList.add("event");
                eventElement.innerHTML = `
                    ${event}
                    <button class="close-btn" onclick="removeEvent('${dateString}', ${index})">&times;</button>
                `;
                dayCell.appendChild(eventElement);
            });
        }

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add("today");
        }
        dayCell.dataset.date = dateString;
        calendar.appendChild(dayCell);
    }
}

// Function to handle previous month navigation
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

// Function to handle next month navigation
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

// Function to add a new event
function addEvent() {
    const date = document.getElementById("eventDate").value;
    const eventText = document.getElementById("eventText").value;
    if (!date || !eventText) {
        alert("Please select a date and enter an event description.");
        return;
    }

    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(eventText);

    // Save the updated events to localStorage
    saveEvents();

    // Update the calendar UI
    generateCalendar(currentMonth, currentYear);
}

// Function to remove an event
function removeEvent(date, index) {
    // Remove the event at the specified index for the given date
    events[date].splice(index, 1);

    // If no events are left for this date, delete the date entry
    if (events[date].length === 0) {
        delete events[date];
    }

    // Save the updated events to localStorage
    saveEvents();

    // Update the calendar UI
    generateCalendar(currentMonth, currentYear);
}

// Initial setup
generateCalendar(currentMonth, currentYear);