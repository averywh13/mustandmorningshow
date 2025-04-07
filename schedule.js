let currentDate = new Date(); // Use the current date
const letterDays = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// Start with a reference date
let referenceDate = new Date(2025, 2, 31); // March 31, 2025
let referenceLetterDayIndex = 2; // 'C' day on March 31

function getLetterDayIndex(targetDate) {
    let letterDayIndex = referenceLetterDayIndex;
    let tempDate = new Date(referenceDate);
    
    while (tempDate.getTime() !== targetDate.getTime()) {
        const dayOfWeek = tempDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            if (tempDate < targetDate) {
                letterDayIndex = (letterDayIndex + 1) % letterDays.length;
                tempDate.setDate(tempDate.getDate() + 1);
            } else {
                letterDayIndex = (letterDayIndex - 1 + letterDays.length) % letterDays.length;
                tempDate.setDate(tempDate.getDate() - 1);
            }
        } else {
            tempDate.setDate(tempDate.getDate() + (tempDate < targetDate ? 1 : -1));
        }
    }
    return letterDayIndex;
}

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentDate);
    calendarDays.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= lastDate; day++) {
        const currentDateObj = new Date(year, month, day);
        const dayOfWeek = currentDateObj.getDay();
        let className = "day";

        if (dayOfWeek !== 6 && dayOfWeek !== 0) {
            let letterDayIndex = getLetterDayIndex(currentDateObj);
            className += " letter-day";
            calendarDays.innerHTML += `<div class="${className}"><span>${letterDays[letterDayIndex]}</span>${day}</div>`;
        } else {
            calendarDays.innerHTML += `<div class="${className}">${day}</div>`;
        }
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

renderCalendar();
