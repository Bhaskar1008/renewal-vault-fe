<template>
  <div class="text-xs-center txt-loader" v-if="isLoading">
    <v-progress-circular :size="100" color="white" indeterminate
      >Loading...</v-progress-circular
    >
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ["isLoading"],
};
</script>

<style scoped>
.txt-loader {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  z-index: 9999;
  transform: translate(-50%, -50%) !important;
}

.v-progress-circular {
  margin: 1rem;
  box-shadow: 10px 10px 10px 1000px rgba(54, 48, 48, 0.5) !important;
  background-color: rgba(54, 48, 48, 0.5);
  width: 150px;
  overflow: hidden;
}
</style>