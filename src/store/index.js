import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isEdit: false,
    isSearch: 0,
    results: [],
    errorState: false,
    user:[],
  },
  mutations: {
    newUser(state) {
      state.user = [
        {
          firstName: "",
          lastName: "",
          company: "",
          jobTitle: "",
          phone: "",
          email: "",
          interests: "",
          status:null,
        },
      ];
    },
    setCookie(state, { name, value, day }) {
      const expires = new Date(Date.now() + day * (1000 * 60 * 60 * 24));
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; expires=${expires.toUTCString()}; path=/`;
    },
    generateToken(state) {
      const token = Math.random().toString(36).substr(2, 9);
      this.commit("setCookie", { name: "userToken", value: token, days: 1 });
      state.errorState = false;
    },
    deleteCookie() {
      this.commit("setCookie", { name: "userToken", value: "", days: -1 });
    },
  },
});
