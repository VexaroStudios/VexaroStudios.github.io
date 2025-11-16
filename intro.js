// Fade-in sections when scrolling
const sections = document.querySelectorAll(".fade-section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            sec.classList.add("visible");
        }
    });
});
