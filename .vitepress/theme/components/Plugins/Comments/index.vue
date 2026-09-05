<!-- 评论 -->
<template>
  <div
    v-if="theme.comment.enable"
    :key="router.route.path"
    ref="mainCommentRef"
    id="main-comment"
    class="comment"
  >
    <div v-if="!fill" class="title">
      <span class="name">
        <i class="iconfont icon-chat"></i>
        评论
        <!-- 诗词提示（仅 Twikoo，在标题右侧） -->
        <span v-if="theme.comment.type === 'twikoo'" class="poetry-tips">
          <span class="poetry-text">{{ displayedText }}</span>
          <span class="poetry-cursor" :class="{ 'cursor-blink': isTypingComplete }">|</span>
        </span>
      </span>
      <span class="tool" @click="router.go('/pages/privacy')"> 隐私政策 </span>
    </div>
    <!-- 区分评论系统 -->
    <Artalk v-if="theme.comment.type === 'artalk'" :fill="fill" />
    <Twikoo v-else-if="theme.comment.type === 'twikoo'" :fill="fill" @comment-loaded="onCommentLoaded" />
  </div>
</template>

<script setup>
const { theme } = useData();
const router = useRouter();
const props = defineProps({
  // 填充评论区
  fill: {
    type: [Boolean, String],
    default: false,
  },
});
const mainCommentRef = ref(null);

// 诗词相关
const poetryText = ref('');
const displayedText = ref('');
const isTypingComplete = ref(false);
const typingSpeed = 80;
let typingTimer = null;
let poetryCache = [];

// 加载今日诗词
const loadPoetry = () => {
  if (typeof window.jinrishici === 'undefined') {
    setTimeout(loadPoetry, 500);
    return;
  }

  window.jinrishici.load((result) => {
    if (result && result.data) {
      const { content, origin } = result.data;
      const fullText = `${content} —— ${origin.dynasty}·${origin.author}《${origin.title}》`;

      if (poetryCache.includes(fullText)) {
        refreshPoetry();
        return;
      }

      poetryCache.push(fullText);
      if (poetryCache.length > 10) poetryCache.shift();

      poetryText.value = fullText;
      startTyping();
    }
  });
};

// 打字机效果
const startTyping = () => {
  if (typingTimer) clearInterval(typingTimer);

  displayedText.value = '';
  isTypingComplete.value = false;

  let index = 0;
  const text = poetryText.value;

  typingTimer = setInterval(() => {
    if (index < text.length) {
      displayedText.value += text.charAt(index);
      index++;
    } else {
      clearInterval(typingTimer);
      isTypingComplete.value = true;
    }
  }, typingSpeed);
};

// 刷新诗词
const refreshPoetry = () => {
  if (typingTimer) clearInterval(typingTimer);
  loadPoetry();
};

// 加载诗词 SDK
const loadPoetrySDK = () => {
  if (document.getElementById('jinrishici-sdk')) {
    loadPoetry();
    return;
  }

  const script = document.createElement('script');
  script.id = 'jinrishici-sdk';
  script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
  script.charset = 'utf-8';
  script.onload = loadPoetry;
  document.head.appendChild(script);
};

// 评论加载完成回调
const onCommentLoaded = () => {
  if (!props.fill) {
    loadPoetrySDK();
  }
};

// 滚动至评论
const scrollToComments = () => {
  if (!mainCommentRef.value) return false;
  const elementRect = mainCommentRef.value.getBoundingClientRect();
  const elementTop = elementRect.top + window.scrollY;
  window.scrollBy({ top: elementTop - 80, behavior: "smooth" });
};

defineExpose({ scrollToComments });

onUnmounted(() => {
  if (typingTimer) clearInterval(typingTimer);
});
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 2rem;

  // 诗词提示（内联在标题中）
  .poetry-tips {
    display: inline-flex;
    align-items: center;
    margin-left: 12px;
    font-size: 0.85rem;
    font-weight: normal;
    color: var(--main-font-second-color);
    opacity: 0.8;

    .poetry-text {
      white-space: nowrap;
    }

    .poetry-cursor {
      color: var(--main-color);
      font-weight: 300;
      margin-left: 2px;

      &.cursor-blink {
        animation: cursorBlink 1s step-end infinite;
      }
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 3rem 0 1rem 0;
    padding: 0 6px;
    .name {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      .iconfont {
        font-size: 26px;
        font-weight: normal;
        margin-right: 8px;
      }
    }
    .tool {
      opacity: 0.6;
      font-size: 14px;
      cursor: pointer;
      transition:
        opacity 0.3s,
        color 0.3s;
      &:hover {
        opacity: 1;
        color: var(--main-color);
      }
    }
  }
}

@keyframes cursorBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
