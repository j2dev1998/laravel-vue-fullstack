<script setup>
const images = [
  {
    id: 1,
    label: "label 1",
    url: "/assets/img/bg.jpg",
  },

  {
    id: 2,
    label: "label 2",
    url: "/assets/img/bg.jpg",
  },

  {
    id: 3,
    label: "label 3",
    url: "/assets/img/bg.jpg",
  },
];
</script>

<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">My images</h1>
    </div>
  </header>
  <main>
    <div
      class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-center items-center gap-5"
    >
      <!-- images -->
      <div
        v-for="image in images"
        :key="image.id"
        class="max-w-sm rounded overflow-hidden shadow-lg"
      >
        <img class="w-full" :src="image.url" alt="Sunset in the mountains" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ image.label }}</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#photography</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#travel</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#winter</span
          >
        </div>
      </div>
    </div>
  </main>
</template>
