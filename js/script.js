const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');

function getImagesPerSlide() {
    return window.innerWidth <= 768 ? 1 : 2;
}
const totalImages = images.length;
function getMaxIndex() {
    return Math.ceil(images.length / getImagesPerSlide()) - 1;
}
function getImageWidth() {
    const firstImage = document.querySelector('.carousel-images img');
    return firstImage ? firstImage.offsetWidth + 20 : 340; // largura + margem
}

let currentIndex = 0;

function updateCarousel() {
    const imageWidth = getImageWidth();
    const imagesPerSlide = getImagesPerSlide();
    const offset = -(currentIndex * imageWidth * imagesPerSlide);
    carouselImages.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

const heroSlides = document.querySelector('.hero-slides');
const heroImages = document.querySelectorAll('.hero-slides a');
const prevHero = document.querySelector('.hero-btn.prev');
const nextHero = document.querySelector('.hero-btn.next');
const dotContainer = document.querySelector('.hero-dots');

let heroIndex = 0;
let heroInterval;

function updateHeroSlide(index) {
    heroSlides.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.hero-dots button').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function createDots() {
    for (let i = 0; i < heroImages.length; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => {
            heroIndex = i;
            updateHeroSlide(heroIndex);
        });
        if (i === 0) dot.classList.add('active');
        dotContainer.appendChild(dot);
    }
}

function startAutoHero() {
    heroInterval = setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        updateHeroSlide(heroIndex);
    }, 4000);
}

function stopAutoHero() {
    clearInterval(heroInterval);
}

prevHero.addEventListener('click', () => {
    heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
    updateHeroSlide(heroIndex);
    stopAutoHero();
    startAutoHero();
});

nextHero.addEventListener('click', () => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    updateHeroSlide(heroIndex);
    stopAutoHero();
    startAutoHero();
});

createDots();
startAutoHero();


// Função para destacar a imagem clicada
carouselImages.addEventListener('click', function (e) {
    const clickedImage = e.target;

    if (clickedImage.tagName !== 'IMG') return;

    // Se a imagem já está destacada, não faz nada
    if (clickedImage.classList.contains('focused')) return;

    // Aplica classe de foco na imagem clicada
    clickedImage.classList.add('focused');

    // Diminui opacidade das outras
    images.forEach(img => {
        if (img !== clickedImage) {
            img.classList.add('dimmed');
        }
    });

    // Adiciona listener para desfocar ao clicar fora
    document.addEventListener('click', function handleClickOutside(event) {
        if (!clickedImage.contains(event.target)) {
            clickedImage.classList.remove('focused');
            images.forEach(img => img.classList.remove('dimmed'));
            document.removeEventListener('click', handleClickOutside);
        }
    });
});

// Lightbox (exibe imagem em tela cheia ao clicar)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
});
window.addEventListener('resize', () => {
    updateCarousel();
});
updateCarousel();

