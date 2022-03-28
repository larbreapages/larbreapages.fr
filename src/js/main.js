import 'zenscroll';
import L from 'leaflet';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

console.log('Welcome to larbreapages.fr');

// Move menu during scroll
const getYPosition = el => el.getBoundingClientRect().top + window.scrollY;

const scrollEvent = () => {
    const scrollpos = window.scrollY;

    document.querySelectorAll('section').forEach((el) => {
        const id = el.getAttribute('id');

        if (scrollpos >= (getYPosition(document.querySelector(`#${id}`)) - document.querySelector('.nav').offsetHeight)) {
            if(document.querySelector(`a[href="#${id}"]`)){
                document.querySelector(`a[href="#${id}"]`).classList.add('is-active');
                document.querySelectorAll(`.nav a:not([href="#${id}"])`).forEach(e => e.classList.remove('is-active'));
            }
            let elButton = document.querySelector('#workshop-booking button')
            if(elButton !== null){
                if(id == "workshops"){
                    elButton.classList.add('animate');
                } else {
                    elButton.classList.remove('animate')
                }
            }
        }
    });

    if (scrollpos > document.querySelector('.nav').offsetHeight) {
        document.querySelector('.nav').classList.add('nav-scrolled');
    } else {
        document.querySelector('.nav').classList.remove('nav-scrolled');
    }
};

window.addEventListener('scroll', scrollEvent);
scrollEvent();

// Tab
const selectTab = (tab) => {
    document.querySelectorAll('#gallery div').forEach(el => el.classList.add('hide'));
    document.querySelectorAll(`.${tab}`).forEach(el => el.classList.remove('hide'));
    document.querySelectorAll('.tabs ul li').forEach(el => el.classList.remove('is-active'));
};

document.querySelectorAll('#portfolio .tabs ul li').forEach(e => e.addEventListener('click', () => {
    const currentTab = e.classList[0];
    selectTab(currentTab);
    e.classList.add('is-active');
}));

// Iframe
window.onload = () => {
    const defer = document.getElementsByTagName('iframe');
    for (let i = 0; i < defer.length; i += 1) {
        if (defer[i].getAttribute('data-src')) {
            defer[i].setAttribute('src', defer[i].getAttribute('data-src'));
        }
    }
};

// Map

delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const mymap = L.map('mapid').setView([48.68652142003192, 6.171032277464243], 16);

L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 19,
    id: 'mapbox.streets',
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const marker = L.marker([48.68652142003192, 6.171032277464243]).addTo(mymap);

marker.bindPopup("<b>L'Arbre à Pages</b>").openPopup();
