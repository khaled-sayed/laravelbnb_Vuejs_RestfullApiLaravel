<template>
    <div class="col-4 align-items-stretch d-flex mb-5">
        <div class="card w-100">
        <div class="card-body">
            <router-link :to="{name : 'bookable', params: {id} }">
                <h5 class="card-title">{{title}}</h5>
            </router-link>
                <p class="caed-text">{{description}}</p>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'description', 'id']
}
</script>