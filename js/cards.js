// person.json
const request = new XMLHttpRequest();
request.open('GET', '../data/person.json');
request.setRequestHeader('Content-type', 'application/json');
request.send();

setTimeout(() => {
    const characters = JSON.parse(request.response);

    const wrapper = document.querySelector('.card_wrapper');
    const userPhoto = 'url("https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/08/1-1024x724.png")';

    characters.forEach(person => {
        personBlock = document.createElement('div');
        personBlock.setAttribute('class', 'person_block');

        personBlock.innerHTML = `
        <div class="person_photo">
            <img src="${person.photo || userPhoto}" alt="${person.name}"/>
        </div>
        <h2>${person.name}</h2>
        <p><h4>Атрибут:</h4> ${person.aspect}</p>
        <p><h4>Информация:</h4> ${person.bio}</p>
        `
        wrapper.append(personBlock)
    });
}, 500)


// any.json
const request_console = new XMLHttpRequest();
request_console.open('GET', '../data/any.json');
request_console.setRequestHeader('Content-type', 'application/json');
request_console.send();

request_console.onload = () => {
    console.log(request_console.response);
}