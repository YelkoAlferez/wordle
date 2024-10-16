<script setup lang="ts">
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

Swal.fire({
  title: 'Bienvenido a WORDLE IBC',
  html: `
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
        `,
  inputAttributes: {
    autocapitalize: 'off',
  },
  showCancelButton: true,
  confirmButtonText: 'Iniciar sesión',
  cancelButtonText: 'Cancelar',
  showLoaderOnConfirm: true,
  preConfirm: async login => {
    try {
      const githubUrl = `
        https://api.github.com/users/${login}
      `
      const response = await fetch(githubUrl)
      if (!response.ok) {
        return Swal.showValidationMessage(`
          ${JSON.stringify(await response.json())}
        `)
      }
      return response.json()
    } catch (error) {
      Swal.showValidationMessage(`
        Request failed: ${error}
      `)
    }
  },
  allowOutsideClick: () => !Swal.isLoading(),
}).then(result => {
  if (result.isConfirmed) {
    Swal.fire({
      title: `${result.value.login}'s avatar`,
      imageUrl: result.value.avatar_url,
    })
  }
})

defineProps<{
  msg: string
}>()
</script>
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite GUAGA</a>
      + <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
