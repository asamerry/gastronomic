//// Carousel Gallery ////
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryDots = document.querySelectorAll(".gallery-dot");

const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentItem = 0;

function showImage(index) {
    galleryItems.forEach(item => {
        item.classList.remove("active");
    });

    galleryDots.forEach(dot => {
        dot.classList.remove("active");
    })

    galleryItems[index].classList.add("active");
    galleryDots[index].classList.add("active");
    
}

// Buttons
nextButton.addEventListener("click", () => {

    currentItem =
        (currentItem + 1) % galleryItems.length;

    showImage(currentItem);

});

previousButton.addEventListener("click", () => {

    currentItem =
        (currentItem - 1 + galleryItems.length)
        % galleryItems.length;

    showImage(currentItem);

});

// Visual Dots
galleryDots.forEach(dot => {

    dot.addEventListener("click", () => {

        currentItem = Number(dot.dataset.image);

        showImage(currentItem);

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