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
            if(event.target === item) {
                hideTabContent();
                showTabContent(index);
            };
        });
    };
};
// 1. lesson js, bug na перепрыгивание. 2 modaljs addeventlistenerscroll