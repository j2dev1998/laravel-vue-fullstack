<script setup>
import { ref } from "vue";
import GuestLayout from "../components/GuestLayout.vue";
import axiosClient from "../axios";
import router from "../router";
import SpinnerComponent from "../components/SpinnerComponent.vue";

const data = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);

const errors = ref({});

async function submit() {
  isLoading.value = true;
  try {
    // establecer cookie CSRF
    await axiosClient.get("/sanctum/csrf-cookie");

    // hacer la peticion de ingreso
    await axiosClient.post("/login", data.value);

    router.push({ name: "home" });

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;

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
      Sign in to your account
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

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="data.email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="data.password"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            v-if="!isLoading"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>

          <button
            v-if="isLoading"
            class="flex w-full justify-center rounded-md bg-indigo-600 opacity-75 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <SpinnerComponent />
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?
        {{ " " }}
        <RouterLink
          :to="{ name: 'signup' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Create an account</RouterLink
        >
      </p>
    </div>
  </GuestLayout>
</template>
