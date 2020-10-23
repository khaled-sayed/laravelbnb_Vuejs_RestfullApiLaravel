import VueRouter from "vue-router"
import Bookables from "./bookables/Bookables.vue"
import Bookable from "./bookable/Bookable.vue"
import Review from "./review/Review.vue"
import Basket from "./basket/Basket.vue"
import Login from "./auth/Login.vue"
import Register from "./auth/Register.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Bookables
    },
    {
        path: '/bookable/:id',
        name: 'bookable',
        component: Bookable
    },
    {
        path: '/review/:id',
        name: 'review',
        component: Review
    },
    {
        path: '/basket',
        name: 'basket',
        component: Basket
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login
    },
    {
        path: '/auth/register',
        name: 'register',
        component: Register
    }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

export default router