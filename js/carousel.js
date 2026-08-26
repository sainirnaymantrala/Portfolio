document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".additional-projects-track");
    const viewport = document.querySelector(".additional-projects-viewport");
    const leftButton = document.querySelector(".carousel-arrow-left");
    const rightButton = document.querySelector(".carousel-arrow-right");

    if (!track || !viewport || !leftButton || !rightButton) return;

    const originalCards = Array.from(
        track.querySelectorAll(".additional-project-card")
    );

    const originalCount = originalCards.length;

    let currentIndex = 0;
    let autoScrollTimer = null;
    let isAnimating = false;

    function cardsVisible() {
        if (window.innerWidth <= 650) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function cardStep() {
        const card = track.querySelector(".additional-project-card");

        if (!card) return 0;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function cloneCards() {
        track.querySelectorAll(".carousel-clone").forEach(card => card.remove());

        const visible = cardsVisible();

        for (let i = 0; i < visible; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add("carousel-clone");
            track.appendChild(clone);
        }

        for (let i = originalCount - visible; i < originalCount; i++) {
            if (i < 0) continue;

            const clone = originalCards[i].cloneNode(true);
            clone.classList.add("carousel-clone", "carousel-preclone");
            track.insertBefore(clone, track.firstChild);

            currentIndex++;
        }
    }

    function updatePosition(animate = true) {
        const step = cardStep();

        track.style.transition = animate
            ? "transform 0.45s ease"
            : "none";

        track.style.transform =
            `translateX(-${currentIndex * step}px)`;
    }

    function move(direction) {

        if (isAnimating) return;

        isAnimating = true;
        currentIndex += direction;

        updatePosition(true);

        setTimeout(() => {

            const visible = cardsVisible();

            /*
             * We've moved past the real end.
             * Jump back to the equivalent original position
             * without animation.
             */
            if (currentIndex >= originalCount + visible) {
                currentIndex -= originalCount;
                updatePosition(false);
            }

            /*
             * We've moved before the real beginning.
             */
            if (currentIndex < visible) {
                currentIndex += originalCount;
                updatePosition(false);
            }

            isAnimating = false;

        }, 470);
    }

    function startAutoScroll() {
        stopAutoScroll();

        autoScrollTimer = setInterval(() => {
            move(1);
        }, 3500);
    }

    function stopAutoScroll() {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    }

    function resetCarousel() {
        currentIndex = 0;

        track.querySelectorAll(".carousel-clone").forEach(card => {
            card.remove();
        });

        cloneCards();

        requestAnimationFrame(() => {
            updatePosition(false);
        });
    }

    rightButton.addEventListener("click", () => {
        move(1);
        startAutoScroll();
    });

    leftButton.addEventListener("click", () => {
        move(-1);
        startAutoScroll();
    });

    viewport.addEventListener("mouseenter", stopAutoScroll);
    viewport.addEventListener("mouseleave", startAutoScroll);

    window.addEventListener("resize", () => {
        resetCarousel();
        startAutoScroll();
    });

    resetCarousel();
    startAutoScroll();

});