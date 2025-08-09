
const dateInputEl = document.querySelector('.booking__input-date');
const timeInputEl = document.querySelector('.booking__input-time');
const ticketTypeInputEl = document.querySelector('.booking__input-ticket-type');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const ticketTypeInput = document.getElementById('ticketTypeInput');
const dateInputHeader = document.querySelector('.booking__input-header--date');
const timeInputHeader = document.querySelector('.booking__input-header--time');
const ticketTypeInputHeader = document.querySelector('.booking__input-header--ticket-type');
const today = new Date().toISOString().split('T')[0];
const prices = {
    permanent: { label: 'Permanent exhibition', basic: 20, senior: 10 },
    temporary: { label: 'Temporary exhibition', basic: 25, senior: 12.5 },
    combined: { label: 'Combined Admission', basic: 40, senior: 20 },
};
let dropdown;

dateInput.min = today;
loadTime(9, 18, 30);

function loadTime(start, end, step) {
    for (let h = start; h <= end; h++) {
        for (let m = 0; m < 60; m += step) {
            if (h === end && m > 0) break;
            const hour = String(h).padStart(2, '0');
            const minute = String(m).padStart(2, '0');
            const time = `${hour}:${minute}`;
            const option = document.createElement('option');
            option.classList.add('booking__time-option');
            option.value = time;
            option.textContent = time;
            timeInput.appendChild(option);
        }
    }
}
const handleInputClick = (input, type) => {
    // 
    dropdown = document.querySelector(`.booking__input-icon--${type}-down-arrow`);
    dropdown.classList.toggle('booking__dropdown--active');
    // 
    if (type === 'date') input.showPicker();
};
const handleInput = (val, type, outputEl) => {
    if (!type || !outputEl) return;
    switch (type) {
        case 'date':
            outputEl.textContent = new Date(val).toLocaleDateString('ru-RU');
            // 
            dropdown.classList.remove('booking__dropdown--active');
            // 
            break;
        case 'time':
            outputEl.textContent = val;
            break;
        case 'ticket-type':
            outputEl.textContent = prices[val].label;
            break;
    }
};

dateInputEl.addEventListener('click', () => handleInputClick(dateInput, 'date'));
timeInputEl.addEventListener('click', () => handleInputClick(timeInput, 'time'));
ticketTypeInputEl.addEventListener('click', () => handleInputClick(ticketTypeInput, 'ticket-type'));
dateInput.addEventListener('input', () => handleInput(dateInput.value, 'date', dateInputHeader));
timeInput.addEventListener('change', () => handleInput(timeInput.value, 'time', timeInputHeader));
ticketTypeInput.addEventListener('change', () => handleInput(ticketTypeInput.value, 'ticket-type', ticketTypeInputHeader));