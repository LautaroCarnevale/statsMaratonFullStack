<script setup>
import Header from "../src/components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>

  <div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
    <Header />
    <main class="container mx-auto px-4">
      <router-view />
    </main>
    <Footer />
  </div>

</template>
