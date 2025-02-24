<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../axios";
import SpinnerComponent from "../components/SpinnerComponent.vue";

const images = ref([]);
const isLoading = ref(false);

const copyUrl = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    console.log("URL copied to clipboard:", url);
  } catch (error) {
    console.error("Failed to copy URL:", error);
  }
};

const deleteImage = async (id) => {
  if (!confirm("Are you sure you want to delete this image ?")) return;

  isLoading.value = true;
  try {
    await axiosClient.delete(`/api/image/${id}`);
    images.value = images.value.filter((image) => image.id !== id);

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;

    console.log(`Error deleting image:`, error);
  }
};

onMounted(async () => {
  try {
    const resp = await axiosClient.get("api/image");
    images.value = resp.data;
  } catch (error) {
    console.log("failed to fetch images from API", error);
  }
});
</script>

<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">My images</h1>
    </div>
  </header>
  <main class="relative min-h-screen flex items-center justify-center">
    <!-- loader start -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-gray-600 opacity-90"
    >
      <SpinnerComponent />
    </div>
    <!-- loader end -->
    <div
      class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-center items-center gap-5"
    >
      <!-- images -->
      <div
        v-if="images.length > 0"
        v-for="image in images"
        :key="image.id"
        class="max-w-sm rounded overflow-hidden shadow-lg"
      >
        <img class="w-full h-64 bg-cover" :src="image.url" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ image.label }}</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <!-- delete -->
          <a @click="deleteImage(image.id)">
            <span
              class="inline-block bg-red-600 hover:bg-red-400 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer"
            >
              Delete
            </span>
          </a>

          <!-- copy url -->

          <a v-on:click="copyUrl(image.url)">
            <span
              class="inline-block bg-yellow-600 hover:bg-yellow-400 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer"
            >
              Copy url
            </span>
          </a>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-10">
        <h2 class="text-xl font-semibold">No images available</h2>
        <p class="text-gray-400">Try uploading some images to see them here.</p>
      </div>
    </div>
  </main>
</template>
