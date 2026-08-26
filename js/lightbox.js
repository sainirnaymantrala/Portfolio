document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";

    const enlargedImage = document.createElement("img");
    enlargedImage.alt = "";

    lightbox.appendChild(enlargedImage);
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll(".image-card img");

    images.forEach((image) => {
        image.addEventListener("click", () => {
            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt;

            lightbox.classList.add("active");
            document.body.classList.add("lightbox-open");
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");
    };

    lightbox.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

});