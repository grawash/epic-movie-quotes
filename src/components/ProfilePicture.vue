<template>
  <div class="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-500">
    <img
      :src="props.source ? source : 'src/components/icons/image 1.jpg'"
      alt="smth"
      class="h-full w-full"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  source: String,
});
</script>

