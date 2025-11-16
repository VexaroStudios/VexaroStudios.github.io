// Activate icons
lucide.createIcons();

// Load particles
particlesJS.load("particles-js", "particles.json");

// INTRO REMOVE AFTER ANIMATION
setTimeout(() => {
    document.getElementById("intro").style.display = "none";
}, 2400);
