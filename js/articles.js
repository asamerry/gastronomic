//// Carousel Gallery ////
const galleryImages = document.querySelectorAll(".gallery-image");
const galleryCaption = document.querySelector(".gallery-caption");
const galleryDots = document.querySelectorAll(".gallery-dot");

const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentImage = 0;

function showImage(index) {

    galleryImages.forEach(image => {
        image.classList.remove("active");
    });

    galleryDots.forEach(dot => {
        dot.classList.remove("active");
    });

    galleryImages[index].classList.add("active");
    galleryDots[index].classList.add("active");

    galleryCaption.textContent = galleryImages[index].dataset.caption;
}

// Buttons
nextButton.addEventListener("click", () => {

    currentImage =
        (currentImage + 1) % galleryImages.length;

    showImage(currentImage);

});

previousButton.addEventListener("click", () => {

    currentImage =
        (currentImage - 1 + galleryImages.length)
        % galleryImages.length;

    showImage(currentImage);

});

// Visual Dots
galleryDots.forEach(dot => {

    dot.addEventListener("click", () => {

        currentImage = Number(dot.dataset.image);

        showImage(currentImage);

    });

});

showImage(0);

//// Content Buttons and Tabs ////
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {

        const selectedTab = button.dataset.tab;

        tabButtons.forEach(tab => {
            tab.classList.remove("active");
        });

        tabPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        button.classList.add("active");

        document
            .getElementById(selectedTab)
            .classList.add("active");
    });
});