/*Используя регулярные выражения сделать проверку на валидность gmail почты внутри проекта. Вёрстка уже есть в проекте, надо только добавить фукнционал

Правильный формат электронного адреса состоит из 4 частей:
локальной части, символа "@", точки и доменного имени.
Например, в адресе электронной почты "info@bouncer.com",
"info" представляет собой локальную часть, "@" разделяет локальную часть и доменное имя, затем идет точка,
а "bouncer" - это доменное имя.

Ограничения по длине
Имя пользователя может состоять из 6–30 знаков и содержать буквы, цифры и символы.

Специальные символы
Имя пользователя может содержать буквы латинского алфавита (a–z), цифры (0–9) и точки (.).
Запрещено использовать амперсанд (&), знаки равенства (=) и сложения (+), скобки (<>), запятую (,), символ подчеркивания (_), апостроф ('), дефис (-) и несколько точек подряд.
Имя пользователя может начинаться и заканчиваться любым разрешенным символом, кроме точки (.). - это правила создания э.почты gmail
 
Используя рекурсию необходимо заставить маленький блок двигаться по родительскому блоку вправо. И изменяйте параметр позиции малого блока (.style.left=${переменная}px).  
Нужно чтобы маленький блок подвинулся слева на право внутри большого блока и остановился. Вёрстка уже есть в самом проекте.
 
Отправить мне проект в который вы добавили ваше ДЗ через github (оживляем наш проект)*/

// HW_1
const $gmailInput = document.querySelector('#gmail_input');
const $gmailButton = document.querySelector('#gmail_button');
const $gmailSpan = document.querySelector('#gmail_result');

const regExp = /^(?!.*\.{2,})[a-zA-Z\d][a-zA-Z\d\.]{4,28}[a-zA-Z\d]@(gmail\.com|mail\.ru)$/;
//^(?!.*\.{2,}) — отрицательное опережающее утверждение, гарантирует отсутствие двух+ точек подряд. Если указанная в скобках часть найдена, регулярное выражение вернет false
// .* - означает "ноль или более любых символов

$gmailButton.onclick = () => {
    if(regExp.test($gmailInput.value)) {
        $gmailSpan.innerHTML = "Success";
        $gmailSpan.style.color = "green";
    } else {
        $gmailSpan.innerHTML = "Failed";
        $gmailSpan.style.color = "red";
    };
};

//HW_2
const $parentBlockWidth = document.querySelector('.parent_block').clientWidth; // вернёт длину (width) родительского квадратика, которую видит пользователь, а родная ширина offsetWidth
const $parentBlockHeight = document.querySelector('.parent_block').clientHeight; // вернёт длину (width) родительского квадратика, которую видит пользователь, а родная ширина offsetHeight
const $childBlock = document.querySelector('.child_block');

const moveBlock = (num, num2) => {
    if(num <= $parentBlockWidth - $childBlock.clientWidth) {
        $childBlock.style.left = `${num}px`;
        requestAnimationFrame(() => moveBlock(num + 3, num2));
    } else if (num > $parentBlockWidth - $childBlock.clientWidth && num2 <= $parentBlockHeight - $childBlock.clientHeight) {
        $childBlock.style.top = `${num2}px`;
        requestAnimationFrame(() => moveBlock(num, num2 + 3));
    }
};
moveBlock(1, 1);





// фиксануть баг с быстрым нажатием start и сделать фулл квадрат полностью бесконечно