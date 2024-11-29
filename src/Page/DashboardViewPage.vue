<template>
    <v-app>     
        <v-container grid-list-md text-xs-left>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card dark color="green lighten-3">
                        <v-card-title class="heading">
                            Something
                        </v-card-title>
                        <v-card-text class="px-2"></v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card dark color="orange">
                        <v-card-text class="px-2">3</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card dark color="pink lighten-2">
                        <v-card-text class="px-2">3</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card dark color="blue lighten-2">
                        <v-card-text class="px-2">3</v-card-text>
                    </v-card>
                </v-flex>
                
            </v-layout> 
        </v-container>     
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            cards: [{
                title: 'Dashboard',
                src: '/static/doc-images/cards/road.jpg',
                flex: 2
            }, {
                title: 'Best airlines',
                src: '/static/doc-images/cards/plane.jpg',
                flex: 2
            }]
        })
    }
</script>

<style scoped>
    @media (max-width: 360) {
        .user-col {
            flex-direction: column;
            flex-wrap: nowrap;
        }
    }
</style>