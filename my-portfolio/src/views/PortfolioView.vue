<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects.js'

const menuOpen = ref(false)
const scrolled  = ref(false)

const featured = computed(() => projects.find((p) => p.id === 'sanction'))
const archive  = computed(() => projects)

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu  = () => { menuOpen.value = false }

const typeColor = (type) => ({
  'Video Game':          '#60a5fa',
  'Game Jam':            '#fb923c',
  'Desktop Application': '#22d3ee',
  'Academic Project':    '#a78bfa',
  'VR Game':             '#f472b6',
}[type] ?? 'var(--accent)')

const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="portfolio">

    <!-- ── Header ── -->
    <header :class="['site-header', { 'site-header--scrolled': scrolled }]">
      <div class="hdr container">
        <a class="hdr__logo" href="/portfolio">
          <img class="hdr__logo-img" src="/logo-lls-no-bg.png" alt="" aria-hidden="true" />Leland Carter
        </a>

        <nav class="hdr__nav" aria-label="Portfolio navigation">
          <a class="hdr__link" href="#about">About</a>
          <a class="hdr__link" href="#experience">Experience</a>
          <a class="hdr__link" href="#featured">Work</a>
          <a class="hdr__link" href="#contact">Contact</a>
        </nav>

        <div class="hdr__right">
          <div class="hdr__socials" aria-label="Social links">
            <a href="https://www.github.com/LethalLizard-Studios" target="_blank" rel="noopener" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/leland-carter/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.x.com/LelandCDev" target="_blank" rel="noopener" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <a
            class="hdr__resume mono-link"
            href="https://docs.google.com/document/d/1bEVAJwmYOdqDWNtxLUO26nXrPvjhfAwgzkE1Itt6Q6w/edit?usp=sharing"
            target="_blank" rel="noopener"
          >resume ↗</a>
          <button
            class="hdr__burger" :class="{ open: menuOpen }"
            :aria-expanded="menuOpen" aria-label="Toggle menu"
            @click="toggleMenu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- ── Mobile Nav ── -->
    <div class="mobile-nav" :class="{ open: menuOpen }" role="dialog" aria-label="Mobile navigation">
      <nav>
        <a class="mobile-nav__link" href="#about"      @click="closeMenu">About</a>
        <a class="mobile-nav__link" href="#experience" @click="closeMenu">Experience</a>
        <a class="mobile-nav__link" href="#featured"   @click="closeMenu">Work</a>
        <a class="mobile-nav__link" href="#contact"    @click="closeMenu">Contact</a>
        <a
          class="mobile-nav__link mobile-nav__link--ext"
          href="https://docs.google.com/document/d/1bEVAJwmYOdqDWNtxLUO26nXrPvjhfAwgzkE1Itt6Q6w/edit?usp=sharing"
          target="_blank" rel="noopener" @click="closeMenu"
        >Resume ↗</a>
      </nav>
    </div>

    <main>

      <!-- ── Hero ── -->
      <section class="hero">
        <div class="hero__inner container">
          <div class="hero__content">
            <p class="hero__intro mono">Hello, I'm Leland Carter</p>
            <h1 class="hero__title">
              Digital<br /><span class="hero__title-accent">Portfolio</span>
            </h1>
            <p class="hero__description">
              Game developer and software engineer with 12+ years of projects behind me.
              I build games, tools, and the occasional thing that defies categorization.
            </p>
            <div class="hero__actions">
              <a class="btn" href="#featured">View work</a>
              <a class="text-link" href="#contact">Get in touch <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div class="hero__img-wrap">
            <img class="hero__img" src="/hero.jpg" alt="Leland Carter" loading="eager" />
          </div>
        </div>
      </section>

      <!-- ── About ── -->
      <section id="about" class="about section">
        <div class="container">
          <h2 class="section__title"><span class="section__index mono">01</span>About</h2>
          <div class="two-col">
            <div>
              <p class="section__text">
                I'm an <strong>indie game developer</strong> based in Halifax. Almost every day
                for the past 12+ years I've worked on some sort of programming project. Most of
                my spare time goes into game development, but I'm comfortable across the broader
                software world too.
              </p>
              <p class="section__text">
                Some people say I have an addiction to coding. I just love learning new languages,
                tools, and technologies to sharpen my skills.
              </p>

              <div class="skills">
                <div class="skills__group">
                  <h3 class="skills__heading mono">Technologies</h3>
                  <ul class="skills__list">
                    <li>Unity HDRP / URP</li>
                    <li>.NET</li>
                    <li>Spring Boot</li>
                    <li>SQL / PL/SQL</li>
                    <li>React Native</li>
                    <li>OpenGL / FreeGLUT</li>
                    <li>JavaFX</li>
                    <li>Android Studio</li>
                  </ul>
                </div>
                <div class="skills__group">
                  <h3 class="skills__heading mono">Languages</h3>
                  <ul class="skills__list">
                    <li>C# / C / C++</li>
                    <li>Java / Kotlin</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li>HTML / CSS</li>
                    <li>Haskell</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="about__media">
              <img class="about__img" src="/about.jpg" alt="Leland Carter" loading="lazy" />
              <p class="about__caption mono">
                Winner — Indie Showcase Spotlight, GameDev Atlantic 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Education ── -->
      <section class="section">
        <div class="container">
          <h2 class="section__title"><span class="section__index mono">02</span>Education</h2>
          <div class="two-col">
            <div>
              <p class="section__text">
                During my time at Dalhousie University I picked up many useful skills, from privacy
                and network security to software engineering and operating systems.
              </p>
              <p class="section__text">
                Learning algorithms and advanced math concepts showed me that programming is more
                than a single solution. It's a form of art unique to each programmer.
              </p>
              <dl class="facts">
                <div class="facts__row">
                  <dt class="mono">Program</dt>
                  <dd>Bachelor of Computer Science</dd>
                </div>
                <div class="facts__row">
                  <dt class="mono">School</dt>
                  <dd>Dalhousie University</dd>
                </div>
                <div class="facts__row">
                  <dt class="mono">Graduated</dt>
                  <dd>April 2023</dd>
                </div>
              </dl>
            </div>
            <div class="about__media">
              <img class="about__img" src="/education.jpg" alt="Dalhousie University" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- ── Experience ── -->
      <section id="experience" class="experience section">
        <div class="container">
          <h2 class="section__title"><span class="section__index mono">03</span>Experience</h2>

          <ul class="exp-list">
            <li class="exp">
              <span class="exp__date mono">2025 — Present</span>
              <div class="exp__detail">
                <h3 class="exp__role">Programmer / Analyst <span class="exp__company">· Medavie Blue Cross / Croix Bleue Medavie</span></h3>
                <p class="exp__type mono">Full-time</p>
              </div>
            </li>
            <li class="exp">
              <span class="exp__date mono">2019 — Present</span>
              <div class="exp__detail">
                <h3 class="exp__role">Founder <span class="exp__company">· LethalLizard Studios</span></h3>
                <p class="exp__type mono">Self-employed</p>
              </div>
            </li>
            <li class="exp">
              <span class="exp__date mono">2024</span>
              <div class="exp__detail">
                <h3 class="exp__role">Web Developer / IT Consultant <span class="exp__company">· Coastal Colonics</span></h3>
                <p class="exp__type mono">Contract, part-time</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- ── Featured ── -->
      <section id="featured" class="featured section" v-if="featured">
        <div class="container">
          <h2 class="section__title"><span class="section__index mono">04</span>Featured Work</h2>

          <div class="featured__card">
            <div class="featured__screens">
              <img
                v-for="img in featured.images" :key="img.src"
                :src="img.src" :alt="img.alt"
                loading="lazy" class="featured__screenshot"
              />
            </div>

            <div class="featured__info">
              <div class="featured__name-row">
                <h3 class="featured__name">{{ featured.title }}</h3>
                <span class="featured__year mono">{{ featured.date }}</span>
              </div>
              <p class="featured__award mono">{{ featured.subtitle }}</p>
              <p class="featured__description">{{ featured.description }}</p>

              <dl class="facts facts--inline">
                <div class="facts__row" v-for="stat in featured.stats" :key="stat.label">
                  <dt class="mono">{{ stat.label }}</dt>
                  <dd>{{ stat.value }}</dd>
                </div>
              </dl>

              <div class="featured__actions">
                <a class="btn" :href="featured.mainLink" target="_blank" rel="noopener">Steam page</a>
                <a class="text-link" href="/sanction">Official site <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Project Archive ── -->
      <section id="work" class="work section">
        <div class="container">
          <div class="work__head">
            <h2 class="section__title"><span class="section__index mono">05</span>Project Archive</h2>
            <a class="text-link" href="https://lelandcarter-archive.itch.io" target="_blank" rel="noopener">
              itch.io collection <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p class="section__text work__sub">My most memorable projects, 2012 to present.</p>

          <ul class="project-grid">
            <li v-for="project in archive" :key="project.id" class="project-card">
              <div class="project-card__img-wrap">
                <img
                  :src="project.images[0]?.src"
                  :alt="project.images[0]?.alt ?? project.title"
                  loading="lazy" class="project-card__img"
                />
              </div>
              <div class="project-card__body">
                <div class="project-card__top">
                  <h3 class="project-card__title">{{ project.title }}</h3>
                  <span class="project-card__date mono">{{ project.date }}</span>
                </div>
                <p class="project-card__sub">{{ project.subtitle }}</p>
                <div class="project-card__foot">
                  <span class="project-card__type mono">
                    <span class="project-card__type-dot" :style="{ background: typeColor(project.type) }"></span>
                    {{ project.type }}
                  </span>
                  <span class="project-card__links" v-if="project.links.length">
                    <a
                      v-for="link in project.links.slice(0, 2)" :key="link.text"
                      class="mono-link"
                      :href="link.url" target="_blank" rel="noopener"
                    >{{ link.text.toLowerCase() }} ↗</a>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- ── Contact ── -->
      <section id="contact" class="contact section">
        <div class="container">
          <h2 class="section__title"><span class="section__index mono">06</span>Contact</h2>
          <p class="section__text contact__desc">
            Whether you have a project in mind, want to collaborate, or just want to say hello,
            my inbox is always open.
          </p>
          <a class="contact__email" href="mailto:lelandcarter@lethallizard.studio">
            lelandcarter@lethallizard.studio
          </a>
          <div class="contact__links">
            <a class="mono-link" href="https://www.linkedin.com/in/leland-carter/" target="_blank" rel="noopener">linkedin ↗</a>
            <a class="mono-link" href="https://www.github.com/LethalLizard-Studios" target="_blank" rel="noopener">github ↗</a>
            <a class="mono-link" href="https://www.x.com/LelandCDev" target="_blank" rel="noopener">x ↗</a>
          </div>
        </div>
      </section>

    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span class="mono">&copy; {{ new Date().getFullYear() }} LethalLizard Studios</span>
        <span class="mono site-footer__loc">Halifax, NS</span>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ── Primitives ── */
.container {
  width: 100%;
  max-width: 1020px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

.section { padding-block: 5.5rem; }

.mono {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

.two-col {
  display: grid;
  gap: 3rem;
  align-items: start;
}
@media (min-width: 820px) {
  .two-col { grid-template-columns: 3fr 2fr; }
}

/* Buttons & links */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.4rem;
  border-radius: 6px;
  background: var(--accent);
  color: #101010;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.15s;
  white-space: nowrap;
}
.btn:hover { background: var(--accent-dark); }

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  border-block-end: 1px solid var(--border-accent);
  padding-block-end: 1px;
  transition: color 0.15s, border-color 0.15s;
}
.text-link:hover { color: var(--accent); border-color: var(--accent); }

.mono-link {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  transition: color 0.15s;
}
.mono-link:hover { color: var(--accent); }

/* ── Header ── */
.site-header {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  transition: background 0.25s, border-color 0.25s;
  border-block-end: 1px solid transparent;
}
.site-header--scrolled {
  background: rgba(17, 17, 18, 0.88);
  backdrop-filter: blur(14px);
  border-color: var(--border);
}

.hdr {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 64px;
}

.hdr__logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  flex-shrink: 0;
}
.hdr__logo-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.hdr__nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
  margin-inline-start: auto;
}
@media (min-width: 768px) { .hdr__nav { display: flex; } }

.hdr__link {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.15s;
}
.hdr__link:hover { color: var(--text); }

.hdr__right {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-inline-start: auto;
}
@media (min-width: 768px) { .hdr__right { margin-inline-start: 1.5rem; } }

.hdr__socials { display: none; align-items: center; gap: 0.85rem; }
@media (min-width: 768px) { .hdr__socials { display: flex; } }

.hdr__socials a {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color 0.15s;
}
.hdr__socials a:hover { color: var(--text); }

.hdr__resume { display: none; }
@media (min-width: 768px) { .hdr__resume { display: inline; } }

/* Hamburger */
.hdr__burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
@media (min-width: 768px) { .hdr__burger { display: none; } }

.hdr__burger span {
  display: block;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.25s, opacity 0.2s;
}
.hdr__burger.open span:nth-child(1) { transform: translateY(6.25px) rotate(45deg); }
.hdr__burger.open span:nth-child(2) { opacity: 0; }
.hdr__burger.open span:nth-child(3) { transform: translateY(-6.25px) rotate(-45deg); }

/* ── Mobile Nav ── */
.mobile-nav {
  position: fixed;
  inset-block-start: 64px;
  inset-inline: 0;
  inset-block-end: 0;
  background: var(--bg);
  z-index: 99;
  padding: 2rem 1.5rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  visibility: hidden;
}
.mobile-nav.open { transform: translateX(0); visibility: visible; }

.mobile-nav nav { display: flex; flex-direction: column; }

.mobile-nav__link {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text);
  padding: 0.85rem 0;
  border-block-end: 1px solid var(--border);
}
.mobile-nav__link--ext { color: var(--text-muted); }

/* ── Hero ── */
.hero {
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding-block: 8rem 4rem;
}

.hero__inner {
  display: grid;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 820px) {
  .hero__inner { grid-template-columns: 1fr auto; gap: 4rem; }
}

.hero__intro {
  color: var(--accent);
  margin-block-end: 1.5rem;
}

.hero__title {
  font-size: clamp(2.9rem, 8vw, 5.2rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-block-end: 1.5rem;
}
.hero__title-accent { color: var(--accent); }

.hero__description {
  max-width: 460px;
  color: var(--text-muted);
  font-size: 1.02rem;
  line-height: 1.75;
  margin-block-end: 2.25rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.hero__img-wrap { justify-self: center; }

.hero__img {
  width: clamp(220px, 26vw, 300px);
  aspect-ratio: 5/6;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--border);
  filter: saturate(0.9);
  transition: filter 0.3s;
}
.hero__img:hover { filter: saturate(1); }

/* ── Section headings ── */
.section__title {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  font-size: clamp(1.5rem, 3.5vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-block-end: 2.25rem;
}
.section__index { color: var(--accent); }

.section__text {
  color: var(--text-muted);
  line-height: 1.8;
  margin-block-end: 1.1rem;
  font-size: 0.95rem;
  max-width: 600px;
}
.section__text strong { color: var(--text); font-weight: 600; }

/* ── Skills ── */
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-block-start: 2.25rem;
  max-width: 480px;
}

.skills__heading {
  color: var(--text-muted);
  text-transform: uppercase;
  margin-block-end: 0.9rem;
}

.skills__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.skills__list li {
  font-size: 0.88rem;
  color: var(--text);
  padding-inline-start: 1.1rem;
  position: relative;
}
.skills__list li::before {
  content: '–';
  position: absolute;
  inset-inline-start: 0;
  color: var(--accent);
}

/* ── About media ── */
.about { background: var(--bg-soft); }

.about__media {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.about__img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  aspect-ratio: 4/3;
  border: 1px solid var(--border);
}

.about__caption {
  color: var(--text-muted);
  line-height: 1.6;
}

/* ── Facts (definition rows) ── */
.facts {
  margin-block-start: 2rem;
  border-block-start: 1px solid var(--border);
  max-width: 480px;
}

.facts__row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  padding-block: 0.7rem;
  border-block-end: 1px solid var(--border);
}

.facts__row dt {
  color: var(--text-muted);
  text-transform: uppercase;
}

.facts__row dd {
  font-size: 0.9rem;
  color: var(--text);
}

.facts--inline { max-width: none; }

/* ── Experience ── */
.experience { background: var(--bg-soft); }

.exp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.exp {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.3rem 2rem;
  padding-block: 1.4rem;
  border-block-end: 1px solid var(--border);
}
.exp:first-child { border-block-start: 1px solid var(--border); }

@media (min-width: 640px) {
  .exp { grid-template-columns: 160px 1fr; }
}

.exp__date { color: var(--text-muted); padding-block-start: 0.2rem; }

.exp__role {
  font-size: 1rem;
  font-weight: 600;
  margin-block-end: 0.2rem;
}

.exp__company {
  font-weight: 500;
  color: var(--text-muted);
}

.exp__type { color: var(--text-muted); }

/* ── Featured ── */
.featured__card {
  display: grid;
  gap: 2.5rem;
}
@media (min-width: 820px) {
  .featured__card { grid-template-columns: 1fr 1fr; align-items: start; }
}

.featured__screens {
  display: grid;
  gap: 1rem;
}

.featured__screenshot {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  aspect-ratio: 16/9;
  border: 1px solid var(--border);
}

.featured__name-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.featured__name {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.featured__year { color: var(--text-muted); }

.featured__award {
  color: var(--accent);
  margin-block: 0.4rem 1.25rem;
}

.featured__description {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.95rem;
  margin-block-end: 0.5rem;
}

.featured__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-block-start: 1.75rem;
}

/* ── Work / archive ── */
.work__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.work__head .section__title { margin-block-end: 0.75rem; }

.work__sub { margin-block-end: 2.5rem; }

.project-grid {
  list-style: none;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
}

.project-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-soft);
  transition: border-color 0.2s;
  display: flex;
  flex-direction: column;
}
.project-card:hover { border-color: rgba(255, 255, 255, 0.18); }

.project-card__img-wrap {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--bg-mute);
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__body {
  padding: 1rem 1.15rem 1.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-card__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  margin-block-end: 0.25rem;
}

.project-card__title {
  font-size: 0.95rem;
  font-weight: 600;
}

.project-card__date { color: var(--text-muted); flex-shrink: 0; }

.project-card__sub {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-block-end: 1rem;
}

.project-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-block-start: auto;
}

.project-card__type {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-muted);
}

.project-card__type-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-card__links {
  display: inline-flex;
  gap: 0.9rem;
}

/* ── Contact ── */
.contact { padding-block-end: 7rem; }

.contact__desc { max-width: 480px; }

.contact__email {
  display: inline-block;
  font-size: clamp(1.2rem, 3.5vw, 1.9rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text);
  border-block-end: 2px solid var(--accent);
  padding-block-end: 0.2rem;
  margin-block: 1.25rem 1.75rem;
  transition: color 0.15s;
  word-break: break-all;
}
.contact__email:hover { color: var(--accent); }

.contact__links {
  display: flex;
  gap: 1.5rem;
}

/* ── Footer ── */
.site-footer {
  padding: 1.4rem 0;
  border-block-start: 1px solid var(--border);
}
.site-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: var(--text-muted);
}
</style>
