<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.addEventListener('unload', this.saveState)
    // console.log()
  },
  methods: {
    saveState() {
      console.log('-unload')
    }
  }
}
</script>
