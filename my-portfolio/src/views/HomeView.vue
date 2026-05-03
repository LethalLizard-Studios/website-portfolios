<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="landing">
    <section class="hero">
      <img class="hero__logo" src="/logo-lls.png" alt="LethalLizard Studios logo" />

      <h1 class="hero__title">
        LethalLizard<br /><span class="hero__title-accent">Studios</span>
      </h1>

      <p class="hero__description">
        A <strong>Game Development &amp; Engineering</strong> studio with a focus on
        <strong>Interactive Experiences</strong> — browse our games or shop for
        high-quality golf simulator products.
      </p>

      <nav class="hero__nav" aria-label="Site sections">
        <RouterLink class="btn btn--primary" to="/portfolio">Leland Carter Portfolio</RouterLink>
        <RouterLink class="btn btn--primary" to="/sanction">SANCTION</RouterLink>
        <RouterLink class="btn btn--outline" to="/golf">Golf Products</RouterLink>
      </nav>
    </section>

    <footer class="site-footer">
      <p>&copy; {{ new Date().getFullYear() }} LethalLizard Studios</p>
    </footer>
  </main>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Hero ── */
.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  gap: 1.5rem;
}

.hero__logo {
  width: clamp(80px, 16vw, 140px);
  height: auto;
  object-fit: contain;
}

.hero__title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero__title-accent {
  color: var(--accent);
}

.hero__description {
  max-width: 540px;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  color: var(--text-muted);
  line-height: 1.7;
}

.hero__description strong {
  color: var(--text);
  font-weight: 600;
}

/* ── Buttons ── */
.hero__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
}

.btn:active {
  transform: scale(0.97);
}

.btn--primary {
  background-color: var(--accent);
  color: #111;
  border: 2px solid var(--accent);
}

.btn--primary:hover {
  background-color: var(--accent-dark);
  border-color: var(--accent-dark);
}

.btn--outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn--outline:hover {
  background-color: var(--accent);
  color: #111;
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
