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

// CONVERTER - понять как обновлять json по курсу с помощью API
const $usdInput = document.querySelector('#usd');
const $somInput = document.querySelector('#som');

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
//         const data = JSON.parse(request.response);
//         // console.log(request.response);
//         $usdInput.value = ($somInput.value / data.usd).toFixed(3); // toFixed округлят до значения в скобках после запятой
//     }
// }

// В обе стороны
const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            if(element.id === 'som') { // проверка в каком input печатают
                targetElement.value = (element.value / data.usd).toFixed(3);
            } else if (element.id === 'usd') { // проверка в каком input печатают
                targetElement.value = (element.value * data.usd).toFixed(3);
            } /* else if (element.value === '') {
                targetElement.value = '';
            };
            element.value === '' ? targetElement.value === '' : '' */
            element.value === '' && (targetElement.value = ''); // если левая часть true то сработает то что в скобках иначе - нет
        };
    };
};
converter($somInput, $usdInput); // чтобы не юзать двойной вызов можно использовать массив
converter($usdInput, $somInput);

// KISS - keep it simple, stupid! - Делай проще / DRY / почитать про BEM и SOLID