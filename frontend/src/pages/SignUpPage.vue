<script setup lang="js">
import { ref } from "vue";
import GuestLayout from "../components/GuestLayout.vue";
import axiosClient from "../axios";

const data = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref([])

async function submit() {
  try {
    // obtener el token CSRF
    await axiosClient.get('/sanctum/csrf-cookie');

    // enviar la solicitud de registro
    await axiosClient.post('/register', data.value);

    alert("¡Register Successfully!");
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errors.value = { general: ["Something went wrong."] };
    }
  }
}
</script>

<template>
  <GuestLayout>
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Create New Account
    </h2>

    <!-- errors message -->
    <div
      v-if="Object.keys(errors).length"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <ul>
        <li v-for="(errorMessages, field) in errors" :key="field">
          <span v-for="(message, index) in errorMessages" :key="index">
            - {{ message }}
          </span>
        </li>
      </ul>
    </div>

    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit" class="space-y-4">
        <!-- fullname -->
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900"
            >Fullname</label
          >
          <div class="mt-2">
            <input
              name="name"
              id="name"
              required=""
              placeholder="Enter fullname"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="data.name"
            />
          </div>
        </div>

        <!-- email address -->
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              required=""
              placeholder="Enter your email address"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="data.email"
            />
          </div>
        </div>

        <!-- password -->
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              required=""
              placeholder="Enter password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="data.password"
            />
          </div>
        </div>

        <!-- password confirmation -->
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password_confirmation"
              class="block text-sm/6 font-medium text-gray-900"
              >Repeat password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              required=""
              placeholder="Repeat password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="data.password_confirmation"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm leading-6 text-gray-500">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </GuestLayout>
</template>
