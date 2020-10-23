<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStar"
            :key="'full' + star"
            @click="$emit('rating-changed', star)"
        ></i>
        <i class="fas fa-star-half-alt" v-if="halfstar"></i>
        <i
            class="far fa-star"
            v-for="star in emptyStar"
            :key="'empty' + star"
            @click="$emit('rating-changed', fullStar + star)"
        ></i>
    </div>
</template>

<script>
export default {
    props: ["rating"],
    computed: {
        halfstar() {
            const fraction =
                Math.round(this.rating - Math.floor(this.rating)) * 100;

            return fraction > 0 && fraction < 50;
        },
        fullStar() {
            return Math.round(this.rating);
        },
        emptyStar() {
            return 5 - Math.ceil(this.rating);
        }
    }
};
</script>
