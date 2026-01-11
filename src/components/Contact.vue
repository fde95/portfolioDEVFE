<script setup>
import { ref, onMounted, onUnmounted, h, defineComponent, computed } from "vue";
import { useI18n } from 'vue-i18n';

/* i18n para traduções */
const { t } = useI18n();

/* Visibilidade via IntersectionObserver */
const isVisible = ref(false);
const sectionEl = ref(null);

onMounted(() => {
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) isVisible.value = true;
    },
    { threshold: 0.3 }
  );
  if (sectionEl.value) obs.observe(sectionEl.value);
  onUnmounted(() => {
    if (sectionEl.value) obs.unobserve(sectionEl.value);
  });
});

/* Ícones (SVG inline) */
const Icon = defineComponent({
  name: "Icon",
  props: {
    name: { type: String, required: true },
    class: { type: String, default: "" },
    size: { type: Number, default: 20 },
  },
  setup(props) {
    const paths = {
      mail: [
        h("path", {
          d: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("polyline", {
          points: "22,6 12,13 2,6",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
      ],
      phone: [
        h("path", {
          d: "M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72c.12.9.33 1.77.64 2.6a2 2 0 0 1-.45 2.11L9.1 9.1a16 16 0 0 0 6 6l.67-.67a2 2 0 0 1 2.11-.45c.83.31 1.7.52 2.6.64A2 2 0 0 1 22 16.92z",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
      ],
      map: [
        h("polygon", {
          points: "1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("line", {
          x1: 8,
          y1: 3,
          x2: 8,
          y2: 18,
          stroke: "currentColor",
          "stroke-width": 2,
        }),
        h("line", {
          x1: 16,
          y1: 6,
          x2: 16,
          y2: 21,
          stroke: "currentColor",
          "stroke-width": 2,
        }),
      ],
      github: [
        h("path", {
          d: "M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.11.79-.25.79-.56v-2.03c-3.23.7-3.91-1.41-3.91-1.41-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.75.41-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.73 0-1.27.46-2.31 1.21-3.13-.12-.3-.53-1.52.11-3.17 0 0 .99-.32 3.24 1.2a11.3 11.3 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.64 1.65.23 2.87.11 3.17.75.82 1.21 1.86 1.21 3.13 0 4.45-2.72 5.43-5.31 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
          fill: "currentColor",
        }),
      ],
      linkedin: [
        h("path", {
          d: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
          fill: "currentColor",
        }),
      ],
      instagram: [
        h("path", {
          d: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
          fill: "currentColor",
        }),
      ],
    };
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox:
            props.name === "linkedin" || props.name === "instagram"
              ? "0 0 16 16"
              : "0 0 24 24",

          width: props.size,
          height: props.size,
          class: props.class,
        },
        paths[props.name] || []
      );
  },
});

/**
 * Dados de contato traduzidos dinamicamente
 * Usa computed para reagir a mudanças de idioma
 */
const contactInfo = computed(() => [
  {
    icon: "mail",
    label: t('contact.info.email'),
    value: "contato@devfe.com.br",
    link: "mailto:contato@devfe.com.br",
  },
  {
    icon: "phone",
    label: t('contact.info.phone'),
    value: "+55 (11) 97897-3663",
    link: "https://api.whatsapp.com/send/?phone=5511978973663&text=Ol%C3%A1+Felipe%2C+venho+atrav%C3%A9s+do+seu+portf%C3%B3lio+e+gostaria+de+conversar+sobre+um+projeto.&type=phone_number&app_absent=0",
  },
  { icon: "map", label: t('contact.info.location'), value: t('contact.info.locationValue'), link: null },
]);

const socialLinks = [
  {
    icon: "github",
    name: "GitHub",
    url: "https://github.com/fde95",
    username: "@fde95",
  },
  {
    icon: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/felipe-domingues-espinoza/",
    username: "/in/felipe-domingues-espinoza",
  },
  {
    icon: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/fde.95/",
    username: "@fde.95",
  },
];
</script>

<template>
  <section id="contact" ref="sectionEl" class="section contact">
    <div class="container contact__container">
      <!-- Header -->
      <header class="contact__header">
        <span class="contact__tag">{{ t('contact.tag') }}</span>
        <h2
          class="cyber-title contact__title glitch"
          :data-text="t('contact.title')"
        >
          {{ t('contact.title') }}
        </h2>
        <p class="contact__subtitle">
          {{ t('contact.subtitle') }}
        </p>
      </header>

      <div class="contact__grid">
        <!-- COLUNA ESQUERDA: Informações + Status -->
        <div
          class="contact__col contact__col--left"
          :class="{ 'is-visible': isVisible }"
        >
        
          <!-- Status.log -->
          <div class="card--matrix contact-status">
            <div class="contact-status__head">
              <span class="contact-status__dot contact-status__dot--red"></span>
              <span
                class="contact-status__dot contact-status__dot--yellow"
              ></span>
              <span
                class="contact-status__dot contact-status__dot--green"
              ></span>
              <span class="contact-status__file">status.log</span>
            </div>

            <div class="contact-status__body">
              <div class="contact-status__line">
                <span class="contact-status__led"></span>
                <span class="contact-status__ok">{{ t('contact.status.online') }}</span>
              </div>
              <div class="contact-status__hint">
                → {{ t('contact.status.available') }}
              </div>
              <div class="contact-status__hint">→ {{ t('contact.status.response') }}</div>
              <div class="contact-status__hint">
                → {{ t('contact.status.timezone') }}
              </div>
            </div>
          </div>

          <!-- Informações de Contato -->
          <div class="card--matrix contact-card">
            <h3 class="contact-card__title">{{ t('contact.info.title') }}</h3>

            <div class="contact-card__list">
              <div
                v-for="(info, idx) in contactInfo"
                :key="idx"
                class="contact-item"
              >
                <div class="contact-item__iconbox">
                  <Icon :name="info.icon" class="contact-item__icon" />
                </div>
                <div class="contact-item__body">
                  <div class="contact-item__label">{{ info.label }}</div>

                  <template v-if="info.link">
                    <a
                      :href="info.link"
                      class="contact-item__value contact-item__value--link"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ info.value }}</a
                    >
                  </template>
                  <template v-else>
                    <div class="contact-item__value">{{ info.value }}</div>
                  </template>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- COLUNA DIREITA: Redes Sociais -->
        <div
          class="contact__col contact__col--right"
          :class="{ 'is-visible': isVisible }"
        >
          <div class="card--matrix contact-card">
            <h3 class="contact-card__title">{{ t('contact.socials') }}</h3>

            <div class="social-list">
              <a
                v-for="(s, idx) in socialLinks"
                :key="idx"
                class="social"
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Abrir ${s.name} de ${s.username}`"
              >
                <div class="social__iconbox">
                  <Icon :name="s.icon" class="social__icon" />
                </div>
                <div class="social__body">
                  <div class="social__name">{{ s.name }}</div>
                  <div class="social__user">{{ s.username }}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- /grid -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact {
    &-status{
        margin-bottom: 1rem;
    }
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
    align-items: center;
    gap: 3rem;
    grid-template-columns: 1fr;
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__col {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    &.is-visible {
      opacity: 1;
      transform: none;
    }

    &--right {
      /* leve variação no efeito para a direita */
      transform: translateX(24px);
      &.is-visible {
        transform: none;
      }
    }
  }
}

/* Cartão genérico da coluna */
.contact-card {
  padding: 2rem;

  &__title {
    color: hsl(var(--matrix-green));
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 800;
    margin-bottom: 1.25rem;
  }

  &__list {
    display: grid;
    gap: 1rem;
  }
}

/* Item de contato */
.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__iconbox {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border: 1px solid hsl(var(--matrix-green) / 0.3);
    border-radius: var(--radius);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  &__icon {
    width: 1.2rem;
    height: 1.2rem;
    color: hsl(var(--matrix-green));
  }
  &__body {
    display: grid;
    gap: 0.15rem;
  }
  &__label {
    font: 400 0.75rem/1 "Fira Code", monospace;
    color: hsl(var(--matrix-gray));
    text-transform: uppercase;
  }
  &__value {
    color: hsl(var(--matrix-white));
  }
  &__value--link {
    color: hsl(var(--matrix-white));
    transition: color 0.25s ease;
    &:hover {
      color: hsl(var(--matrix-green));
    }
  }

  &:hover .contact-item__iconbox {
    border-color: hsl(var(--matrix-green));
    box-shadow: var(--shadow-matrix);
  }
}

/* Status log */
.contact-status {
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

  &__body {
    font: 400 0.85rem/1.6 "Fira Code", monospace;
    display: grid;
    gap: 0.35rem;
  }
  &__line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__led {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: hsl(var(--matrix-green));
    animation: pulse 1.5s infinite ease-in-out;
  }
  &__ok {
    color: hsl(var(--matrix-green));
  }
  &__hint {
    color: hsl(var(--matrix-white) / 0.7);
    font-size: 0.8rem;
  }
}

/* Socials */
.social-list {
  display: grid;
  gap: 0.75rem;
}
.social {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: background-color 0.25s ease;

  &:hover {
    background: hsl(var(--matrix-green) / 0.05);
  }

  &__iconbox {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border: 1px solid hsl(var(--matrix-green) / 0.3);
    border-radius: var(--radius);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  &__icon {
    width: 1.1rem;
    height: 1.1rem;
    color: hsl(var(--matrix-green));
  }
  &__body {
    display: grid;
  }
  &__name {
    color: hsl(var(--matrix-white));
    font-weight: 600;
    transition: color 0.25s ease;
  }
  &__user {
    color: hsl(var(--matrix-gray));
    font: 400 0.8rem/1 "Fira Code", monospace;
  }

  &:hover .social__iconbox {
    border-color: hsl(var(--matrix-green));
    box-shadow: var(--shadow-matrix);
  }
  &:hover .social__name {
    color: hsl(var(--matrix-green));
  }
}

/* Pequena animação usada nos LEDs */
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
