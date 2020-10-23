require('./bootstrap');

import VueRouter from 'vue-router'
import Vuex from "vuex"
import storeDef from "./store"
import router from "./routes"
import Index from "./index.vue" 
import StarReview from "./shared/commponets/StarRating.vue"
import FatalError from "./shared/commponets/FatalError.vue"
import Verrors from "./shared/commponets/ValidationError.vue"
import Success from "./shared/commponets/Success.vue"

window.Vue = require('vue');
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('star-review', StarReview);
Vue.component('fatal-error', FatalError);
Vue.component('v-errors', Verrors);
Vue.component('success', Success);

const store = new Vuex.Store(storeDef);

window.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (401 === error.response.status) {
            store.dispatch("logout");
        }

        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        Index
    },
    async  beforeCreate(){
        this.$store.dispatch('loadStoredState');
        this.$store.dispatch('loadUser');
    }
});
