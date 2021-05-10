<script lang="ts">
import { defineComponent, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { params, query } = route;
    const { path } = params;
    router.replace({ path: '/' + path, query });
  },
  render() {
    return null; // avoid warning message
  },
});
</script>
