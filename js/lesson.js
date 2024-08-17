// PHONE BLOCK
const $phoneInput = document.querySelector('#phone_input');
const $phoneButton = document.querySelector('#phone_button');
const $phoneSpan = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/ // {2} \d в количестве 2шт. $ - ограничение

$phoneButton.onclick = () => {
    if (regExp.test($phoneInput.value)) {
        $phoneSpan.innerHTML = "OK";
        $phoneSpan.style.color = "green";
    } else {
        $phoneSpan.innerHTML = "NOT OK";
        $phoneSpan.style.color = "red";
    };
};



// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');

// console.log(tabContentBlocks);

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    });
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active')
};

hideTabContent();
showTabContent();

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((item, index) => {
            if (event.target === item) {
                manualSwitch(index);
            };
        });
    };
};

// HW
let currentIndex = 0;
let autoNextTimeout = null;

const manualSwitch = (i) => {
    clearTimeout(autoNextTimeout);
    showTab(i);
    autoNext();
};

const showTab = (i) => {
    currentIndex = i;
    hideTabContent();
    showTabContent(i);
};

const autoNext = () => {
    autoNextTimeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % 5; // Остаток от деления на 5 = 0, типо если 4+1=5
        showTab(currentIndex);
        autoNext();
    }, 7500);
};

autoNext()

// CONVERTER
const $somInput = document.querySelector('#som');
const $kztInput = document.querySelector('#kzt');
const $rubInput = document.querySelector('#rub');
const $usdInput = document.querySelector('#usd');
const $eurInput = document.querySelector('#eur');
const $gbpInput = document.querySelector('#gbp');

const inputs = [$somInput, $kztInput, $rubInput, $usdInput, $eurInput, $gbpInput];

/* $somInput.addEventListener('input', () => {
    просто не забыть что так можно
}); */

// В одну сторону
// $somInput.oninput = () => { // срабатывает при любом изменении поля input
//     const request = new XMLHttpRequest();
//     request.open('GET', '../data/converter.json');
//     request.setRequestHeader('Content-type', 'application/json');
//     request.send();

//     request.onload = () => {
//         const data = JSON.parse(request.result);
//         // console.log(request.result);
//         $usdInput.value = ($somInput.value / data.usd).toFixed(3); // toFixed округлят до значения в скобках после запятой
//     }
// }

/*

// В обе стороны
const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.result);
            if (element.id === 'som') { // проверка в каком input печатают
                targetElement.value = (element.value / data.usd).toFixed(3);
            } else if (element.id === 'usd') { // проверка в каком input печатают
                targetElement.value = (element.value * data.usd).toFixed(3);
            }
            element.value === '' && (targetElement.value = ''); // если левая часть true то сработает то что в скобках иначе - нет
        };
    };
};
converter($somInput, $usdInput); // чтобы не юзать двойной вызов можно использовать массив
converter($usdInput, $somInput);

// KISS - keep it simple, stupid! - Делай проще / DRY / почитать про BEM и SOLID

*/


// юзаем API по уроку "Конвертер валют на JavaScript. Полный урок. Актуальные курсы"

// https://data.fx.kg/api/v1/central - курс по Центральному Банку
// 9fAIn2lklRcQOOUl8wBLrQ6NVFYbMyWAlhTh8Uqb868ed5c1 - KGS - токен

const rates = {};


const token = "9fAIn2lklRcQOOUl8wBLrQ6NVFYbMyWAlhTh8Uqb868ed5c1"

async function getCurrencies() {
    const response = await fetch('https://data.fx.kg/api/v1/central', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    const result = await data;

    rates.USD = result.usd;
    rates.EUR = result.eur;
    rates.GBP = result.gbp;
    rates.RUB = result.rub;
    rates.KZT = result.kzt;
    rates.SOM = 1;

    return rates;
};


getCurrencies().then(() => { // После завершения getCurrencies запустится
    function convertCurrency(inputElement, value) {
        const currency = inputElement.getAttribute('id').toUpperCase();
        const somValue = value * rates[currency];  // Переводим в сомы

        if (inputElement.value !== '') {
            inputs.forEach(input => {
                const targetCurrency = input.getAttribute('id').toUpperCase();

                if (targetCurrency !== currency) {
                    input.value = (somValue / rates[targetCurrency]).toFixed(3);  // Переводим обратно в нужные валюты
                };
            });

        } else { // Дописать чтобы при пустой строке было пусто во всех строках!
            inputs.forEach(input => {
                if (targetCurrency !== currency) {
                    input.value = '';
                };
            });
        };
    };

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                convertCurrency(event.target, value);
            };
        });
    });
});

/*getCurrencies().then((data) => {
    console.log('Данные курсов валют:', data);
    console.log('Объект rates:', rates);
});проверка*/



// CARD-SWITCHER
const $cardBlock = document.querySelector('.card');
const $btn_next = document.querySelector('#btn-next');
const $btn_prev = document.querySelector('#btn-prev');
let cardId = 1;

const getInfo = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(response => response.json())
        .then(data => {
            $cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
            `;
        });
};

getInfo();


$btn_next.onclick = () => {
    // cardId = (cardId >= 1 && cardId < 200) ? cardId + 1 : 1;
    if (cardId >= 1 && cardId < 200) {
        cardId++;
    } else if (cardId >= 200) {
        cardId = 1;
    };

    getInfo();
};

$btn_prev.onclick = () => {
    // cardId = (cardId > 1 && cardId <= 200) ? cardId - 1 : 200;
    if (cardId > 1 && cardId <= 200) {
        cardId--;
    } else if (cardId <= 1) {
        cardId = 200;
    };

    getInfo();
};


// HW_PART_2 Так же сделать отдельный fetch запрос на эту ссылку: 'https://jsonplaceholder.typicode.com/posts' и отобразить данные просто в консоли
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data));