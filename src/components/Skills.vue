<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

/* ===== estado ===== */
const isVisible = ref(false);
const sectionEl = ref(null);
const animatedValues = ref({}); // { [skillName]: number }

/* ===== dados ===== */
const skillCategories = [
  {
    category: "FRONTEND",
    skills: [
      { name: "Vite", level: 71, color: "matrix-green" },
      { name: "Vue.js", level: 90, color: "matrix-green" },
      { name: "JavaScript (ES6+)", level: 92, color: "matrix-green" },
      { name: "HTML & CSS", level: 98, color: "matrix-green-bright" },
      { name: "SCSS & Bootstrap", level: 84, color: "matrix-green-bright" },
    ],
  },
  {
    category: "BACKEND",
    skills: [
      { name: "WordPress", level: 92, color: "matrix-green" },
      { name: "Joomla", level: 98, color: "matrix-green" },
      { name: "Drupal", level: 78, color: "matrix-green-bright" },
      { name: "PHP", level: 65, color: "matrix-green" },
      { name: "DNS & Deploy", level: 88, color: "matrix-green" },
    ],
  },
  {
    category: "DEVOPS",
    skills: [
      { name: "Vercel", level: 93, color: "matrix-green" },
      { name: "Hostinger", level: 86, color: "matrix-green" },
      { name: "CI/CD", level: 75, color: "matrix-green-bright" },
      { name: "DNS & Domínios", level: 78, color: "matrix-green-bright" },
      { name: "UI/UX & Performance", level: 95, color: "matrix-green-bright" },
    ],
  },
];

/* ===== IntersectionObserver para disparar animações ===== */
onMounted(() => {
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        // dispara animações das barras com pequenos delays randômicos
        skillCategories.forEach((cat) => {
          cat.skills.forEach((skill) => {
            const delay = Math.random() * 1000;
            setTimeout(
              () => animateValue(skill.name, 0, skill.level, 1500),
              delay
            );
          });
        });
      }
    },
    { threshold: 0.3 }
  );

  if (sectionEl.value) obs.observe(sectionEl.value);
  onUnmounted(() => {
    if (sectionEl.value) obs.unobserve(sectionEl.value);
  });
});

/* ===== animação de valores (easeOutCubic) ===== */
const rafIds = new Map(); // para limpar se necessário

function animateValue(key, start, end, duration) {
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * easeOutCubic);

    animatedValues.value = { ...animatedValues.value, [key]: current };

    if (progress < 1) {
      const id = requestAnimationFrame(step);
      rafIds.set(key, id);
    } else {
      rafIds.delete(key);
    }
  };

  const id = requestAnimationFrame(step);
  rafIds.set(key, id);
}

onUnmounted(() => {
  // cleanup de possíveis RAF pendentes
  rafIds.forEach((id) => cancelAnimationFrame(id));
  rafIds.clear();
});

/* ===== classes de cor para a barra ===== */
function barColorClass(token) {
  switch (token) {
    case "matrix-green-bright":
      return "progress__bar--bright";
    case "matrix-green":
      return "progress__bar--green";
    default:
      return "progress__bar--green";
  }
}

const START_YEAR = 2022
const yearsExperience = computed(() => {
  const y = new Date().getFullYear() - START_YEAR
  return Math.max(0, y)
})
</script>

<template>
  <section id="skills" ref="sectionEl" class="section skills">
    <div class="container skills__container">
      <!-- Header -->
      <header class="skills__header">
        <span class="skills__tag">[HABILIDADES.JSON]</span>
        <h2 class="cyber-title skills__title glitch" :data-text="'TECH STACK'">
          TECH STACK
        </h2>
        <p class="skills__subtitle">
          Tecnologias e ferramentas que domino para criar soluções robustas e
          escaláveis.
        </p>
      </header>

      <!-- Grid de categorias -->
      <div class="skills__grid">
        <article
          v-for="(category, cIdx) in skillCategories"
          :key="category.category"
          class="card--matrix skill-card"
          :class="{ 'is-visible': isVisible }"
          :style="{ animationDelay: cIdx * 200 + 'ms' }"
        >
          <!-- Cabeçalho da categoria -->
          <div class="skill-card__head">
            <span class="skill-card__dot"></span>
            <h3 class="skill-card__cat">{{ category.category }}</h3>
          </div>

          <!-- Lista de skills -->
          <div class="skill-card__list">
            <div
              v-for="(skill, sIdx) in category.skills"
              :key="skill.name"
              class="skill"
            >
              <div class="skill__row">
                <span class="skill__name">{{ skill.name }}</span>
                <div class="skill__meta">
                  <span class="skill__value"
                    >{{ animatedValues[skill.name] || 0 }}%</span
                  >
                  <span class="skill__dot"></span>
                </div>
              </div>

              <!-- Barra de progresso -->
              <div class="progress">
                <div class="progress__track">
                  <div
                    class="progress__bar"
                    :class="barColorClass(skill.color)"
                    :style="{ width: (animatedValues[skill.name] || 0) + '%' }"
                  >
                    <div class="progress__glow" />
                  </div>
                </div>
                <div
                  class="progress__indicator"
                  :style="{ left: (animatedValues[skill.name] || 0) + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Terminalzinho da categoria -->
          <div class="skill-card__terminal">
            <div class="skill-card__term-line">
              <span class="skill-card__prompt">→</span>
              <span class="skill-card__cmd"
                >npm install {{ category.category.toLowerCase() }}-tools</span
              >
            </div>
            <div class="skill-card__term-hint">
              ✓ {{ category.skills.length }} packages installed
            </div>
          </div>
        </article>
      </div>

      <!-- Bloco resumo -->
      <div
        class="skills__summary"
        :class="{ 'is-visible': isVisible }"
        style="animation-delay: 600ms"
      >
        <div class="card--matrix summary">
          <div class="summary__head">
            <span class="summary__dot summary__dot--red"></span>
            <span class="summary__dot summary__dot--yellow"></span>
            <span class="summary__dot summary__dot--green"></span>
            <span class="summary__file">skills-summary.txt</span>
          </div>

          <div class="summary__grid">
            <div class="summary__item">
              <div class="summary__value">{{ yearsExperience }}+</div>
              <div class="summary__label">Anos de Experiência</div>
            </div>
            <div class="summary__item">
              <div class="summary__value">90+</div>
              <div class="summary__label">Projetos Entregues</div>
            </div>
            <div class="summary__item">
              <div class="summary__value">15+</div>
              <div class="summary__label">Tecnologias Dominadas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills {
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }
  &__tag {
    display: inline-block;
    font: 400 0.75rem/1 "Fira Code", monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(var(--matrix-green));
  }
  &__title {
    margin-top: 1rem;
    font-size: clamp(2rem, 6vw, 3.75rem);
    font-weight: 900;
  }
  &__subtitle {
    margin: 1rem auto 0;
    max-width: 42rem;
    color: hsl(var(--matrix-white) / 0.7);
    line-height: 1.6;
    font-size: 1.05rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__summary {
    margin-top: 4rem;
    opacity: 0;
    transform: translateY(24px);
    animation: fade-in-up 0.6s both;
    &.is-visible {
      opacity: 1;
      transform: none;
    }
  }
}

/* ===== Card de categoria ===== */
.skill-card {
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(24px);
  animation: fade-in-up 0.6s ease both; /* delay via inline style */

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  &__dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
    background: hsl(var(--matrix-green));
    margin-right: 0.75rem;
    animation: pulse 1.5s infinite ease-in-out;
  }
  &__cat {
    color: hsl(var(--matrix-green));
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 800;
    font-size: 1rem;
  }

  &__list {
    display: grid;
    gap: 1rem;
  }

  &__terminal {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--matrix-green) / 0.2);
    font: 400 0.8rem/1.5 "Fira Code", monospace;
    color: hsl(var(--matrix-green) / 0.7);
  }
  &__term-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  &__prompt {
    color: hsl(var(--matrix-green));
  }
  &__cmd {
    color: hsl(var(--matrix-white));
  }
  &__term-hint {
    color: hsl(var(--matrix-green) / 0.6);
  }
}

/* ===== Item de skill ===== */
.skill {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.35rem;
  }
  &__name {
    color: hsl(var(--matrix-white));
    font: 400 0.9rem/1.4 "Fira Code", monospace;
  }
  &__meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__value {
    color: hsl(var(--matrix-green));
    font: 400 0.8rem/1 "Fira Code", monospace;
  }
  &__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: hsl(var(--matrix-green));
    opacity: 0.5;
    transition: opacity 0.25s ease;
  }
}

/* ===== Progress bar ===== */
.progress {
  position: relative;
  height: 0.5rem;

  &__track {
    width: 100%;
    height: 100%;
    background: hsl(var(--matrix-dark));
    border: 1px solid hsl(var(--matrix-green) / 0.2);
    border-radius: var(--radius);
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    transition: width 1s ease-out;
    position: relative;

    &--green {
      background: linear-gradient(
        90deg,
        hsl(var(--matrix-green)),
        hsl(var(--matrix-green))
      );
    }
    &--bright {
      background: linear-gradient(
        90deg,
        hsl(var(--matrix-green)),
        hsl(var(--matrix-green-bright))
      );
    }

    .progress__glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent,
        hsl(var(--matrix-green-bright) / 0.5),
        transparent
      );
      animation: pulse 1.6s infinite;
      pointer-events: none;
    }
  }

  &__indicator {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background: hsl(var(--matrix-green-bright));
    box-shadow: 0 0 8px hsl(var(--matrix-green) / 0.6);
    transform: translateX(-1px); /* centraliza a linha sobre o fim da barra */
    transition: left 1s ease-out;
  }
}

/* ===== Summary ===== */
.summary {
  padding: 1.5rem;

  &__head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  &__dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    &--red {
      background: hsl(var(--matrix-red));
    }
    &--yellow {
      background: hsl(50 100% 50%);
    }
    &--green {
      background: hsl(var(--matrix-green));
    }
  }
  &__file {
    margin-left: 0.75rem;
    color: hsl(var(--matrix-gray));
    font: 400 0.85rem/1 "Fira Code", monospace;
  }

  &__grid {
    display: grid;
    gap: 1rem;
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    text-align: center;
  }
  &__value {
    color: hsl(var(--matrix-green));
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }
  &__label {
    color: hsl(var(--matrix-white) / 0.7);
  }
}

/* ===== Animations ===== */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>
