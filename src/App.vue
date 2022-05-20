<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <PdfjsTest></PdfjsTest>
</template>

<script>
import {createRouter,createWebHashHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import PdfjsTest from "@/components/PdfjsTest";
const router = createRouter({
  history: createWebHashHistory(),
  routes:[]
})
export default {
  name: 'App',
  components: {
    HelloWorld,
    PdfjsTest
  },
  router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
