<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="landing">
    <section class="hero">
      <img class="hero__logo" src="/lls-splash-logo.png" alt="LethalLizard Studios" />

      <p class="hero__description">
        Independent game studio out of Nova Scotia, Canada. Home of
        <strong>SANCTION</strong>, plus a decade of games, tools, and the odd golf
        simulator build.
      </p>

      <nav class="hero__nav" aria-label="Site sections">
        <RouterLink class="btn btn--primary" to="/sanction">SANCTION</RouterLink>
        <RouterLink class="btn btn--outline" to="/portfolio">Leland Carter Portfolio</RouterLink>
        <RouterLink class="btn btn--outline" to="/golf">Golf Products</RouterLink>
        <RouterLink class="btn btn--outline" to="/sea-of-thieves-guide">SOT Guide</RouterLink>
      </nav>
    </section>

    <footer class="site-footer">
      <p>&copy; {{ new Date().getFullYear() }} LethalLizard Studios</p>
    </footer>
  </main>
</template>

<style scoped>
.landing {
  --red: #cd4333;
  --red-dark: #a83628;
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
  padding: 3rem 1.5rem;
  gap: 1.75rem;
}

.hero__logo {
  width: clamp(220px, 42vw, 380px);
  height: auto;
  object-fit: contain;
}

.hero__description {
  max-width: 480px;
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
  margin-top: 0.25rem;
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
  background-color: var(--red);
  color: #fff;
  border: 2px solid var(--red);
}

.btn--primary:hover {
  background-color: var(--red-dark);
  border-color: var(--red-dark);
}

.btn--outline {
  background-color: transparent;
  color: var(--red);
  border: 2px solid var(--red);
}

.btn--outline:hover {
  background-color: var(--red);
  color: #fff;
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
