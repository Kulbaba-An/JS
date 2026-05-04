
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});


const slide = document.getElementById('carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots-container');

let counter = 0;
const size = 100; 

images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach(d => d.classList.remove('active-dot'));
    dots[counter].classList.add('active-dot');
}

function goToSlide(index) {
    counter = index;
    slide.style.transform = `translateX(${-size * counter}%)`;
    updateDots();
}

nextBtn.addEventListener('click', () => {
    counter = (counter + 1) % images.length;
    goToSlide(counter);
});

prevBtn.addEventListener('click', () => {
    counter = (counter - 1 + images.length) % images.length;
    goToSlide(counter);
});


setInterval(() => {
    nextBtn.click();
}, 6000);