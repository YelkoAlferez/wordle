<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('authToken'); // Remove the token on logout
      this.$router.push({ name: 'Login' }); // Redirect to login page
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
