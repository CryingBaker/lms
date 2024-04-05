let year = new Date().getFullYear();
let month = new Date().getMonth();

function generateCalendar(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const calendar = document.getElementById('calendar');
    const tbody = calendar.querySelector('tbody');

    tbody.innerHTML = '';

    let currentDate = new Date(startDate); // Create a copy of startDate to avoid modifying it
    currentDate.setDate(1); // Set the date to the 1st of the month

    let startDayOfWeek = currentDate.getDay(); // Get the day of the week for the 1st of the month
    if (startDayOfWeek === 0) startDayOfWeek = 7; // Adjust Sunday to be 7 instead of 0

    let week = 1;

    for (let i = 1; i <= 6; i++) { // Loop over potential 6 weeks
        const row = document.createElement('tr');

        for (let day = 1; day <= 7; day++) {
            const cell = document.createElement('td');

            if ((i === 1 && day < startDayOfWeek) || currentDate > endDate) {
                cell.textContent = ''; // Empty cell for days before the start of the month or after the end
            } else {
                cell.textContent = currentDate.getDate();
                currentDate.setDate(currentDate.getDate() + 1);

                // Add a click event listener to allow users to add events
                cell.addEventListener('click', () => {
                    const eventName = prompt('Enter the name of the event:');
                    const eventDetails = prompt('Enter the details of the event:');

                    // Add the event to the calendar
                    const eventDiv = document.createElement('div');
                    eventDiv.textContent = `${eventName} - ${eventDetails}`;
                    eventDiv.style.backgroundColor = 'yellow';
                    eventDiv.style.padding = '5px';
                    cell.appendChild(eventDiv);
                });
            }

            row.appendChild(cell);
        }

        tbody.appendChild(row);

        if (currentDate > endDate) break; // Break the loop if we've reached the end of the month
    }
}

function prevMonth() {
    if (month === 0) {
        year--;
        month = 11;
    } else {
        month--;
    }
    generateCalendar(year, month);
    document.getElementById('month-value').textContent = new Date(year, month).toLocaleString('default', { month: 'long' });
    document.getElementById('year-value').textContent = year;
}

function nextMonth() {
    if (month === 11) {
        year++;
        month = 0;
    } else {
        month++;
    }
    generateCalendar(year, month);
    document.getElementById('month-value').textContent = new Date(year, month).toLocaleString('default', { month: 'long' });
    document.getElementById('year-value').textContent = year;
}

function selectYear() {
    const yearValue = prompt('Enter the year:');
    if (yearValue && !isNaN(yearValue)) {
        year = parseInt(yearValue);
        month = new Date(year, month).getMonth();
        generateCalendar(year, month);
        document.getElementById('year-value').textContent = year;
        document.getElementById('month-value').textContent = new Date(year, month).toLocaleString('default', { month: 'long' });
    }
}

generateCalendar(year, month);
