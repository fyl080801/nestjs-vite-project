<script lang="ts" setup>
import { ref } from '@vue/reactivity';

const text = ref('');

const onInput = (evt) => {
  text.value = evt.target.value;
};
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <input :value="text" @input="onInput" />
  </div>
</template>
