import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'

// Importa a configuração do i18n para suporte multi-idioma
import i18n from './i18n'

// Cria a aplicação Vue e registra o plugin i18n
createApp(App)
  .use(i18n) // Ativa internacionalização
  .mount('#app')
