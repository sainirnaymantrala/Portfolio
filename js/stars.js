document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.id = 'star-field';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%'; // Fixed position covers the viewport as you scroll
    canvas.style.zIndex = '-1';
    canvas.style.background = '#050505';
    document.body.prepend(canvas);

    let width, height;
    const stars = [];
    const starCount = 400;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        generateStars();
    }

    function generateStars() {
        stars.length = 0;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * (height * 5),
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.7 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        const scrollY = window.scrollY;

        stars.forEach(star => {
            const parallaxOffset = scrollY * (star.size * 0.15);
            let drawY = (star.y - parallaxOffset) % (height * 5);

            if (drawY < 0) drawY += height * 5;

            if (drawY <= height) {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
});