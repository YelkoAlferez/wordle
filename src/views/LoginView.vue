<template>
  <section class="">
    <div
      class="flex flex-row items-center justify-center mx-auto md:h-screen lg:py-0"
    >
      <div v-if="width > 900" class="bg-[#d8dce0] rounded-e-xl w-3/5 h-full">
        <div
          class="h-full bg-[url('/src/assets/images/wordle_big_animation2.gif')] bg-cover bg-center bg-no-repeat"
        />
      </div>
      <div :class="{ 'w-3/6': width > 900, 'w-100': width <= 900 }">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
          <div
            href="/"
            class="mb-6 w-full sm:max-w-md rounded-xl text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              src="/src/assets/images/images.png"
              alt="Innpark logo"
              class="w-100 m-auto"
            />
          </div>
          <div class="w-full dark:md:mt-0 sm:max-w-md xl:p-0">
            <div class="space-y-4 md:space-y-6">
              <div>
                <h1
                  class="text-2xl leading-9 tracking-tight text-font-50 md:text-2xl text-gray-500 dark:text-white"
                >
                  Bienvenido/a
                </h1>
                <p
                  class="text-sm font-light text-gray-500 pt-2 dark:text-gray-400"
                >
                  Inicia sesión para acceder a tu cuenta
                </p>
              </div>
              <form
                class="space-y-4 md:space-y-6"
                v-csrf-token
                @submit.prevent="login"
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm text-font-50 dark:text-white"
                    >Correo electrónico</label
                  >
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    name="email"
                    class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-wordleGreen focus:border-wordleGreen block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="mi.nombre@dominio.com"
                    required
                  />
                </div>
                <div>
                  <!-- <label
                    for="password"
                    class="block mb-2 text-sm text-font-50 dark:text-white"
                    >Contraseña</label
                  > -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <label
                          for="password"
                          class="block mb-2 text-sm text-font-50 dark:text-white"
                          >Contraseña</label
                        >
                      </div>
                    </div>
                  </div>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-wordleGreen focus:border-wordleGreen block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-wordleGreen hover:bg-wordleGreen focus:ring-4 focus:outline-none focus:ring-wordleGreen-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-wordleGreen dark:hover:bg-wordleGreen dark:focus:ring-wordleGreen"
                >
                  Iniciar sesión
                </button>
                <div class="flex items-start">
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-font-50 dark:text-font-50"
                      >No tienes cuenta?
                      <a
                        href="/admin/legal"
                        class="text-sm mb-2 text-wordleGreen hover:underline dark:text-wordleGreen"
                        >Registrate</a
                      ></label
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser'

const email = ref('')
const password = ref('')
const width = window.innerWidth
const router = useRouter()
const user = useUser()
const endpoint = 'http://wordle.api.yelkoalferez.es/api/login'
// const endpoint = 'http://127.0.0.1:8000/api/login'

async function login() {
  console.log(email.value, password.value)
  try {
    const method = 'POST'
    const resp = await fetch(endpoint, {
      method: method,
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await resp.json()

    if (json.retCode == 200) {
      localStorage.setItem('authToken', 'guniguni')
      user.setUser(json.id, json.name, json.email)
      router.push('/home')
    } else {
      Swal.fire({
        title: 'Inicio de sesión incorrecto',
        icon: 'error',
        text: 'Credenciales incorrectas, intentalo de nuevo',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
