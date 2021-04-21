<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('xxxx');

const update = (evt: InputEvent) => {
  text.value = evt.target['value'];
};

const req = () => {
  fetch('/app/hello').then((res) => {
    res.text().then((text) => {
      alert(text);
    });
  });
};
</script>

<template>
  <div>输入了: {{ text }} !</div>
  <div><input :value="text" @input="update" /></div>
  <div><button @click="req">request</button></div>
</template>
