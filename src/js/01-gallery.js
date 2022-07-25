// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const galleryRef = document.querySelector('.gallery')


const galleryMarkup = galleryItems.map(({preview, original, description})=> {
    return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
}).join('')

galleryRef.innerHTML = galleryMarkup;

galleryRef.addEventListener('click', e => {
    e.preventDefault();
})

let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});