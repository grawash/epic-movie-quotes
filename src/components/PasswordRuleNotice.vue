<template>
  <div
    class="p-6 border border-[#CED4DA] rounded-lg border-opacity-50 mt-9 max-w-[528px]"
  >
    <p>{{ $t("profilePage.should_contain") }}</p>
    <ul>
      <li class="flex items-center pt-4">
        <span
          class="before:content-['\2022'] text-xl pr-[6px]"
          :class="[
            {
              neutral: passwordValue === '',
              valid: passwordValue.length >= 8,
              invalid: passwordValue.length < 8,
            },
          ]"
        ></span>
        {{ $t("profilePage.min") }}
      </li>
      <li class="flex items-center pt-1">
        <span
          class="before:content-['\2022'] text-xl pr-[6px]"
          :class="[
            {
              neutral: passwordValue === '',
              valid: passwordValue.length <= 15,
              invalid: passwordValue.length > 15,
            },
          ]"
        ></span>
        {{ $t("profilePage.max") }}
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  passwordValue: String,
});
</script>
<style scoped>
.valid {
  color: green;
}
.neutral {
  color: grey;
}
.invalid {
  color: red;
}
</style>
