<template>
    <div style="padding:1.25rem">
        <h6 class="text-uppercase font-weight-bolder text-secondary pt-4">
            Review List
        </h6>

        <div v-if="!loading">
            <div
                class="border-bottom d-none d-md-block"
                v-for="(review , index) in reviews"
                :key="index"
            >
                <div class="row pt-4">
                    <div class="col-md-6">
                        Khaled Sayed
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-review :rating="review.rating" class="fa-lg"></star-review>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">{{ review.created_at | fromNow}}</div>
                </div>

                <div class="row pt-4 pb-4">
                    <div class="col-md-12">{{review.content}}</div>
                </div>
            </div>
        </div>

        <div v-else>Loading ...</div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            loading: false,
            reviews: null
        };
    },
    created() {
        this.loading = true;

        axios
            .get(`/api/bookables/${this.$route.params.id}/reviews`)
            .then(res => {
                this.reviews = res.data;
            }).then(()=> (this.loading = false));
     },
     filters: {
         fromNow(val){
             return moment(val).fromNow();
         }
     }
};
</script>
