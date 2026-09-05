<template>
  <div class="message-page">
    <h1 class="page-title">畅所欲言</h1>
    
    <div class="message-intro">
      <p>欢迎来到留言板！在这里你可以留下你的想法、建议或者任何问题。</p>
      <p>我会尽快回复每一条留言，期待与你的交流！</p>
    </div>

    <div class="message-rules">
      <h3>留言须知</h3>
      <ul>
        <li>请保持友善和尊重，文明发言</li>
        <li>欢迎分享你的想法、建议或问题</li>
        <li>请勿发布广告、垃圾信息或不当内容</li>
        <li>如有具体问题，请尽量详细描述</li>
      </ul>
    </div>

    <div class="comment-section">
      <h3>留言板</h3>
      <p class="comment-hint">请在下方评论区留下你的留言 👇</p>
    </div>
  </div>
</template>

<script setup>
// 留言板组件
</script>

<style lang="scss" scoped>
.message-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--main-font-color);
  margin-bottom: 2rem;
  text-align: center;
}

.message-intro {
  background: var(--main-background-light);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--main-font-second-color);
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.message-rules {
  background: var(--main-background);
  border: 1px solid var(--main-border-color);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--main-font-color);
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.8rem;
      color: var(--main-font-second-color);
      line-height: 1.6;
      
      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--main-color);
        font-weight: bold;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.comment-section {
  background: var(--main-background);
  border: 1px solid var(--main-border-color);
  border-radius: 12px;
  padding: 2rem;
  
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--main-font-color);
    margin-bottom: 1rem;
  }
  
  .comment-hint {
    color: var(--main-font-second-color);
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .message-page {
    padding: 1.5rem 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .message-intro,
  .message-rules,
  .comment-section {
    padding: 1.5rem;
  }
}
</style>
