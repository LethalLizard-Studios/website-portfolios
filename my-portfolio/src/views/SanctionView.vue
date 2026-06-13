<script setup>
import { RouterLink } from 'vue-router'

const STEAM_URL = 'https://store.steampowered.com/app/1191080/SANCTION/'

const screenshots = [
  { src: '/Screenshot_0.jpg', alt: 'SANCTION gameplay screenshot' },
  { src: '/Screenshot_1.jpg', alt: 'SANCTION wasteland exploration' },
  { src: '/Screenshot_2.jpg', alt: 'SANCTION bunker interior' },
  { src: '/Screenshot_3.jpg', alt: 'SANCTION combat encounter' },
]

const features = [
  {
    title: 'Scavenge the Wasteland',
    text: 'Leave the safety of your doomsday bunker to gather food, water, and air filters. Everything your community needs to survive is out there, guarded by whatever the final war left behind.',
  },
  {
    title: 'Factions & Quests',
    text: 'Form alliances with the factions that remain. Take on quests, earn their trust, and decide who deserves the supplies you risk your life for.',
  },
  {
    title: 'Daily Skill Pills',
    text: 'Each day, choose a skill pill that enhances traits like luck and agility. Plan your loadout around the run ahead.',
  },
  {
    title: 'Beetle Breeding',
    text: 'Breed beetles for protein and send them out to gather items. A strange world calls for strange solutions.',
  },
  {
    title: 'Anomalous Rituals',
    text: 'Collect artifacts and perform rituals to duplicate items. The anomalies that broke the world can also work in your favor.',
  },
  {
    title: 'Procedural World',
    text: 'A procedurally generated wasteland means no two runs play the same. 19 Steam Achievements track your survival.',
  },
]

const enemies = [
  { name: 'Spirit-Walkers', desc: 'Reanimated bodies that roam the wasteland' },
  { name: 'Anomalous Orbs', desc: 'Alien matter, unpredictable and lethal' },
  { name: 'AI Drones', desc: 'Autonomous warfare systems still fighting a finished war' },
]
</script>

<template>
  <main class="sanction">
    <!-- Header -->
    <header class="header">
      <RouterLink to="/" class="header__back">&larr; LethalLizard Studios</RouterLink>
      <a :href="STEAM_URL" target="_blank" rel="noopener" class="btn btn--small">View on Steam</a>
    </header>

    <!-- Hero -->
    <section class="hero">
      <img class="hero__logo" src="/sanction-logo.png" alt="SANCTION" />
      <p class="hero__tagline">
        A procedurally generated FPS/RPG where you are a prisoner sanctioned to leave
        the safety of your doomsday bunker and gather supplies for the community.
        Your freedom, and their livelihood, relies on you.
      </p>
      <div class="hero__actions">
        <a :href="STEAM_URL" target="_blank" rel="noopener" class="btn">Get it on Steam</a>
        <span class="hero__status">Early Access &middot; Windows</span>
      </div>
    </section>

    <!-- Screenshot strip -->
    <section class="shots">
      <div class="shots__grid">
        <img
          v-for="shot in screenshots"
          :key="shot.src"
          :src="shot.src"
          :alt="shot.alt"
          loading="lazy"
        />
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <h2 class="section__title">Survive the Desolate Wasteland</h2>
      <div class="features">
        <article v-for="feature in features" :key="feature.title" class="feature">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <!-- Enemies -->
    <section class="section section--alt">
      <h2 class="section__title">What's Left Out There</h2>
      <ul class="enemies">
        <li v-for="enemy in enemies" :key="enemy.name">
          <strong>{{ enemy.name }}</strong>
          <span>{{ enemy.desc }}</span>
        </li>
      </ul>
    </section>

    <!-- Specs -->
    <section class="section">
      <h2 class="section__title">Minimum Requirements</h2>
      <dl class="specs">
        <div><dt>OS</dt><dd>Windows 10 (21H1 or newer)</dd></div>
        <div><dt>Processor</dt><dd>AMD Ryzen 5 3600</dd></div>
        <div><dt>Memory</dt><dd>16 GB RAM</dd></div>
        <div><dt>Graphics</dt><dd>NVIDIA GeForce GTX 1060 (6GB)</dd></div>
        <div><dt>Storage</dt><dd>6 GB available space</dd></div>
      </dl>
    </section>

    <!-- Final CTA -->
    <section class="cta">
      <h2>The community is counting on you.</h2>
      <a :href="STEAM_URL" target="_blank" rel="noopener" class="btn btn--large">Purchase on Steam</a>
    </section>

    <footer class="site-footer">
      <p>
        Developed by Leland Carter &middot; Published by LethalLizard Studios &middot;
        &copy; {{ new Date().getFullYear() }}
      </p>
    </footer>
  </main>
</template>

<style scoped>
.sanction {
  --brand: #8b5cf6;
  --brand-dark: #6d3fd4;
  --bg-page: #050506;
  --bg-raised: #0c0c0e;
  --font-display: 'Black Ops One', 'Arial Black', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--bg-page);
}

/* ── Film grain overlay ── */
.sanction::after {
  content: '';
  position: fixed;
  inset: -100%;
  z-index: 100;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 240px 240px;
  opacity: 0.16;
  animation: grain 0.4s steps(1) infinite;
}

@keyframes grain {
  0%   { transform: translate(0, 0); }
  12%  { transform: translate(-7%, 3%); }
  25%  { transform: translate(4%, -8%); }
  37%  { transform: translate(-5%, -6%); }
  50%  { transform: translate(8%, 5%); }
  62%  { transform: translate(-3%, 8%); }
  75%  { transform: translate(6%, -4%); }
  87%  { transform: translate(-8%, -2%); }
  100% { transform: translate(0, 0); }
}

/* ── Header ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem clamp(1.5rem, 5vw, 4rem);
  border-bottom: 1px solid var(--border);
}

.header__back {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.header__back:hover {
  color: var(--text);
}

/* ── Buttons ── */
.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  background-color: var(--brand);
  color: #fff;
  border: 2px solid var(--brand);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, transform 0.15s;
}

.btn:hover {
  background-color: var(--brand-dark);
  border-color: var(--brand-dark);
}

.btn:active {
  transform: scale(0.97);
}

.btn--small {
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
}

.btn--large {
  padding: 1rem 2.75rem;
  font-size: 1.1rem;
}

/* ── Hero ── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: clamp(3rem, 8vw, 6rem) 1.5rem 3rem;
}

.hero__logo {
  width: clamp(260px, 50vw, 520px);
  height: auto;
  object-fit: contain;
}

.hero__tagline {
  max-width: 600px;
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: var(--text-muted);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.hero__status {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Screenshots ── */
.shots {
  padding: 1rem clamp(1.5rem, 5vw, 4rem) 3rem;
}

.shots__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.shots__grid img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

/* ── Sections ── */
.section {
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem);
}

.section--alt {
  background-color: var(--bg-raised);
}

.section__title {
  max-width: 1000px;
  margin: 0 auto 2.5rem;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ── Features ── */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature h3 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: var(--brand);
}

.feature p {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* ── Enemies ── */
.enemies {
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.enemies li {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border);
}

.enemies li:first-child {
  border-top: 1px solid var(--border);
}

.enemies strong {
  flex: 0 0 200px;
  font-weight: 600;
}

.enemies span {
  color: var(--text-muted);
}

/* ── Specs ── */
.specs {
  max-width: 1000px;
  margin: 0 auto;
}

.specs div {
  display: grid;
  grid-template-columns: minmax(110px, 180px) 1fr;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--border);
}

.specs div:first-child {
  border-top: 1px solid var(--border);
}

.specs dt {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.specs dd {
  font-size: 0.95rem;
}

/* ── CTA ── */
.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: clamp(4rem, 9vw, 6rem) 1.5rem;
  background-color: var(--bg-raised);
}

.cta h2 {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 3.5vw, 1.85rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ── Footer ── */
.site-footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}
</style>
