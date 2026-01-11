<script setup>
import { computed, h, defineComponent } from "vue";
import { useI18n } from 'vue-i18n';

/* i18n para traduções */
const { t } = useI18n();

/* data */
const currentYear = new Date().getFullYear();
const lastUpdate = new Date().toLocaleDateString("pt-BR");

const socialLinks = [
  { icon: "github", href: "https://github.com/fde95", label: "GitHub" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/fde95/", label: "LinkedIn" },
  { icon: "instagram", href: "https://www.instagram.com/fde.95/", label: "Instagram" },
];

/**
 * Links de navegação traduzidos dinamicamente
 */
const quickLinks = computed(() => [
  { label: t('nav.about'), href: "#about" },
  { label: t('nav.portfolio'), href: "#portfolio" },
  { label: t('nav.skills'), href: "#skills" },
  { label: t('nav.contact'), href: "#contact" },
]);

/* inline SVG icons (inclui LinkedIn com viewBox 16x16 fornecido e Instagram 16x16) */
const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 20 },
  },
  setup(props) {
    const paths = {
      terminal: [
        h("path", {
          d: "M4 17l6-5-6-5",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
        h("line", {
          x1: 12,
          y1: 19,
          x2: 20,
          y2: 19,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
      ],
      heart: [
        h("path", {
          d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z",
          fill: "currentColor",
        }),
      ],
      github: [
        h("path", {
          d: "M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.11.79-.25.79-.56v-2.03c-3.23.7-3.91-1.41-3.91-1.41-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.75.41-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.73 0-1.27.46-2.31 1.21-3.13-.12-.3-.53-1.52.11-3.17 0 0 .99-.32 3.24 1.2a11.3 11.3 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.64 1.65.23 2.87.11 3.17.75.82 1.21 1.86 1.21 3.13 0 4.45-2.72 5.43-5.31 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
          fill: "currentColor",
        }),
      ],
      // LinkedIn (SVG exato que você forneceu) — viewBox 16x16
      linkedin: [
        h("path", {
          d: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
          fill: "currentColor",
        }),
      ],
      // Instagram simples (16x16)
      instagram: [
        h("rect", {
          x: 1,
          y: 1,
          width: 14,
          height: 14,
          rx: 3,
          ry: 3,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("circle", {
          cx: 8,
          cy: 8,
          r: 3,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("circle", { cx: 12.5, cy: 3.5, r: 1, fill: "currentColor" }),
      ],
    };

    const viewBox = computed(() => {
      return props.name === "linkedin" || props.name === "instagram"
        ? "0 0 16 16"
        : "0 0 24 24";
    });

    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: viewBox.value,
          width: props.size,
          height: props.size,
          class: props.class,
        },
        paths[props.name] || []
      );
  },
});
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__grid">
        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__brand-row">
            <Icon name="terminal" class="footer__brand-icon" />
            <span class="footer__brand-name">DEVFE.EXE</span>
          </div>
          <p class="footer__brand-desc">
            {{ t('footer.brand.description') }}
          </p>

          <div class="footer__socials">
            <a
              v-for="(s, i) in socialLinks"
              :key="i"
              :href="s.href"
              class="footer__social"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
            >
              <Icon :name="s.icon" class="footer__social-icon" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <nav class="footer__nav">
          <h3 class="footer__title">{{ t('footer.nav') }}</h3>
          <ul class="footer__links">
            <li v-for="(l, i) in quickLinks" :key="i">
              <a :href="l.href" class="footer__link">{{ l.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Status -->
        <div class="footer__status">
          <h3 class="footer__title">{{ t('footer.status.title') }}</h3>
          <div class="footer__status-list">
            <div class="footer__status-row">
              <span class="footer__dot"></span>
              <span class="footer__status-text">{{ t('footer.status.available') }}</span>
            </div>
            <div class="footer__status-sub">{{ t('footer.status.location') }}</div>
            <div class="footer__status-sub">{{ t('footer.status.timezone') }}</div>
          </div>
        </div>
      </div>

      <!-- Terminal box -->
      <div class="card--matrix footer__terminal">
        <div class="footer__term-lines">
          <div class="footer__term-row">
            <span class="footer__prompt">user@portfolio:~$</span>
            <span class="footer__cmd">{{ t('footer.terminal.command') }}</span>
          </div>
          <div class="footer__term-hint">
            {{ t('footer.terminal.line1') }}
          </div>
          <div class="footer__term-hint">
            {{ t('footer.terminal.line2', { date: lastUpdate }) }}
          </div>
          <div class="footer__term-hint">{{ t('footer.terminal.line3') }}</div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <div class="footer__copy">
          <span>© {{ currentYear }} DEVFE.</span>
          <span>{{ t('footer.copyright.madeWith') }}</span>
          <Icon name="heart" class="footer__heart" /> <small>({{ t('footer.copyright.love') }})</small>
          <span>{{ t('footer.copyright.code') }}</span>
        </div>

        <div class="footer__stack">
          <span class="footer__stack-text">{{ t('footer.copyright.builtWith') }}</span>
          <div class="footer__online">
            <span class="footer__dot"></span>
            <span class="footer__online-text">{{ t('footer.copyright.online') }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  border-top: 1px solid hsl(var(--matrix-green) / 0.2);
  padding: 3rem 0;
  overflow: hidden;

  &__grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
    grid-template-columns: 1fr;
    @media (min-width: 900px) {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }

  /* Brand */
  &__brand-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  &__brand-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: hsl(var(--matrix-green));
  }
  &__brand-name {
    font-weight: 800;
    font-size: 1.1rem;
    color: hsl(var(--matrix-green));
  }
  &__brand-desc {
    color: hsl(var(--matrix-white) / 0.7);
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 34rem;
    margin-bottom: 1rem;
  }

  &__socials {
    display: flex;
    gap: 0.75rem;
  }
  &__social {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border: 1px solid hsl(var(--matrix-green) / 0.3);
    border-radius: var(--radius);
    transition: border-color 0.25s ease, box-shadow 0.25s ease,
      transform 0.25s ease;
    &:hover {
      border-color: hsl(var(--matrix-green));
      box-shadow: var(--shadow-matrix);
      transform: translateY(-2px);
    }
  }
  &__social-icon {
    color: hsl(var(--matrix-green));
    width: 1rem;
    height: 1rem;
  }

  /* Navegação */
  &__title {
    color: hsl(var(--matrix-green));
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 800;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
  &__links {
    display: grid;
    gap: 0.5rem;
  }
  &__link {
    color: hsl(var(--matrix-white) / 0.7);
    font: 400 0.9rem/1.3 "Fira Code", monospace;
    transition: color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green));
    }
  }

  /* Status */
  &__status-list {
    display: grid;
    gap: 0.7rem;
  }
  &__status-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: hsl(var(--matrix-green));
    animation: pulse 1.5s infinite ease-in-out;
  }
  &__status-text {
    color: hsl(var(--matrix-white) / 0.7);
    font: 400 0.9rem/1 "Fira Code", monospace;
  }
  &__status-sub {
    color: hsl(var(--matrix-white) / 0.7);
    font: 400 0.9rem/1 "Fira Code", monospace;
  }

  /* Terminal */
  &__terminal {
    padding: 1rem;
    margin: 2rem 0;
  }
  &__term-lines {
    font: 400 0.8rem/1.5 "Fira Code", monospace;
  }
  &__term-row {
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
    color: hsl(var(--matrix-green) / 0.7);
    margin-left: 1.5rem;
  }

  /* Bottom bar */
  &__bottom {
    padding-top: 1.5rem;
    border-top: 1px solid hsl(var(--matrix-green) / 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 900px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__copy {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: hsl(var(--matrix-white) / 0.7);
    font: 400 0.9rem/1 "Fira Code", monospace;
  }
  &__heart {
    width: 1rem;
    height: 1rem;
    color: hsl(var(--matrix-red));
    animation: pulse 1.3s infinite;
  }

  &__stack {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__stack-text {
    color: hsl(var(--matrix-white) / 0.7);
    font: 400 0.9rem/1 "Fira Code", monospace;
  }
  &__online {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  &__online-text {
    color: hsl(var(--matrix-green));
    font: 600 0.75rem/1 "Fira Code", monospace;
  }

  /* BG matrix code */
  &__bg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    opacity: 0.05;
    pointer-events: none;
    font: 400 0.75rem/1 "Fira Code", monospace;
    color: hsl(var(--matrix-green));
    display: grid;
    gap: 0.25rem;
  }
  &__bg-col {
    white-space: nowrap;
  }
  &__bg-char.is-bright {
    color: hsl(var(--matrix-green-bright));
  }
}

/* animação */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
