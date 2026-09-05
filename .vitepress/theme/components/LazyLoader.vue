<!-- 懒加载 -->
<template>
  <div v-if="!load" ref="box" :style="{ height, width }" class="loading" />
  <slot v-else />
  <div v-if="useFriendsLink" class="hidden">
    <!-- 适配友链朋友圈 -->
    <img :data-lazy-src="useFriendsLink" class="cf-friends-avatar" alt="cover" />
  </div>
</template>

<script setup>
const props = defineProps({
  // 兼容友链朋友圈
  useFriendsLink: {
    type: [Boolean, String],
    default: false,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});

// IntersectionObserver 实例
let observer = null;

// 是否加载
const load = ref(false);
// 加载元素
const box = ref(null);

// 初始化 IntersectionObserver - 使用 rootMargin 提前加载，threshold 优化触发时机
const initLazyIntersectionObserver = (fn) => {
  return new IntersectionObserver((entries) => entries.forEach((entry) => fn(entry)), {
    rootMargin: "50px 0px", // 提前50px开始加载，避免白屏
    threshold: 0.01, // 只要进入视口1%就触发
  });
};

onMounted(() => {
  if (!box.value) return;

  observer = initLazyIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      load.value = true;
      observer?.unobserve(box.value);
      observer = null;
    }
  });
  observer.observe(box.value);
});

onBeforeUnmount(() => {
  if (observer && box.value) {
    observer.unobserve(box.value);
    observer = null;
  }
});
</script>

<style lang="scss" scoped>
.loading {
  background: linear-gradient(
    90deg,
    var(--main-card-border) 25%,
    var(--main-card-background) 37%,
    var(--main-card-border) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
.hidden {
  display: none;
}
</style>
