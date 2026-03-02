document.addEventListener("DOMContentLoaded", function() {
    const isInsideProjects = window.location.pathname.includes('/projects/');
    const prefix = isInsideProjects ? '../' : '';

    const headerHTML = `
        <nav>
            <a href="${prefix}index.html" class="nav-name">SAINIRNAY M.</a>
            <div class="nav-links">
                <a href="${prefix}academic.html">Projects</a>
                <a href="${prefix}music.html">Creative</a>
                <a href="${prefix}resume.pdf" target="_blank">Resume</a>
            </div>
        </nav>
    `;

    const footerHTML = `
        <div class="contact-links">
            <span class="footer-label">CONNECT</span>
            <a href="https://www.linkedin.com/in/sainirnay-mantrala/" target="_blank">LinkedIn</a>
            <a href="https://github.com/sainirnaymantrala" target="_blank">GitHub</a>
            <a href="mailto:sainirnay426@gmail.com">Email</a>
        </div>
    `;

    const headerElem = document.getElementById("common-header");
    const footerElem = document.getElementById("common-footer");

    if (headerElem) headerElem.innerHTML = headerHTML;
    if (footerElem) footerElem.innerHTML = footerHTML;
});