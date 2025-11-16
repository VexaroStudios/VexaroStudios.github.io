/* ------------------ PARTICLES.JS BACKGROUND ------------------ */

particlesJS("particles-js", {
    particles: {
        number: { value: 75 },
        color: { value: "#b47aff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#9a4dff",
            opacity: 0.4,
            width: 1
        },
        move: {
            speed: 1.2
        }
    }
});

/* ------------------ FRONT SPARK PARTICLES ------------------ */

const canvas = document.getElementById("spark-canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let sparks = [];

class Spark {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.alpha = Math.random() * 0.9 + 0.2;
    }
    draw() {
        ctx.fillStyle = `rgba(200,150,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.y -= this.speedY;
        if (this.y < -5) {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 5;
        }
        this.draw();
    }
}

function initSparks() {
    for (let i = 0; i < 120; i++) sparks.push(new Spark());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => s.update());
    requestAnimationFrame(animate);
}

initSparks();
animate();
