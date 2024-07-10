<template>
  <main>
    <router-view />
  </main>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style lang="scss">
html {
  background-color: #f7eff5;
  main {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
