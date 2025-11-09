<script setup>
import { ref, onMounted, onUnmounted, h, defineComponent } from "vue";

/* estado */
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref("home");
const scrollProgress = ref(0);
const mobileMaxHeight = "420px";

/* itens */
const navItems = [
  { id: "home", label: "INÍCIO", href: "#" },
  { id: "about", label: "SOBRE", href: "#about" },
  { id: "portfolio", label: "PROJETOS", href: "#portfolio" },
  { id: "skills", label: "SKILLS", href: "#skills" },
  { id: "contact", label: "CONTATO", href: "#contact" },
];

/* navegação suave */
function scrollTo(href) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }
  isMobileMenuOpen.value = false;
}
function handleMobileClick(href) {
  scrollTo(href);
  isMobileMenuOpen.value = false;
}

/* scroll e seção ativa */
let sectionObserver = null;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollProgress.value = Math.min(Math.max(pct, 0), 100);
}
function onScroll() {
  isScrolled.value = window.scrollY > 50;
  updateProgress();
}

function initSectionObserver() {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id") || "home";
          activeSection.value = id;
        }
      });
    },
    {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  navItems.forEach(({ id }) => {
    if (id === "home") return;
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  initSectionObserver();
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  sectionObserver?.disconnect();
});

/* ícones inline */
const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 22 },
  },
  setup(props) {
    const paths = {
      menu: [
        h("line", {
          x1: 3,
          y1: 6,
          x2: 21,
          y2: 6,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
        h("line", {
          x1: 3,
          y1: 12,
          x2: 21,
          y2: 12,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
        h("line", {
          x1: 3,
          y1: 18,
          x2: 21,
          y2: 18,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
      ],
      close: [
        h("line", {
          x1: 18,
          y1: 6,
          x2: 6,
          y2: 18,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
        h("line", {
          x1: 6,
          y1: 6,
          x2: 18,
          y2: 18,
          stroke: "currentColor",
          "stroke-width": 2,
          "stroke-linecap": "round",
        }),
      ],
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
    };
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          width: props.size,
          height: props.size,
          class: props.class,
        },
        paths[props.name]
      );
  },
});
</script>

<template>
  <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <div class="container nav__container">
      <!-- Logo -->
      <button
        class="nav__brand button-none"
        @click="scrollTo('#')"
        aria-label="Ir ao topo"
      >
        <Icon name="terminal" class="nav__brand-icon" />
        <span class="nav__brand-name">DEV.EXE</span>
      </button>

      <!-- Links (desktop) -->
      <div class="nav__links">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav__link button-none"
          :class="{ 'is-active': activeSection === item.id }"
          @click="scrollTo(item.href)"
        >
          {{ item.label }}
          <span class="nav__link-underline"></span>
          <span class="nav__link-glow"></span>
        </button>
      </div>

      <!-- CTA (desktop) -->
      <div class="nav__cta">
        <button
          class="button--matrix nav__cta-btn"
          @click="scrollTo('#contact')"
        >
          CONTRATAR
        </button>
      </div>

      <!-- Toggle (mobile) -->
      <button
        class="nav__toggle button-none"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="nav-mobile"
      >
        <Icon
          :name="isMobileMenuOpen ? 'close' : 'menu'"
          class="nav__toggle-icon"
        />
      </button>
    </div>

    <!-- Menu (mobile) -->
    <div
      id="nav-mobile"
      class="nav__mobile"
      :class="{ 'is-open': isMobileMenuOpen }"
      :style="{ maxHeight: isMobileMenuOpen ? mobileMaxHeight : '0px' }"
    >
      <div class="nav__mobile-inner">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav__mobile-link button-none"
          :class="{ 'is-active': activeSection === item.id }"
          @click="handleMobileClick(item.href)"
        >
          {{ item.label }}
        </button>

        <div class="nav__mobile-cta">
          <button
            class="button--matrix nav__mobile-cta-btn"
            @click="handleMobileClick('#contact')"
          >
            CONTRATAR AGORA
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Barra de progresso de scroll -->
  <div class="nav-progress">
    <div
      class="nav-progress__bar"
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
$bp-md: 768px;
.button-none {
  border: none;
}
.nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    backdrop-filter 0.3s ease;
  background: transparent;

  &--scrolled {
    background: hsla(var(--matrix-black), 0.95);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid hsl(var(--matrix-green) / 0.2);
  }

  &__container {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* brand */
  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: hsl(var(--matrix-green));
    transition: color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green-bright));
    }
  }
  &__brand-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  &__brand-name {
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  /* links desktop */
  &__links {
    display: none;
    gap: 2rem;
    align-items: center;
    @media (min-width: $bp-md) {
      display: flex;
    }
  }
  &__link {
    position: relative;
    text-transform: uppercase;
    font: 400 0.8rem/1 "Fira Code", monospace;
    letter-spacing: 0.12em;
    color: hsl(var(--matrix-white) / 0.7);
    transition: color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green));
    }
    &.is-active {
      color: hsl(var(--matrix-green));
    }
  }
  &__link-underline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    background: hsl(var(--matrix-green));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    .nav__link:hover &,
    .nav__link.is-active & {
      transform: scaleX(1);
    }
  }
  &__link-glow {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: hsl(var(--matrix-green) / 0.1);
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: -1;
    .nav__link:hover &,
    .nav__link.is-active & {
      opacity: 1;
    }
  }

  /* CTA desktop */
  &__cta {
    display: none;
    @media (min-width: $bp-md) {
      display: block;
    }
  }
  &__cta-btn {
    padding: 0.45rem 0.8rem;
    font-size: 0.72rem;
  }

  /* toggle mobile */
  &__toggle {
    display: grid;
    place-items: center;
    color: hsl(var(--matrix-green));
    @media (min-width: $bp-md) {
      display: none;
    }
  }
  &__toggle-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  /* menu mobile */
  &__mobile {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.35s ease, opacity 0.35s ease;
    @media (min-width: $bp-md) {
      display: none;
    }
    background: hsla(var(--matrix-black), 0.95);
    border-top: 1px solid hsl(var(--matrix-green) / 0.2);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    &.is-open {
      opacity: 1;
    }
  }
  &__mobile-inner {
    padding: 1rem;
    display: grid;
    gap: 0.5rem;
  }
  &__mobile-link {
    text-align: left;
    text-transform: uppercase;
    font: 400 0.8rem/1 "Fira Code", monospace;
    letter-spacing: 0.12em;
    padding: 0.6rem 0.25rem;
    color: hsl(var(--matrix-white) / 0.7);
    border-left: 2px solid transparent;
    transition: color 0.25s ease, padding 0.25s ease, border-color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green));
      padding-left: 0.6rem;
    }
    &.is-active {
      color: hsl(var(--matrix-green));
      border-left-color: hsl(var(--matrix-green));
      padding-left: 0.6rem;
    }
  }
  &__mobile-cta {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid hsl(var(--matrix-green) / 0.2);
  }
  &__mobile-cta-btn {
    width: 100%;
    font-size: 0.75rem;
  }
}

/* barra de progresso */
.nav-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 40;
  background: hsl(var(--matrix-dark) / 0.5);
  &__bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      hsl(var(--matrix-green)),
      hsl(var(--matrix-green-bright))
    );
    box-shadow: 0 0 12px hsl(var(--matrix-green) / 0.6);
    transition: width 0.1s linear;
  }
}
</style>
