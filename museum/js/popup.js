// Калькулятор продажи билетов в форме продажи билетов
// 
const tickets = {
	permanent: {
		id: 'permanent',
		caption: 'Permanent exhibition',
		prices: { basic: 20, senior: 10, },
	},
	temporary: {
		id: 'temporary',
		caption: 'Temporary exhibition',
		prices: { basic: 25, senior: 12.5, },
	},
	combined: {
		id: 'combined',
		caption: 'Combined Admission',
		prices: { basic: 40, senior: 20, },
	},
};
// 
const popup = document.querySelector('.popup');
const popupCont = document.querySelector('.popup__container');
const popupCloseBtn = document.querySelector('.popup__close');
const body = document.querySelector('.body');

export function openPopup() {
	popup.classList.remove('popup--close');
	body.classList.add('body--hidden');
}
function closePopup() {
	body.classList.remove('body--hidden');
	popup.classList.add('popup--close');
}

export function initTicketForm(saveTicketDateToStorage, restoreTicketDateFromStorageToForm, restoreTicketDateFromStorage) {
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
	const basicCountEntry = document.getElementById('basicCountEntry');
	const seniorCountEntry = document.getElementById('seniorCountEntry');

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
				// 
				dropdown.classList.remove('booking__dropdown--active');
				//
				const date = new Date(val);
				const overviewDate = document.querySelector('.overview__date');
				if (isNaN(date.getTime())) {
					outputEl.textContent = 'Date';
					overviewDate.textContent = 'Weekday, Month Day';
				} else {
					outputEl.textContent = new Date(val).toLocaleDateString('ru-RU');
					overviewDate.textContent = date.toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric'
					});
				}
				break;
			case 'time':
				outputEl.textContent = val;
				document.querySelector('.overview__time').textContent = val;
				break;
			case 'ticket-type':
				outputEl.textContent = prices[val].label;
				document.querySelector('.overview__ticket-type').textContent = prices[val].label;
				const ticketData = JSON.parse(localStorage.getItem('ticketData'));
				saveTicketDateToStorage(val, ticketData.basicCount, ticketData.seniorCount, ticketData.basicTotal, ticketData.seniorTotal, ticketData.total);
				calculateTotalForm();
				restoreTicketDateFromStorageToForm();
				break;
		}
	};
	function calculateTotalForm() {
		const selectedTicketType = ticketTypeInput.value;
		const basicPrice = tickets[selectedTicketType].prices.basic;
		const seniorPrice = tickets[selectedTicketType].prices.senior;
		const basicTotal = basicCountEntry.value * basicPrice;
		const seniorTotal = seniorCountEntry.value * seniorPrice;
		const total = basicTotal + seniorTotal;
		document.querySelector('.overview__total-ticket-prices').textContent = total + ' €';
		saveTicketDateToStorage(selectedTicketType, basicCountEntry.value, seniorCountEntry.value, basicTotal, seniorTotal, total);
	}

	dateInputEl.addEventListener('click', () => handleInputClick(dateInput, 'date'));
	timeInputEl.addEventListener('click', () => handleInputClick(timeInput, 'time'));
	ticketTypeInputEl.addEventListener('click', () => handleInputClick(ticketTypeInput, 'ticket-type'));
	dateInput.addEventListener('input', () => handleInput(dateInput.value, 'date', dateInputHeader));
	timeInput.addEventListener('change', () => handleInput(timeInput.value, 'time', timeInputHeader));
	ticketTypeInput.addEventListener('change', () => handleInput(ticketTypeInput.value, 'ticket-type', ticketTypeInputHeader));
	popup.addEventListener('click', e => {
		if (!popupCont.contains(e.target)) {
			closePopup();
			restoreTicketDateFromStorage();
		}
	});
	popupCloseBtn.addEventListener('click', () => {
		closePopup();
		restoreTicketDateFromStorage();
	});

	document.getElementById('basicIncrementBtnEntry').addEventListener('click', () => {
		basicCountEntry.stepUp();
		calculateTotalForm();
		restoreTicketDateFromStorageToForm();
	});
	document.getElementById('basicDecrementBtnEntry').addEventListener('click', () => {
		basicCountEntry.stepDown();
		calculateTotalForm();
		restoreTicketDateFromStorageToForm();
	});
	document.getElementById('seniorIncrementBtnEntry').addEventListener('click', () => {
		seniorCountEntry.stepUp();
		calculateTotalForm();
		restoreTicketDateFromStorageToForm();
	});
	document.getElementById('seniorDecrementBtnEntry').addEventListener('click', () => {
		seniorCountEntry.stepDown();
		calculateTotalForm();
		restoreTicketDateFromStorageToForm();
	});
}


