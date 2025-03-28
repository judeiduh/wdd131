// temples.js
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    if (navigation.classList.contains('show')) {
        menuButton.textContent = 'X';
    } else {
        menuButton.textContent = '☰';
    }
});

const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

if (!menuButton.textContent){
    menuButton.textContent = '☰';
}