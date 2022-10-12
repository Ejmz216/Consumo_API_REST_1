const KEY = 'live_tQMtpmRIXAoK5NSdVS3KkfizZ9XVBXGPvWA3S0hvz7LWsHP8HPqg6UVA0LDhO0Cd';
const API = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_FAV = 'https://api.thecatapi.com/v1/favourites';
const API_DEL = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_UPL = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error')

async function loadRandomCats() {
    const res = await fetch(API);
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const button1 = document.getElementById('button1F');
        const button2 = document.getElementById('button2F');

        img1.src = data[0].url;
        img2.src = data[1].url;

        button1.onclick = () => saveFavouriteCat(data[0].id);
        button2.onclick = () => saveFavouriteCat(data[1].id);
    }
}
async function loadFavoritesCats() {
    const res = await fetch(API_FAV, {
        method: 'GET',
        headers: { 'x-api-key': KEY }
    });
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
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
    const res = await fetch(API_FAV, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': KEY
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
    else {
        console.log('Gatito guardado en favoritos')
        loadFavoritesCats();
    }
}
async function deleteFavouriteCat(id) {
    const res = await fetch(API_DEL(id), {
        method: 'DELETE',
        headers: { 'x-api-key': KEY }
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log(`Gatito ${id} eliminado de favoritos`)
        loadFavoritesCats();
    }
}
async function uploadCatPhoto() {
    const form = document.getElementById('uploadForm')
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(API_UPL, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY': KEY,
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