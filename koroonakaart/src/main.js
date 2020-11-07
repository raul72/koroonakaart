import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import i18n from "./i18n";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import VueAnalytics from "vue-analytics";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";
import offlineExporting from "highcharts/modules/offline-exporting";
import exportData from "highcharts/modules/export-data";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

import mapInit from "highcharts/modules/map";
/* eslint-disable-next-line */
import motion from "./plugins/motion.js";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-material-design-icons/styles.css";

mapInit(Highcharts);
stockInit(Highcharts);
exportingInit(Highcharts);
offlineExporting(Highcharts);
exportData(Highcharts);
motion(Highcharts);

Vue.use(HighchartsVue);

Vue.config.productionTip = false;


// Configuration VueAnalytics
if (process.env.VUE_APP_GA_TRACKER) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GA_TRACKER,
	router,
  });
}

if (process.env.VUE_APP_SENTRY_DNS) {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DNS,
    integrations: [
      new VueIntegration({
        Vue,
        tracing: true,
      }),
      new Integrations.BrowserTracing(),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

export default new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
