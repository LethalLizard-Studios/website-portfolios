<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects.js'

const menuOpen = ref(false)
const scrolled  = ref(false)

const featured = computed(() => projects.find((p) => p.id === 'sanction'))

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu  = () => { menuOpen.value = false }

const typeClass = (type) => ({
  'Video Game':          'badge--blue',
  'Game Jam':            'badge--orange',
  'Desktop Application': 'badge--cyan',
  'Academic Project':    'badge--violet',
  'VR Game':             'badge--pink',
}[type] ?? 'badge--default')

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
          <a class="hdr__link" href="#about"      @click="closeMenu">About</a>
          <a class="hdr__link" href="#experience" @click="closeMenu">Experience</a>
          <a class="hdr__link" href="#featured"   @click="closeMenu">Work</a>
          <a class="hdr__link" href="#contact"    @click="closeMenu">Contact</a>
        </nav>

        <div class="hdr__right">
          <div class="hdr__socials" aria-label="Social links">
            <a href="https://www.github.com/LethalLizard-Studios" target="_blank" rel="noopener" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/leland-carter/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.x.com/LelandCDev" target="_blank" rel="noopener" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <a
            class="btn btn--ghost hdr__resume"
            href="https://docs.google.com/document/d/1bEVAJwmYOdqDWNtxLUO26nXrPvjhfAwgzkE1Itt6Q6w/edit?usp=sharing"
            target="_blank" rel="noopener"
          >Resume ↗</a>
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
          class="btn btn--primary mobile-nav__cta"
          href="https://docs.google.com/document/d/1bEVAJwmYOdqDWNtxLUO26nXrPvjhfAwgzkE1Itt6Q6w/edit?usp=sharing"
          target="_blank" rel="noopener" @click="closeMenu"
        >Resume / CV</a>
      </nav>
    </div>

    <main>

      <!-- ── Hero ── -->
      <section class="hero">
        <div class="hero__glow" aria-hidden="true"></div>
        <div class="hero__grid-bg" aria-hidden="true"></div>
        <div class="hero__inner container">
          <div class="hero__content">
            <p class="hero__eyebrow">
              <span class="hero__eyebrow-dot"></span>Hello, I'm Leland Carter
            </p>
            <h1 class="hero__title">
              DIGITAL<br /><span class="hero__title-accent">PORTFOLIO</span>
            </h1>
            <p class="hero__description">
              A passionate <strong>Game Developer / Software Engineer</strong> with 12+ years
              of experience building games, tools, and software across a wide range of
              platforms and languages.
            </p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#contact">Contact Me</a>
              <a class="btn btn--outline" href="#featured">View Work</a>
            </div>
          </div>
          <div class="hero__img-wrap">
            <div class="hero__img-ring"></div>
            <img class="hero__img" src="/hero.jpg" alt="Leland Carter" loading="eager" />
          </div>
        </div>
      </section>

      <!-- ── About ── -->
      <section id="about" class="about section">
        <div class="two-col container">
          <div class="about__content">
            <p class="section__label">Who I Am</p>
            <h2 class="section__title">About Me</h2>
            <p class="section__text">
              Hello! I'm Leland, an <strong>Indie Game Developer</strong> based in Halifax.
              Almost every day for the past 12+ years I have worked on some sort of programming
              project. Most of my spare time goes into game development, but I am also skilled
              with many tools and languages across the broader computer science industry.
            </p>
            <p class="section__text">
              Some people say I have an addiction to coding. I just love learning new languages,
              tools, and technologies to sharpen my skills.
            </p>

            <hr class="section__hr" />
            <h3 class="section__subtitle">Core Technologies</h3>
            <div class="tag-grid">
              <span class="tag">Unity HDRP / URP</span>
              <span class="tag">JavaFX</span>
              <span class="tag">Android Studio</span>
              <span class="tag">React Native</span>
              <span class="tag">OpenGL / FreeGLUT</span>
              <span class="tag">.NET</span>
              <span class="tag">Spring Boot</span>
              <span class="tag">SQL / PL/SQL</span>
            </div>

            <hr class="section__hr" />
            <h3 class="section__subtitle">Programming Languages</h3>
            <div class="tag-grid">
              <span class="tag">C# / C / C++</span>
              <span class="tag">Java / Kotlin</span>
              <span class="tag">Python</span>
              <span class="tag">HTML / CSS</span>
              <span class="tag">JavaScript</span>
              <span class="tag">Haskell</span>
            </div>
          </div>

          <div class="about__media">
            <img class="section__img" src="/about.jpg" alt="Leland Carter" loading="lazy" />
            <div class="award-badge">
              <svg class="award-badge__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
              <div>
                <strong>2024 Indie Showcase Spotlight</strong>
                <p>@ GameDev Atlantic 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Education ── -->
      <section class="education section">
        <div class="two-col two-col--reverse container">
          <div class="about__content">
            <p class="section__label">Background</p>
            <h2 class="section__title">Education</h2>
            <p class="section__text">
              During my time at Dalhousie University I picked up many useful skills, from Privacy
              and Network Security to Software Engineering and Operating Systems.
            </p>
            <p class="section__text">
              Learning algorithms and advanced math concepts showed me that programming is more
              than a single solution. It's a form of art unique to each programmer.
            </p>
            <hr class="section__hr" />
            <div class="edu-meta">
              <div class="edu-meta__item">
                <p class="meta__label">Program</p>
                <p class="meta__value">Bachelor of Computer Science</p>
              </div>
              <div class="edu-meta__item">
                <p class="meta__label">School</p>
                <p class="meta__value">Dalhousie University</p>
              </div>
              <div class="edu-meta__item">
                <p class="meta__label">Graduated</p>
                <p class="meta__value">April 2023</p>
              </div>
            </div>
          </div>
          <div class="about__media">
            <img class="section__img" src="/education.jpg" alt="Dalhousie University" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- ── Experience ── -->
      <section id="experience" class="experience section">
        <div class="container">
          <p class="section__label">Career</p>
          <h2 class="section__title">Experience</h2>

          <div class="exp-list">

            <div class="exp-card">
              <div class="exp-card__left">
                <span class="exp-card__dot"></span>
                <span class="exp-card__line"></span>
              </div>
              <div class="exp-card__body">
                <div class="exp-card__header">
                  <div>
                    <h3 class="exp-card__role">Programmer / Analyst</h3>
                    <p class="exp-card__company">Medavie Blue Cross / Croix Bleue Medavie</p>
                  </div>
                  <div class="exp-card__meta">
                    <span class="exp-card__date">June 2025 – Present</span>
                    <span class="tag">Full-Time</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="exp-card">
              <div class="exp-card__left">
                <span class="exp-card__dot"></span>
                <span class="exp-card__line"></span>
              </div>
              <div class="exp-card__body">
                <div class="exp-card__header">
                  <div>
                    <h3 class="exp-card__role">Founder</h3>
                    <p class="exp-card__company">LethalLizard Studios</p>
                  </div>
                  <div class="exp-card__meta">
                    <span class="exp-card__date">June 2019 – Present</span>
                    <span class="tag">Self-Employed</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="exp-card exp-card--last">
              <div class="exp-card__left">
                <span class="exp-card__dot"></span>
              </div>
              <div class="exp-card__body">
                <div class="exp-card__header">
                  <div>
                    <h3 class="exp-card__role">Web Developer / IT Consultant</h3>
                    <p class="exp-card__company">Coastal Colonics</p>
                  </div>
                  <div class="exp-card__meta">
                    <span class="exp-card__date">Aug 2024 – Oct 2024</span>
                    <span class="tag">Contract · Part-Time</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ── Featured ── -->
      <section id="featured" class="featured section">
        <div class="container" v-if="featured">
          <p class="section__label">Featured Project</p>
          <div class="featured__header">
            <h2 class="featured__title">{{ featured.title }}</h2>
            <a
              class="featured__ext-link"
              :href="featured.mainLink"
              target="_blank" rel="noopener"
              :aria-label="`${featured.title} — external link`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
              </svg>
            </a>
          </div>
          <p class="featured__subtitle">{{ featured.subtitle }}</p>

          <div class="featured__links">
            <a
              v-for="link in featured.links" :key="link.text"
              class="btn btn--primary"
              :href="link.url" target="_blank" rel="noopener"
            >{{ link.text }}</a>
          </div>

          <p class="featured__description">{{ featured.description }}</p>

          <div class="featured__stats">
            <div v-for="stat in featured.stats" :key="stat.label" class="stat-card">
              <p class="stat-card__value">{{ stat.value }}</p>
              <p class="stat-card__label">{{ stat.label }}</p>
            </div>
          </div>

          <div class="featured__screenshots">
            <img
              v-for="img in featured.images" :key="img.src"
              :src="img.src" :alt="img.alt"
              loading="lazy" class="featured__screenshot"
            />
          </div>
        </div>
      </section>

      <!-- ── Project Archive ── -->
      <section id="work" class="work section">
        <div class="container">
          <div class="work__header">
            <div>
              <p class="section__label">What I've Built</p>
              <h2 class="section__title">Project Archive</h2>
            </div>
            <a class="featured__ext-link" href="https://lelandcarter-archive.itch.io" target="_blank" rel="noopener" aria-label="itch.io archive">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
              </svg>
            </a>
          </div>
          <p class="section__text work__sub">A collection of my most memorable projects spanning 2012 to present.</p>

          <ul class="project-grid">
            <li v-for="project in projects" :key="project.id" class="project-card">
              <div class="project-card__img-wrap">
                <img
                  :src="project.images[0]?.src"
                  :alt="project.images[0]?.alt ?? project.title"
                  loading="lazy" class="project-card__img"
                />
                <span class="project-card__type-badge" :class="typeClass(project.type)">{{ project.type }}</span>
              </div>
              <div class="project-card__body">
                <div class="project-card__top">
                  <h3 class="project-card__title">{{ project.title }}</h3>
                  <span class="project-card__date">{{ project.date }}</span>
                </div>
                <p class="project-card__sub">{{ project.subtitle }}</p>
              </div>
              <div class="project-card__links" v-if="project.links.length">
                <a
                  v-for="link in project.links.slice(0, 2)" :key="link.text"
                  class="btn btn--sm btn--ghost"
                  :href="link.url" target="_blank" rel="noopener"
                >{{ link.text }}</a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- ── Contact ── -->
      <section id="contact" class="contact section">
        <div class="contact__inner container">
          <p class="section__label">Get In Touch</p>
          <h2 class="section__title">Let's Talk</h2>
          <p class="section__text contact__desc">
            Whether you have a project in mind, want to collaborate, or just want to say hello,
            my inbox is always open.
          </p>
          <p class="contact__sign">Leland Carter</p>
          <div class="contact__actions">
            <a class="btn btn--primary" href="mailto:lelandcarter@lethallizard.studio">Send an Email</a>
            <a class="btn btn--outline" href="https://www.linkedin.com/in/leland-carter/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </section>

    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span>&copy; {{ new Date().getFullYear() }} LethalLizard Studios</span>
        <div class="site-footer__socials">
          <a href="https://www.github.com/LethalLizard-Studios" target="_blank" rel="noopener" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/leland-carter/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.x.com/LelandCDev" target="_blank" rel="noopener" aria-label="X">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ── Layout ── */
.container {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

.section { padding-block: 6rem; }

.two-col {
  display: grid;
  gap: 3.5rem;
  align-items: center;
}
@media (min-width: 768px) {
  .two-col { grid-template-columns: 1fr 1fr; }
  .two-col--reverse .about__media { order: -1; }
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s,
              box-shadow 0.2s, transform 0.15s;
  white-space: nowrap;
}
.btn:active { transform: scale(0.97); }

.btn--primary {
  background: var(--accent);
  color: #0a0a0a;
  border: 1.5px solid var(--accent);
}
.btn--primary:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
  box-shadow: 0 0 24px var(--accent-glow);
}

.btn--outline {
  background: transparent;
  color: var(--accent);
  border: 1.5px solid var(--border-accent);
}
.btn--outline:hover {
  background: var(--accent-subtle);
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(125, 255, 106, 0.15);
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1.5px solid var(--border);
  backdrop-filter: blur(8px);
}
.btn--ghost:hover {
  background: var(--accent-subtle);
  color: var(--accent);
  border-color: var(--border-accent);
}

.btn--sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
}

/* ── Header ── */
.site-header {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s;
  border-block-end: 1px solid transparent;
}
.site-header--scrolled {
  background: rgba(17, 17, 18, 0.85);
  backdrop-filter: blur(18px) saturate(160%);
  border-color: var(--border);
}

.hdr {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 68px;
}

.hdr__logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  flex-shrink: 0;
}
.hdr__logo-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.hdr__nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
  margin-inline-start: auto;
}
@media (min-width: 768px) { .hdr__nav { display: flex; } }

.hdr__link {
  font-size: 0.875rem;
  color: var(--text-muted);
  padding: 0.4rem 0.75rem;
  border-radius: 0.4rem;
  transition: color 0.2s, background 0.2s;
}
.hdr__link:hover { color: var(--text); background: rgba(255,255,255,0.05); }

.hdr__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-inline-start: auto;
}
@media (min-width: 768px) { .hdr__right { margin-inline-start: 0; } }

.hdr__socials { display: none; align-items: center; gap: 0.6rem; }
@media (min-width: 768px) { .hdr__socials { display: flex; } }

.hdr__socials a {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 0.35rem;
  border-radius: 0.35rem;
  transition: color 0.2s, background 0.2s;
}
.hdr__socials a:hover { color: var(--accent); background: var(--accent-subtle); }

.hdr__resume { display: none; }
@media (min-width: 768px) { .hdr__resume { display: inline-flex; } }

/* Hamburger */
.hdr__burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22px;
  height: 16px;
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
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.2s;
}
.hdr__burger.open span:nth-child(1) { transform: translateY(7.25px) rotate(45deg); }
.hdr__burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hdr__burger.open span:nth-child(3) { transform: translateY(-7.25px) rotate(-45deg); }

/* ── Mobile Nav ── */
.mobile-nav {
  position: fixed;
  inset-block-start: 68px;
  inset-inline: 0;
  inset-block-end: 0;
  background: rgba(17, 17, 18, 0.97);
  backdrop-filter: blur(24px);
  z-index: 99;
  padding: 2.5rem 1.5rem;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-block-start: 1px solid var(--border);
}
.mobile-nav.open { transform: translateX(0); }

.mobile-nav nav { display: flex; flex-direction: column; gap: 0.25rem; }

.mobile-nav__link {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-muted);
  padding: 0.75rem 0;
  border-block-end: 1px solid var(--border);
  transition: color 0.2s;
  letter-spacing: -0.02em;
}
.mobile-nav__link:hover { color: var(--accent); }

.mobile-nav__cta { margin-block-start: 2rem; text-align: center; }

/* ── Hero ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-block: 8rem 5rem;
  overflow: hidden;
}

.hero__grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

.hero__glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(125, 255, 106, 0.1) 0%, transparent 65%);
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  pointer-events: none;
  filter: blur(40px);
}

.hero__inner {
  position: relative;
  display: grid;
  gap: 3.5rem;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
@media (min-width: 768px) {
  .hero__inner { grid-template-columns: 1fr auto; }
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  margin-block-end: 1.25rem;
  letter-spacing: 0.01em;
}
.hero__eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
  flex-shrink: 0;
}

.hero__title {
  font-size: clamp(3rem, 9vw, 6rem);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.04em;
  margin-block-end: 1.5rem;
}

.hero__title-accent {
  color: var(--accent);
  text-shadow: 0 0 60px rgba(125, 255, 106, 0.4);
}

.hero__description {
  max-width: 500px;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.75;
  margin-block-end: 2rem;
}
.hero__description strong { color: var(--text); font-weight: 600; }

.hero__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.hero__img-wrap {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__img-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--accent) 0%,
    transparent 40%,
    transparent 60%,
    var(--accent) 100%
  );
  animation: spin 8s linear infinite;
  opacity: 0.6;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hero__img {
  position: relative;
  width: clamp(200px, 26vw, 300px);
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--bg);
  box-shadow: 0 0 40px rgba(125, 255, 106, 0.25);
  z-index: 1;
}

/* ── Section shared ── */
.section__label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-block-end: 0.6rem;
}

.section__title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-block-end: 1.5rem;
  position: relative;
  padding-block-end: 1rem;
}
.section__title::after {
  content: '';
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  width: 36px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--accent-glow);
}

.section__subtitle {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-block-end: 0.75rem;
}

.section__text {
  color: var(--text-muted);
  line-height: 1.8;
  margin-block-end: 1rem;
  font-size: 0.95rem;
}
.section__text strong { color: var(--text); font-weight: 600; }

.section__hr {
  border: none;
  border-block-start: 1px solid var(--border);
  margin-block: 1.75rem;
}

.section__img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 4/3;
  border: 1px solid var(--border);
}

/* ── Tags (skills) ── */
.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block-start: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid var(--border-accent);
  letter-spacing: 0.01em;
}

/* ── About ── */
.about { background: var(--bg-soft); }

.about__media { display: flex; flex-direction: column; gap: 1.25rem; }

.award-badge {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  background: rgba(125, 255, 106, 0.05);
  border: 1px solid var(--border-accent);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 0 20px rgba(125, 255, 106, 0.07);
}
.award-badge__icon { color: var(--accent); flex-shrink: 0; margin-block-start: 2px; }
.award-badge strong { color: var(--accent); display: block; font-weight: 700; font-size: 0.9rem; }
.award-badge p { font-size: 0.8rem; color: var(--text-muted); margin-block-start: 0.15rem; }

/* ── Education ── */
.edu-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1.5rem;
}
.edu-meta__item {}
.meta__label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-block-end: 0.3rem;
}
.meta__value { font-size: 0.9rem; color: var(--text); font-weight: 500; }

/* ── Featured ── */
.featured {
  background: var(--bg-mute);
  position: relative;
  overflow: hidden;
}
.featured::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(125, 255, 106, 0.07) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  pointer-events: none;
  filter: blur(60px);
}

.featured__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-block-end: 0.4rem;
}

.featured__title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--accent);
  text-shadow: 0 0 60px rgba(125, 255, 106, 0.35);
  line-height: 1;
}

.featured__ext-link {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color 0.2s, transform 0.2s;
}
.featured__ext-link:hover { color: var(--accent); transform: translateY(-2px); }

.featured__subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-block-end: 1.75rem;
  font-weight: 500;
}

.featured__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-block-end: 1.75rem;
}

.featured__description {
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 680px;
  margin-block-end: 2.5rem;
  font-size: 0.95rem;
}

.featured__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-block-end: 2.5rem;
}

.stat-card {
  background: var(--bg-soft);
  padding: 1.5rem;
  text-align: center;
}
.stat-card__value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px rgba(125, 255, 106, 0.3);
}
.stat-card__label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-block-start: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.featured__screenshots {
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .featured__screenshots { grid-template-columns: 1fr 1fr; }
}

.featured__screenshot {
  width: 100%;
  border-radius: 0.75rem;
  object-fit: cover;
  aspect-ratio: 16/9;
  border: 1px solid var(--border);
}

/* ── Work ── */
.work { background: var(--bg-soft); }

.work__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-block-end: 0.5rem;
}

.work__sub { margin-block-end: 2.5rem; }

.project-grid {
  list-style: none;
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.project-card {
  background: var(--bg-mute);
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
}
.project-card:hover { background: rgba(125, 255, 106, 0.04); }

.project-card__img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--bg-soft);
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.9;
}
.project-card:hover .project-card__img { transform: scale(1.05); opacity: 1; }

.project-card__type-badge {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-start: 0.75rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background: rgba(17, 17, 18, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid;
}

/* type colours */
.badge--blue    { color: #60a5fa; border-color: rgba(96, 165, 250, 0.3); }
.badge--orange  { color: #fb923c; border-color: rgba(251, 146, 60,  0.3); }
.badge--cyan    { color: #22d3ee; border-color: rgba(34, 211, 238,  0.3); }
.badge--violet  { color: #a78bfa; border-color: rgba(167, 139, 250, 0.3); }
.badge--pink    { color: #f472b6; border-color: rgba(244, 114, 182, 0.3); }
.badge--default { color: var(--accent); border-color: var(--border-accent); }

.project-card__body {
  padding: 1rem 1.25rem 0.5rem;
  flex: 1;
}

.project-card__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-block-end: 0.3rem;
}

.project-card__title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.project-card__date {
  font-size: 0.72rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

.project-card__sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.project-card__links {
  padding: 0.75rem 1.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── Contact ── */
.contact {
  position: relative;
  overflow: hidden;
}
.contact::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(125, 255, 106, 0.08) 0%, transparent 70%);
  bottom: -100px;
  right: 5%;
  pointer-events: none;
  filter: blur(60px);
}

.contact__inner { position: relative; }
.contact__desc { max-width: 520px; }
.contact__sign {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-block: 1.5rem 2rem;
  font-style: italic;
}
.contact__actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }

/* ── Experience ── */
.experience { background: var(--bg-soft); }

.exp-list {
  display: flex;
  flex-direction: column;
  margin-block-start: 0.5rem;
}

.exp-card {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0 1.25rem;
}

.exp-card__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block-start: 4px;
}

.exp-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
  flex-shrink: 0;
  z-index: 1;
}

.exp-card__line {
  width: 1.5px;
  flex: 1;
  background: linear-gradient(to bottom, var(--border-accent), var(--border));
  margin-block: 6px;
  min-height: 2.5rem;
}

.exp-card__body {
  padding-block-end: 2.5rem;
}

.exp-card--last .exp-card__body {
  padding-block-end: 0;
}

.exp-card__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
}

.exp-card__role {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-block-end: 0.25rem;
}

.exp-card__company {
  font-size: 0.9rem;
  color: var(--accent);
  font-weight: 500;
}

.exp-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  flex-shrink: 0;
}

.exp-card__date {
  font-size: 0.78rem;
  color: var(--text-muted);
  white-space: nowrap;
}

/* ── Footer ── */
.site-footer {
  padding: 1.5rem 0;
  border-block-start: 1px solid var(--border);
}
.site-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.site-footer__socials { display: flex; align-items: center; gap: 0.75rem; }
.site-footer__socials a {
  color: var(--text-muted);
  display: flex;
  transition: color 0.2s;
}
.site-footer__socials a:hover { color: var(--accent); }
</style>
