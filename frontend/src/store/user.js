import axiosClient from "../axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const resp = await axiosClient.get("/api/user");
        this.user = resp.data;
      } catch (error) {
        console.log(`Error getting user: ${error}`);
        this.user = null; // limpia el usuario en caso de error
      }
    },
  },
});
