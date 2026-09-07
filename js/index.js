const homeImages = document.querySelectorAll(".home-gallery-image");

let currentImage = 0;

setInterval(() => {
    homeImages[currentImage].classList.remove("active");

    currentImage = (currentImage + 1) % homeImages.length;

    homeImages[currentImage].classList.add("active");
}, 5000);