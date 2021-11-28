import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faFilter,
  faFunnelDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { Directive } from "./directives/detect-viewport";
import VueVirtualScroller from "vue-virtual-scroller";

library.add(faArrowUp, faArrowDown, faFilter, faFunnelDollar);

Vue.config.productionTip = false;
Vue.directive("detect-viewport", Directive);

Vue.use(VueVirtualScroller);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
