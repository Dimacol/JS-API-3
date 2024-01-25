const photoBox = document.getElementById('photo_box');
const photoName = document.getElementById('photo_name');
const photographerName = document.getElementById('photograph');
const likeBtn = document.getElementById('likebutton');
const likesCounter = document.getElementById('likes_counter');
let page = Math.floor(Math.random() * 100) + 1;

async function fetchPhoto() {
    const apiKey = 'zozkYz9bSBfOhc9v8opF9NH7faSnDbi3Qs7NUaILdic';
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=1&client_id=${apiKey}`
        );
        const photo = await response.json();
        return photo;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий: ', error);
        return [];
    }
}

async function loadMorePhoto() {
    const photo = await fetchPhoto();
    const photoElem = photo[0].urls.small;
    const imgElem = document.createElement('img');
    imgElem.src = photoElem;
    photoBox.appendChild(imgElem);

    const photoNameElem = photo[0].alt_description;
    const info1 = document.createElement('h3');
    info1.textContent = `${photoNameElem}`;
    photoName.appendChild(info1);

    const nameUserElem = photo[0].user.first_name;
    const info2 = document.createElement('h3');
    info2.textContent = `${nameUserElem}`;
    photographerName.appendChild(info2);

    let likeElem = photo[0].likes;
    likesCounter.textContent = `${likeElem}`;
    likeBtn.addEventListener('click', () => {
        likeElem = likeElem + 1;
        likesCounter.textContent = `${likeElem}`;
    });
}

loadMorePhoto(page);