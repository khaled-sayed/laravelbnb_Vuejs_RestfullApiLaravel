<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div class="loaded" v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr />
                        <article>
                            {{ bookable.description }}
                        </article>
                    </div>
                    <div class="loading" v-else>
                        Loading ...
                    </div>
                </div>
            </div>
            <ReviewList />
        </div>
        <div class="col-md-4">
            <Availability
                v-on:availabilty="checkPrice($event)"
                class="mb-4"
            ></Availability>
            <transition name="fade">
                <price-breakdown
                    v-if="price"
                    :price="price"
                    class="mb-4"
                ></price-breakdown>
            </transition>
            <transition name="fade">
                <button
                    type="button"
                    class="btn btn-outline-secondary btn-block"
                    v-if="price"
                    @click="addToBasket"
                    :disabled="inBasketAlready"
                >
                    Book Now
                </button>
            </transition>

            <button
                type="button"
                class="btn btn-outline-secondary btn-block"
                v-if="inBasketAlready"
                @click="removeFromBasket"
            >
                Remove from basket
            </button>

            <div v-if="inBasketAlready" class="mt-4 text-muted warning">
                Seems like you've added this object to basket already. If you
                want to change dates, remove from the basket first.
            </div>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState, mapGetters } from "vuex";
export default {
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null
        };
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`).then(res => {
            this.bookable = res.data;
            this.loading = false;
        });
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch",
            inBasketAlready(state) {
                if (null == this.bookable) {
                    return false;
                }

                return state.basket.items.reduce(
                    (result, item) =>
                        result || item.bookable.id == this.bookable.id,
                    false
                );
            },
            inBasketAlreadyFromGetters() {
                if (null == this.bookable) {
                    return false;
                }

                return this.$store.getters.inBasketAlready(this.bookable.id);
            }
        })
    },
    methods: {
        async checkPrice(hasAvailaility) {
            if (!hasAvailaility) {
                this.price = null;
                return;
            }

            try {
                this.price = (
                    await axios.get(
                        `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                    )
                ).data;
            } catch (err) {
                this.price = null;
            }
        },
        addToBasket() {
            this.$store.dispatch("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket() {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    }
};
</script>
