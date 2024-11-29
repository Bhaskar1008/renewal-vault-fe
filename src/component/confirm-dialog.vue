<template>
    <v-dialog v-model="show" max-width="290">
        <v-card>
            <v-card-title class="headline">{{title}}</v-card-title>
            <v-card-text>{{message}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="type == 'confirm'" color="green darken-1" flat="flat" @click="onDisagree">Cancel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="onAgree">{{btnName == 'Agree' ? 'Ok' : "Agree" }}</v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed: {
        title() {
            return this.getStore('getConfirmBox').title;
        },
        message() {
            return this.getStore('getConfirmBox').message;
        },
        show() {
            return this.getStore('getConfirmBox').show;
        },
        type() {
            return this.getStore('getConfirmBox').type;
        },
        btnName() {
            return this.type == 'confirm' ? 'Agree' : 'Ok'
        }
    },
    methods: {
        onAgree(event) {
            let obj = this.getStore('getConfirmBox');
            obj.show = false;
            this.commit('SHOW_CONFIRM_BOX', obj);
            this.$store.state.confirmBox.callback(1);
        },
        onDisagree(event) {
            let obj = this.getStore('getConfirmBox');
            obj.show = false;
            this.commit('SHOW_CONFIRM_BOX', obj);
            this.$store.state.confirmBox.callback(0);
        }
    }
}
</script>
