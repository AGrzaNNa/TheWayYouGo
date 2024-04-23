window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    // Change opacity based on section's visibility in viewport
    if (sectionTop < window.innerHeight && sectionBottom > 0) {
    const opacity = 1 - (sectionTop / window.innerHeight);
    section.style.opacity = opacity;
}
});
});
