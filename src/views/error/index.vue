<template>
  <a-result status="404" title="404" sub-title="此页面未找到。">
    <template #extra>
      <a-button type="primary" @click="back">返回上一级</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const back = () => {
      router.go(-2);
    };
    return {
      back,
    };
  },
});
</script>
