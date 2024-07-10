<template>
  <div class="modal__container" v-if="isVisible">
    <div class="modal">
      <div class="modal__title">{{ text }}</div>
      <button @click="accept(true)">Ok</button>
      <button @click="accept(false)">Cancel</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ConfirmationModal',
  data() {
    return {
      text: '',
      isVisible: false,
      resolvePromise: undefined,
      rejectPromise: undefined
    }
  },
  methods: {
    show(text) {
      this.text = text;
      this.isVisible = true;

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    accept(acception) {
      this.isVisible = false;

      this.resolvePromise(acception);
    },
  },
}
</script>
<style lang="scss" scoped>
.modal {
  &__container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
  }
  background-color: white;
  border-radius: 3%;
  box-shadow: 0px 0px 5px 1px grey;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 10px;

  &__title {
    margin-bottom: 10px;
  }
}
</style>
