<template>
  <div>
    <p> {{title}}</p>
    <va-slider class="flex" v-model="value">
      <template #append>
        <va-input type="number" v-model="value"></va-input>
      </template>
    </va-slider>
  </div>
</template>

<script>

export default {
  name: "Control Slider",
  data() {
    return {
      value: 45,
    }
  },
  props: {
    title: String,
  }
  
};
</script>

<style scoped lang="scss">

</style>
