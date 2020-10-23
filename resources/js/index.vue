<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }"
                >LaravelBnb</router-link
            >
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="btn nav-button" :to="{ name: 'basket' }"
                        >Basket
                        <span
                            v-if="itemsInBasket"
                            class="badge badge-secondary"
                            >{{ itemsInBasket }}</span
                        >
                    </router-link>
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{ name: 'register' }" class="nav-link"
                        >Register</router-link
                    >
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{ name: 'login' }" class="nav-link"
                        >Sign-in</router-link
                    >
                </li>

                <li class="nav-item" v-if="isLoggedIn">
                    <a class="nav-link" href="#" @click.prevent="logout"
                        >Logout</a
                    >
                </li>
            </ul>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
    name: "index",
    computed: {
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        }),
        ...mapState({
            isLoggedIn: "isLoggedIn"
        })
    },
    methods: {
        async logout() {
            try {
                await axios.post("/logout");
                this.$store.dispatch("logout");
            } catch (err) {
                this.$store.dispatch("logout");
            }
        }
    }
};
</script>
