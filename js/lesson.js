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


const token = "TGA3wzZp30LRjY2OYiuQy4NEYfl1754McUBCQ04E4b513c72";

async function getCurrencies() {
    try {
        const response = await fetch('https://data.fx.kg/api/v1/central', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error('No response'); // для проверки, успешен ли запрос, если нет, выбрасывается ошибка
        }

        const data = await response.json();

        rates.USD = data.usd;
        rates.EUR = data.eur;
        rates.GBP = data.gbp;
        rates.RUB = data.rub;
        rates.KZT = data.kzt;
        rates.SOM = 1;

    } catch (error) {
        rates.USD = "87.3231";
        rates.EUR = "95.1036";
        rates.GBP = "110.8733";
        rates.RUB = "1.0323";
        rates.KZT = "0.1940";
        rates.SOM = "1";

        console.error('Слишком много раз использовал API за месяц(макс. 1000 запросов):', error);
    }
    return rates;
}



getCurrencies().then(() => {
    function convertCurrency(inputElement, value) {
        const currency = inputElement.getAttribute('id').toUpperCase();

        if (inputElement.value === '') {
            inputs.forEach(input => {
                if (input !== inputElement) {
                    input.value = '';
                };
            });
            return;
        };

        const somValue = value * rates[currency];

        inputs.forEach(input => {
            const targetCurrency = input.getAttribute('id').toUpperCase();

            if (targetCurrency !== currency) {
                input.value = (somValue / rates[targetCurrency]).toFixed(2);
            };
        });
    };

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                convertCurrency(event.target, value);
            } else {
                inputs.forEach(input => {
                    input.value = '';
                });
            };
        });
    });
});


// getCurrencies().then((data) => {
//     console.log('Данные курсов валют:', data);
//     console.log('Объект rates:', rates);
// });



// CARD-SWITCHER
const $cardBlock = document.querySelector('.card');
const $btn_next = document.querySelector('#btn-next');
const $btn_prev = document.querySelector('#btn-prev');
let cardId = 1;

const getInfo = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`);
        const data = await response.json();
        $cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
        `;
    } catch (error) {
        console.log(error);
    };
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
const smthFunc = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    };
};
smthFunc();

// WEATHER
const $citySearchInput = document.querySelector('.cityName');
// const $searchBtn = document.querySelector('#search');
const $cityName = document.querySelector('.city');
const $cityTemp = document.querySelector('.temp');

const API_KEY = 'e417df62e04d3b1b111abeab19cea714';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

// query params - параметры запроса
// https://www.google.com/search query parametr-->(?q=) js&oq=js&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIGCAEQIxgnMgYIAhAjGCcyDAgDEAAYQxiABBiKBTIMCAQQABhDGIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEHOTg3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
// t °С = 5/9 (t °F - 32)

$citySearchInput.oninput = async () => {
    try {
        const response = await fetch(`${API_URL}?q=${$citySearchInput.value}&appid=${API_KEY}`) // Через интерполяцию с разными переменными грамотней чем вставлять фулл ссылку
        const data = await response.json();
        $cityName.innerHTML = data.name || 'City is not defined!';
        $cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '℃' : '(☞ﾟヮﾟ)☞'  /* + '&deg;' спецсимвол*/
    } catch (error) {
        console.log(error);
    };
};





// optional chaining - опциональная цепочка - ?.
/*
const address = {
    id: 123,
    // location: {
    //     street: 'Ibraimova',
    //     number: 103
    // }
}

console.log(address.location?.street); // выдаст undefined а не ошибку - это лучше
*/