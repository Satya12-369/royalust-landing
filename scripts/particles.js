class GoldParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    
    this.opacity = Math.sin(Date.now() * 0.001) * 0.2 + 0.8;
  }

  draw() {
    this.ctx.beginPath();
    const gradient = this.ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, `rgba(255, 215, 0, ${this.opacity})`);
    gradient.addColorStop(1, 'rgba(184, 134, 11, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-js';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  init() {
    this.particles = [];
    const particleCount = Math.min(window.innerWidth * 0.1, 100);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new GoldParticle(this.canvas));
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});
