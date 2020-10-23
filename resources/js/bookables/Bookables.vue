<template>
    <div>
        <div class="container">
            <div v-if="loading" class="loeading text-center">Loading</div>
            <div class="row"  v-else>
            <BookableListItem v-for="item in items" :key="item.id" v-bind="item" />
            </div>
        
        </div>
    </div>    
</template>

<script>
import BookableListItem from "./BookableListItem"
export default {
    components: {
        BookableListItem
    },
    data(){
        return {
            items: null,
            loading: false
        }
    },
    created(){
        this.loading = true;
        
       const request =  axios.get('api/bookables').then(res => this.items = res.data);
       this.loading = false;

    }
}
</script>