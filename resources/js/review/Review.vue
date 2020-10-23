<template>
    <div>
        <success v-if="success"></success>
        <fatal-error v-if="error"></fatal-error>
        <div class="row" v-if="!success && !error">
            <div
                :class="[
                    { 'col-md-4': loading || !alreadyReviewed },
                    { 'd-none': !loading && alreadyReviewed }
                ]"
            >
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">Loading ...</div>
                        <div v-if="hasBooking">
                            <p>
                                Stayed at
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: { id: booking.bookable.id }
                                    }"
                                    >{{ booking.bookable.title }}</router-link
                                >
                            </p>
                            <p>From {{ booking.from }} to {{ booking.to }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                :class="[
                    { 'col-md-8': loading || !alreadyReviewed },
                    { 'col-md-12': !loading && alreadyReviewed }
                ]"
            >
                <div v-if="loading">Loading ...</div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking!</h3>
                    </div>

                    <div v-else>
                        <div class="form-group">
                            <label class="text-muted"
                                >Select the star rating ( 1 is worst - 5 is best
                                )</label
                            >
                            <star-review
                                :rating="review.rating"
                                class="fa-3x"
                                v-on:rating-changed="review.rating = $event"
                            />
                        </div>

                        <div class="form-group">
                            <label for="content" class="text-muted"
                                >Describe your expririence with</label
                            >
                            <textarea
                                name="content"
                                class="form-control"
                                cols="30"
                                rows="10"
                                v-model.trim="review.content"
                                :class="[{ 'is-invalid': errorFor('content') }]"
                            ></textarea>
                            <v-errors :errors="errorFor('content')" />
                        </div>

                        <button
                            @click.prevent="submit"
                            :disabled="seending"
                            class="btn-primary btn-lg btn-block"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404, is422 } from "../shared/utils/response";
import validationError from "../shared/mixins/validationError";
export default {
    mixins: [validationError],
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null
            },
            existingReview: null,
            booking: null,
            loading: false,
            error: false,
            seending: false,
            success: false
        };
    },
    created() {
        this.review.id = this.$route.params.id;
        this.loading = true;
        axios
            .get(`/api/reviews/${this.review.id}`)
            .then(res => {
                this.existingReview = res.data;
            })
            .catch(err => {
                if (is404(err)) {
                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
                        .then(res => (this.booking = res.data))
                        .catch(err => {
                            if (!is404(err)) {
                                this.error = true;
                            }
                        });
                }
                this.error = true;
            })
            .then(response => {
                this.loading = false;
            });
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.hasBooking;
        },
        hasReview() {
            return this.existingReview != null;
        },
        hasBooking() {
            return this.booking != null;
        }
    },
    methods: {
        submit() {
            this.errors = null;
            this.seending = true;
            this.success = false;
            axios
                .post(`/api/reviews`, this.review)
                .then(res => {
                    this.success = 201 == res.status;
                })
                .catch(err => {
                    if (is422(err)) {
                        const errors = err.response.data.errors;

                        if (errors["content"] && 1 == _.size(errors)) {
                            this.errors = errors;
                            return;
                        }
                    }
                    this.error = true;
                })
                .then(() => (this.seending = false));
        }
    }
};
</script>
