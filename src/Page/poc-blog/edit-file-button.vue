<template>
    <div class="file-edit-button">
        <input type="file" ref="editFiles" class="edit-btn-files" :accept="accept" @change="fileChangeEvent"/>
        <div class="sd-action-btn-cnter"><v-btn small color="#01B4BB" class="white--text">edit</v-btn></div>
    </div>
</template>
<style scoped>
    .file-edit-button .sd-action-btn-cnter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .file-edit-button .edit-btn-files {
        width: 85px;
        position: relative;
        top: 33px;
        right: -30px;
        z-index: 2;
        opacity: 0;
    }

</style>

<script>
export default {
    props: {
        accept: String
    },
    methods: {
        fileChangeEvent(event) {
            this.$emit('onFileChange', event);
        }
    }
}
</script>


