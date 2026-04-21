// ===== Background Particles =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// ===== Floating Hearts =====
function spawnHearts() {
  const container = document.getElementById('heartsContainer');
  const hearts = ['💕', '💖', '💗', '💝', '❤️', '🩷', '💘', '😘'];

  // Initial burst
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createHeart(container, hearts), i * 80);
  }

  // Continuous gentle stream
  setInterval(() => createHeart(container, hearts), 600);
}

function createHeart(container, hearts) {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-5%';
  heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
  heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
  heart.style.animationDelay = Math.random() * 0.5 + 's';
  container.appendChild(heart);

  // Clean up
  setTimeout(() => heart.remove(), 9000);
}

// ===== Confetti Burst =====
function burstConfetti() {
  const colors = ['#e91e63', '#ff4081', '#f48fb1', '#ffeb3b', '#ff9800', '#ab47bc', '#42a5f5'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = (40 + Math.random() * 20) + '%';
      confetti.style.top = (30 + Math.random() * 10) + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 8 + 5) + 'px';
      confetti.style.height = (Math.random() * 8 + 5) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';

      // Random spread direction
      const spreadX = (Math.random() - 0.5) * 400;
      const spreadY = (Math.random() - 0.5) * 200;
      confetti.style.setProperty('--spread-x', spreadX + 'px');
      confetti.animate([
        { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(${spreadX}px, ${100 + Math.random() * 300}px) rotate(${Math.random() * 720}deg) scale(0.2)`, opacity: 0 }
      ], {
        duration: 1500 + Math.random() * 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

// ===== Falling Love Text =====
function spawnFallingText() {
  const texts = ['Kocham Cię Kaja 💕', 'Kocham Cię Kaja ❤️', 'Kocham Cię Kaja 💖', 'Kocham Cię Kaja 🩷', 'Kocham Cię Kaja 💗'];
  const colors = ['#e91e63', '#d81b60', '#c2185b', '#f06292', '#ec407a', '#ad1457', '#ff80ab'];
  const sizes = ['1rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem'];

  // Initial burst of falling text
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createFallingText(texts, colors, sizes), i * 200);
  }

  // Continuous stream
  setInterval(() => createFallingText(texts, colors, sizes), 800);
}

function createFallingText(texts, colors, sizes) {
  const el = document.createElement('div');
  el.classList.add('falling-text');
  el.textContent = texts[Math.floor(Math.random() * texts.length)];
  el.style.left = (Math.random() * 85 + 5) + '%';
  el.style.top = '-40px';
  el.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
  el.style.color = colors[Math.floor(Math.random() * colors.length)];
  el.style.animationDuration = (Math.random() * 5 + 5) + 's';
  el.style.setProperty('--rotate-end', (Math.random() * 50 - 25) + 'deg');

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 11000);
}

// ===== Main FIX function =====
function fixMe() {
  const sadState = document.getElementById('sadState');
  const happyState = document.getElementById('happyState');
  const btn = document.getElementById('fixBtn');

  // Disable button
  btn.disabled = true;
  btn.style.pointerEvents = 'none';

  // Fade out sad state
  sadState.classList.add('fade-out');

  setTimeout(() => {
    // Switch states
    sadState.classList.add('hidden');
    happyState.classList.remove('hidden');
    happyState.classList.add('fade-in');

    // Change background
    document.body.classList.add('happy-mode');

    // Update particles to pink
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
      p.style.background = 'rgba(233, 30, 99, 0.12)';
    });

    // Burst effects
    burstConfetti();

    // Start hearts after a tiny delay
    setTimeout(() => spawnHearts(), 300);

    // Start falling love text
    setTimeout(() => spawnFallingText(), 500);

  }, 600);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
});
