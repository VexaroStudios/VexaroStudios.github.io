// --- SIDEBAR TOGGLE ---
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

// --- ACTIVATE LUCIDE ICONS ---
lucide.createIcons();

// --- LOAD PARTICLES ---
particlesJS.load("particles-js", "particles.json");

// --- INTRO REMOVE AFTER ANIMATION ---
setTimeout(() => {
    document.getElementById("intro").style.display = "none";
}, 2400);
