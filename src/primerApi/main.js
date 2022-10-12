
const API = ' https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_x1UmkZGsQDHCrh0rd8PRN1kPK9uMzHDK15Ge8EvHPkY4N9AUe51xmqfQGwLcXzgn';


document.addEventListener('DOMContentLoaded', change)
async function change() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        const image1 = document.getElementById('img1');
        const image2 = document.getElementById('img2');
        const image3 = document.getElementById('img3');
        image1.src = data[0].url;
        image2.src = data[1].url;
        image3.src = data[2].url;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
const boton = document.getElementById('boton');
boton.onclick = change;



/* fetch(API)
    .then(res => res.json())
    .then(data => {

        const img = document.getElementById('img');
        img.src = data[0].url;
    });

function perform(id) {
    id.innerHTML = "Ooops!";
}  */