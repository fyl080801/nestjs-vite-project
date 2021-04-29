<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { params, query } = route;
    const { path } = params;
    router.replace({ path: '/' + path, query });
  },
  render: function (h) {
    return h(); // avoid warning message
  },
});
</script>
