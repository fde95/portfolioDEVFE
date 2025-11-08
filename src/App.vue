<script setup>
import MatrixRain from './components/MatrixRain.vue';
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Skills from './components/Skills.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <MatrixRain/>
  <header>
    <Navbar/>
  </header>
  <main>
    <HeroSection/>
    <About/>
    <Portfolio />
    <Skills />
    <Contact />
    <Footer></Footer>
  </main>
  </template>

<style scoped lang="scss">

</style>
