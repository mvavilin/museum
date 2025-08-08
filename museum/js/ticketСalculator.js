export function initTicketCalculator() {
    // Калькулятор продажи билетов в секции Tickets
    const prices = { permanent: { basic: 20, senior: 10 }, temporary: { basic: 25, senior: 12.5 }, combined: { basic: 40, senior: 20 }, };
    const adultCount = document.getElementById('adultCount');
    const seniorCount = document.getElementById('seniorCount');
    const totalSum = document.querySelector('.form__total');
    const ticketRadios = document.querySelectorAll('.ticket-type__input');

    function calculateTotal() {
        const selectedType = document.querySelector('.ticket-type__input:checked').id;
        let ticketType;
        if (selectedType === 'radioPermanent') ticketType = 'permanent';
        if (selectedType === 'radioTemporary') ticketType = 'temporary';
        if (selectedType === 'radioCombined') ticketType = 'combined';
        const basicPrice = prices[ticketType].basic;
        const seniorPrice = prices[ticketType].senior;
        const total = (adultCount.value * basicPrice) + (seniorCount.value * seniorPrice);
        totalSum.textContent = total;
        saveToStorage(ticketType, adultCount.value, seniorCount.value, total);
    }
    // Работа с localStorage
    function saveToStorage(type, basicQty, seniorQty, total) {
        localStorage.setItem('ticketData', JSON.stringify({ type, basicQty, seniorQty, total }));
    }
    function restoreFromStorage() {
        const saved = JSON.parse(localStorage.getItem('ticketData'));
        if (saved) {
            adultCount.value = saved.basicQty;
            seniorCount.value = saved.seniorQty;
            if (saved.type === 'permanent') document.getElementById('radioPermanent').checked = true;
            if (saved.type === 'temporary') document.getElementById('radioTemporary').checked = true;
            if (saved.type === 'combined') document.getElementById('radioCombined').checked = true;
            totalSum.textContent = saved.total;
        }
    }

    // Инициализация
    restoreFromStorage();
    calculateTotal();

    // Обработчики кнопок
    ticketRadios.forEach(radio => { radio.addEventListener('change', calculateTotal); });
    document.getElementById('adultIncrementBtn').addEventListener('click', () => {
        adultCount.stepUp();
        calculateTotal();
    });
    document.getElementById('adultDecrementBtn').addEventListener('click', () => {
        adultCount.stepDown();
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
}