<template>
  <div
    @mousemove="resetTimer"
    @click="resetTimer"
    @keydown="resetTimer"
    tabindex="0"
    @scroll="resetTimer"
    class="no-outline"
  >
  <v-app>
      <v-app-bar app color="primary" dark v-if="!$store.state.errorState">
        <v-btn @click="openModal" icon large class="ml-1">
          <v-icon :size="45" color="secondary">mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu :close-on-content-click="false" :nudge-width="450" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              @click="$store.commit('newUser')"
              class="secondary mr-3 pa-4"
              small
            >
              <v-icon color="primary">mdi-magnify</v-icon>
            </v-btn>
          </template>
          <UserInputForm></UserInputForm>
        </v-menu>
      </v-app-bar>
      <v-main>
        <div class="d-flex">
          <transition name="fade">
            <AsideModal
              v-if="!$store.state.errorState && openAsideModal"
            ></AsideModal>
          </transition>
          <router-view class="mr-10" :class="{ 'ml-auto': !openAsideModal }" />
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AsideModal from "@/components/AsideModal.vue";
import UserInputForm from "./components/UserInputForm.vue";
export default {
  name: "App",
  components: {
    AsideModal,
    UserInputForm,
  },
  data() {
    return {
      openAsideModal: true,
      timeout: null,
    };
  },
  methods: {
    resetTimer() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$store.commit("deleteCookie");
        if (this.$route.path !== "/unknownPage") {
          this.$router.push("/unknownPage");
          this.$store.state.errorState = true;
        }
      }, 10000);
    },
    openModal() {
      this.openAsideModal = !this.openAsideModal;
    },
  },
  mounted() {
    this.$store.commit("generateToken");
    this.resetTimer();
    window.addEventListener("keydown", this.resetTimer);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.no-outline:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
