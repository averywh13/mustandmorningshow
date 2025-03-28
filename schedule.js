let currentDate = new Date(2025, 2, 28); // March 28, 2025, Friday
    const letterDays = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Rotating letter days

    // Start with March 28, 2025, as a B day
    let startingLetterDayIndex = 1; // March 28, 2025, Friday is a 'B' day

    // Function to render the calendar
    function renderCalendar() {
        const monthYear = document.getElementById("monthYear");
        const calendarDays = document.getElementById("calendarDays");
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Update the month and year in the header
        monthYear.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentDate);

        // Clear the calendar days
        calendarDays.innerHTML = "";

        // Empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarDays.innerHTML += '<div></div>';
        }

        // Set the letter day starting index based on March 28, 2025
        let letterDayIndex = startingLetterDayIndex;

        // Loop through all the days in the current month
        for (let day = 1; day <= lastDate; day++) {
            const currentDateObj = new Date(year, month, day);
            const dayOfWeek = (firstDay + day - 1) % 7; // Day of the week for this day
            let className = "day";

            if (dayOfWeek !== 6 && dayOfWeek !== 0) { // Skip weekends (Saturday=6, Sunday=0)
                // Show letter day for weekdays
                className += " letter-day";
                calendarDays.innerHTML += `<div class="${className}"><span>${letterDays[letterDayIndex]}</span>${day}</div>`;
                
                // Increment letter day index for the next weekday
                letterDayIndex = (letterDayIndex + 1) % letterDays.length;
            } else {
                // Weekends are just dates without letter days
                calendarDays.innerHTML += `<div class="${className}">${day}</div>`;
            }
        }
    }

    // Move to previous month
    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }

    // Move to next month
    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }

    // Initialize the calendar rendering
    renderCalendar();