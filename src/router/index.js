import Vue from "vue";
import VueRouter from "vue-router";
import SimpleTableWrapper from "../views/SimpleTableWrapper.vue";
import SimpleTableWrapperF from "../views/SimpleTableWrapperF.vue";
import VirtuaScrollWrapper from "../views/VirtualScrollWrapper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About-F.vue"),
  },
  {
    path: "/simple",
    name: "Simple",
    component: SimpleTableWrapper,
    props: true,
  },
  {
    path: "/simpleF",
    name: "SimpleF",
    component: SimpleTableWrapperF,
    props: true,
  },
  {
    path: "/virtual",
    name: "Virtual",
    component: VirtuaScrollWrapper,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
