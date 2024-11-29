<template>
    <v-dialog v-model="show" hide-overlay persistent width="300">
        <v-card style="background-color:#07458E" dark>
            <v-card-text> 
                {{title}}
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    computed: {
        title() {
            return this.$store.getters.loader.title 
        },
        show() {
            return this.$store.getters.loader.bool 
        }
    }
}
</script>

