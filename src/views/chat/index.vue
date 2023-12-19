<script setup>
</script>

<template>
    <div class="layout-padding">
      <div class="layout-padding-view">
          <div class="wave">
            <span style="--i:1">努</span>
            <span style="--i:2">力</span>
            <span style="--i:3">开</span>
            <span style="--i:4">发</span>
            <span style="--i:5">中</span>
            <span style="--i:6">.</span>
            <span style="--i:7">.</span>
            <span style="--i:8">.</span>
          </div>
      </div>
    </div>
</template>

<style scoped>
.wave{
  margin: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.wave span{
  position: relative;
  display: inline-block;
  font-size: 5em;
  animation: float 1.5s ease-in-out infinite;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-20px);
  }
  40%,100% {
    transform: translateY(0px);
  }
}
</style>