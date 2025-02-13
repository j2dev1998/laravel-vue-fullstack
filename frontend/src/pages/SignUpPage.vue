<script setup>
import { ref } from "vue";
import GuestLayout from "../components/GuestLayout.vue";

const data = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

function submit() {
  axiosClient.post("/register", data.value);
}
</script>

<template>
  <GuestLayout>
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Create New Account
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
              for="passwordConfirmation"
              class="block text-sm/6 font-medium text-gray-900"
              >Repeat password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              required=""
              placeholder="Repeat password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="data.passwordConfirmation"
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
