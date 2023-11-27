<script setup>

</script>

<template>
    <!--首页-->
    <section class="app-main">

            <RouterView></RouterView>

    </section>
    <!--最主要展示的页面-->
</template>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>