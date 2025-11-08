<script setup>
import MatrixRain from './components/MatrixRain.vue';
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
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
  </main>
  </template>

<style scoped lang="scss">

</style>
