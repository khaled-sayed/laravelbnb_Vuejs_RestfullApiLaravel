<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <transition name="fade">
                <span v-if="noAvailability" class="text-danger"
                    >(NOT AVAILABLE)</span
                >
                <span v-if="hasAvailability" class="text-success"
                    >(AVAILABLE)</span
                >
            </transition>
        </h6>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    v-model="from"
                    @keyup.enter="check"
                    type="text"
                    name="from"
                    class="form-control form-control-sm"
                    placeholder="Start Date"
                    :class="[{ 'is-invalid': this.errorFor('from') }]"
                />
                <v-errors :errors="errorFor('from')" />
            </div>

            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    v-model="to"
                    @keyup.enter="check"
                    type="text"
                    name="to"
                    class="form-control form-control-sm"
                    placeholder="End Date"
                    :class="[{ 'is-invalid': this.errorFor('to') }]"
                />
                <v-errors :errors="errorFor('to')" />
            </div>
        </div>
        <button
            class="btn btn-secondary btn-block"
            @click="check"
            :disabled="loading"
        >
            <span v-if="!loading">Check!</span>
            <span v-if="loading"
                ><i class="fas fa-circle-notch fa-spin"></i> Checking ...</span
            >
        </button>
    </div>
</template>

<script>
import validationError from "../shared/mixins/validationError";
import { is422 } from "../shared/utils/response";
export default {
    mixins: [validationError],
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null
        };
    },
    methods: {
        async check() {
            this.loading = true;

            this.$store.dispatch("setLastSearch", {
                from: this.from,
                to: this.to
            });

            try {
                this.status = (
                    await axios.get(
                        `/api/bookables/${this.$route.params.id}/availability?from=${this.from}&to=${this.to}`
                    )
                ).status;
                this.$emit("availabilty", this.hasAvailability);
            } catch (err) {
                if (is422(err)) {
                    this.errors = err.response.data.errors;
                }
                this.status = err.response.status;
                this.$emit("availabilty", this.hasAvailability);
            }
            this.loading = false;
        }
    },
    computed: {
        hasErrors() {
            return 422 == this.status && this.errors != null;
        },
        hasAvailability() {
            return 200 == this.status;
        },
        noAvailability() {
            return 404 == this.status;
        }
    }
};
</script>

<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bolder;
}
</style>
