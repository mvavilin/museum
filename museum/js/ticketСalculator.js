// Калькулятор продажи билетов в секции Tickets
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
const basicCount = document.getElementById('basicCount');
const seniorCount = document.getElementById('seniorCount');
const totalSum = document.querySelector('.form__total');

// Работа с localStorage
export function restoreTicketDateFromStorage() {
	const ticketData = JSON.parse(localStorage.getItem('ticketData'));
	if (ticketData) {
		basicCount.value = ticketData.basicCount;
		seniorCount.value = ticketData.seniorCount;
		document.getElementById(ticketData.type).checked = true;
		totalSum.textContent = ticketData.total;
	}
}
export function saveTicketDateToStorage(type, basicCount, seniorCount, basicTotal, seniorTotal, total) {
	localStorage.setItem('ticketData', JSON.stringify({ type, basicCount, seniorCount, basicTotal, seniorTotal, total }));
}
export function restoreTicketDateFromStorageToForm() {
	const ticketData = JSON.parse(localStorage.getItem('ticketData'));
	if (ticketData) {
		document.querySelector('.booking__input-header--ticket-type').textContent = tickets[ticketData.type].caption;
		document.querySelector('.overview__ticket-type').textContent = tickets[ticketData.type].caption;
		document.getElementById('ticketTypeInput').value = ticketData.type;
		document.querySelector('.entry-ticket__basic-count').textContent = tickets[ticketData.type].prices.basic + ' €';
		document.querySelector('.entry-ticket__senior-count').textContent = tickets[ticketData.type].prices.senior + ' €';
		document.querySelector('.entry-ticket__basic-cost').value = ticketData.basicCount;
		document.querySelector('.entry-ticket__senior-cost').value = ticketData.seniorCount;
		document.querySelector('.overview__basic-count').textContent = ticketData.basicCount;
		document.querySelector('.overview__senior-count').textContent = ticketData.seniorCount;
		document.querySelector('.overview__basic-cost').textContent = tickets[ticketData.type].prices.basic + ' €';
		document.querySelector('.overview__senior-cost').textContent = tickets[ticketData.type].prices.senior + ' €';
		document.querySelector('.overview__basic-ticket-prices').textContent = ticketData.basicTotal + ' €';
		document.querySelector('.overview__senior-ticket-prices').textContent = ticketData.seniorTotal + ' €';
		document.querySelector('.overview__total-ticket-prices').textContent = ticketData.total + ' €';
	}
}

export function initTicketCalculator(openPopup) {
	const ticketRadios = document.querySelectorAll('.ticket-type__input');
	const openPopupBtn = document.getElementById('buyNowBtn');

	function calculateTotal() {
		const selectedTicketType = document.querySelector('.ticket-type__input:checked').id;
		const basicPrice = tickets[selectedTicketType].prices.basic;
		const seniorPrice = tickets[selectedTicketType].prices.senior;
		const basicTotal = basicCount.value * basicPrice;
		const seniorTotal = seniorCount.value * seniorPrice;
		const total = basicTotal + seniorTotal;
		totalSum.textContent = total;
		saveTicketDateToStorage(selectedTicketType, basicCount.value, seniorCount.value, basicTotal, seniorTotal, total);
	}

	// Инициализация
	restoreTicketDateFromStorage();
	calculateTotal();

	// Обработчики кнопок
	ticketRadios.forEach(radio => radio.addEventListener('change', () => calculateTotal()));
	document.getElementById('basicIncrementBtn').addEventListener('click', () => {
		basicCount.stepUp();
		calculateTotal();
	});
	document.getElementById('basicDecrementBtn').addEventListener('click', () => {
		basicCount.stepDown();
		calculateTotal();
	});
	document.getElementById('seniorIncrementBtn').addEventListener('click', () => {
		seniorCount.stepUp();
		calculateTotal();
	});
	document.getElementById('seniorDecrementBtn').addEventListener('click', () => {
		seniorCount.stepDown();
		calculateTotal();
	});
	openPopupBtn.addEventListener('click', () => {
		restoreTicketDateFromStorageToForm();
		openPopup();
	});
}