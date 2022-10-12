const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_tQMtpmRIXAoK5NSdVS3KkfizZ9XVBXGPvWA3S0hvz7LWsHP8HPqg6UVA0LDhO0Cd';

const API_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error')

async function loadRandomCats() {

    const { data, status } = await api.get('/images/search?limit=4');
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');

        const button1 = document.getElementById('button1F');
        const button2 = document.getElementById('button2F');
        const button3 = document.getElementById('button3F');
        const button4 = document.getElementById('button4F');


        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;

        console.log(data);

        button1.onclick = () => saveFavouriteCat(data[0].id);
        button2.onclick = () => saveFavouriteCat(data[1].id);
        button3.onclick = () => saveFavouriteCat(data[2].id);
        button4.onclick = () => saveFavouriteCat(data[3].id);
    }
}
async function loadFavoritesCats() {
    const { data, status } = await api.get('/favourites');

    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    }
    else {
        const section = document.getElementById('favouriteCat');
        section.innerHTML = "";

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');

            img.src = cat.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}
async function saveFavouriteCat(id) {
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });
    console.log('Save')
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    }
    else {
        console.log('Gatito guardado en favoritos')
        loadFavoritesCats();
    }
}
async function deleteFavouriteCat(id) {
    const { data, status } = await api.delete(`/favourites/${id}`);
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log(`Gatito ${id} eliminado de favoritos`)
        loadFavoritesCats();
    }
}
async function uploadCatPhoto() {
    const form = document.getElementById('uploadForm')
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_tQMtpmRIXAoK5NSdVS3KkfizZ9XVBXGPvWA3S0hvz7LWsHP8HPqg6UVA0LDhO0Cd',
        },
        body: formData,
    })
    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
        console.log({ data })
    } else {
        console.log('Foto de gatito subida :)')
        console.log({ data })
        console.log(data.url)
        saveFavouriteCat(data.id);
    }
}
loadRandomCats();
loadFavoritesCats();

