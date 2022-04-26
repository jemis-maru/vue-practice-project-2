<template>
    <button class="primaryBtn" v-if="!danger">
        <slot></slot>
    </button>
    <button class="dangerBtn" v-else>
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    danger: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style scoped>
button{
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  margin-right: 0.5rem;
  color: #ffffff;
}

.primaryBtn{
  background-color: #0a8d3c;
  border: 1px solid #0a8d3c;
}

.dangerBtn{
  background-color: #ff0000;
  border: 1px solid #ff0000;
}

.primaryBtn:hover,
.primaryBtn:active {
  background-color: #bbebcd;
  border-color: #0a8d3c;
  color: #0a8d3c;
}

.dangerBtn:hover,
.dangerBtn:active {
  background-color: #ffbfbf;
  border: 1px solid #ff0000;
  color: #ff0000;
}
</style>