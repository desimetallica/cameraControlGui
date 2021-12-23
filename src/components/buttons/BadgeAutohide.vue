<template>
  <div>
    <va-badge v-show="elementVisible" class="hideElement" text="Sent" color="success" />
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    timeout: Number,
  },
  data() {
    return {
      elementVisible: true,
    };
  },

  created() {
    setTimeout(() => this.elementVisible = false, this.timeout);
  },
};
</script>