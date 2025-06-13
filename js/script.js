const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');

const imagesPerSlide = 2;
const totalImages = images.length;
const imageWidth = 320 + 20; // largura da imagem + margem (10px de cada lado)
const maxIndex = Math.ceil(totalImages / imagesPerSlide) - 1;

let currentIndex = 0;

function updateCarousel() {
    const offset = -(currentIndex * imageWidth * imagesPerSlide);
    carouselImages.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener('click', () => {
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
updateCarousel();
