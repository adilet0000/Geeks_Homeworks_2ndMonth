const requestFunction = async () => {
    try {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await request.json();

        const wrapper = document.querySelector('.card_wrapper');
        const userPhoto = 'url("https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/08/1-1024x724.png")';

        await data.forEach(item => {
            personBlock = document.createElement('div');
            personBlock.setAttribute('class', 'person_block');

            personBlock.innerHTML = `
            <div class="cardTitle">
                <h2>${item.title}</h2>
            </div>
            <div class="cardImage">
                <img src="../img/ink.png">
            </div>
            <div class="cardDescription">
                <p>${item.body}</p>
            </div>
            `
            wrapper.append(personBlock)
        });
    } catch (error) {
        console.log(error);
    } finally {
        console.log('qwerty123456');
    };
};
requestFunction();