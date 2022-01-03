<template>
  <div class="realword">
    <top-header />

    <main>
      <nuxt /> 
    </main>

    <bottom-footer />
  </div>
</template>
<script>
import TopHeader from "@/components/Header.vue";
import BottomFooter from "@/components/Footer.vue";
export default {
  components: {
    TopHeader,
    BottomFooter,
  },
};
</script>