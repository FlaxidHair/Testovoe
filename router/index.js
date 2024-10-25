import Vue from "vue";
import VueRouter from "vue-router";
import UserTableList from "@/views/PageTableUsers.vue";
import UnknownPage from "@/views/unknownPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: UserTableList,
    name: "status-all",
  },
  {
    path: "/statusTrue",
    component: UserTableList,
    name: "status-true",
  },
  {
    path: "/statusFalse",
    component: UserTableList,
    name: "status-false",
  },
  {
    path: "/unknownPage",
    component: UnknownPage,
    name: "unknownPage",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
