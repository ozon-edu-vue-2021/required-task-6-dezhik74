<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">About</router-link>
      <router-link to="/simple">Простая</router-link>
    </div>
    <router-view :originalData="rows" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [],
    };
  },
  async created() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    this.rows = await res.json();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* width: 100%; */
  margin: 5px;
  padding: 12px;
  background-color: rgb(21, 112, 216);
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
