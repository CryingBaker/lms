let year = new Date().getFullYear();
let month = new Date().getMonth();
function generateCalendar(year, month) {
	const startDate = new Date(year, month, 1);
	const endDate = new Date(year, month + 1, 0);

	const calendar = document.getElementById('calendar');
	const tbody = calendar.querySelector('tbody');

	tbody.innerHTML = '';

	let currentDate = startDate;
	let week = 1;

	while (currentDate <= endDate) {
		const row = document.createElement('tr');

		for (let day = 1; day <= 7; day++) {
			if (currentDate > endDate || currentDate < startDate) {
				const cell = document.createElement('td');
				cell.textContent = '';
				row.appendChild(cell);
			} else {
				const cell = document.createElement('td');
				cell.textContent = currentDate.getDate();

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

				row.appendChild(cell);

				if (currentDate.getDay() === 0) {
					week++;
				}
			}

			currentDate.setDate(currentDate.getDate() + 1);
		}

		tbody.appendChild(row);
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