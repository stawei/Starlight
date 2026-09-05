<template>
  <div class="floating-assistant" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="assistant-wrapper" :class="{ hovered: isHovered }">
      <img
        src="https://gw.alicdn.com/imgextra/i2/O1CN01dSFpUp1vhUKl1wUFe_!!6000000006204-1-tps-600-600.gif"
        alt="AI助手"
        @click="toggleChat"
      />
    </div>

    <!-- 聊天面板 -->
    <Transition name="slide-up">
      <div v-if="showChat" class="chat-panel">
        <div class="chat-header">
          <span class="chat-title">AI 助手</span>
          <button class="close-btn" @click="showChat = false">
            <i class="iconfont icon-close"></i>
          </button>
        </div>
        <div class="chat-body">
          <!-- 空状态 -->
          <div v-if="messages.length === 0" class="empty-state">
            <i class="iconfont icon-robot"></i>
            <p>开始对话吧</p>
          </div>
          <!-- 消息列表 -->
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
            <div class="message-content">{{ msg.content }}</div>
          </div>
          <div v-if="isLoading" class="message assistant loading">
            <div class="message-content">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="输入消息..."
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          />
          <button @click="sendMessage" :disabled="isLoading || !inputMessage.trim()">
            {{ isLoading ? "发送中..." : "发送" }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const isHovered = ref(false);
const showChat = ref(false);
const messages = ref([]);
const inputMessage = ref("");
const isLoading = ref(false);

// API 配置
const API_URL = "https://api.link-ai.tech/v1/chat/completions";
const API_KEY = "Link_KtJtOjFywRf14F2nYBZWNBEfW0mBOuLRgTmUIDVYI6";

const toggleChat = () => {
  showChat.value = !showChat.value;
};

const sendMessage = async () => {
  const message = inputMessage.value.trim();
  if (!message || isLoading.value) return;

  // 添加用户消息
  messages.value.push({
    role: "user",
    content: message,
  });

  inputMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.value.map((m) => ({ role: m.role, content: m.content })),
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "抱歉，我暂时无法回答这个问题。";

    messages.value.push({
      role: "assistant",
      content: assistantMessage,
    });
  } catch (error) {
    console.error("AI 对话失败:", error);
    messages.value.push({
      role: "assistant",
      content: "❌ 对话失败，请检查网络连接或 API 配置。",
    });
  } finally {
    isLoading.value = false;
    // 滚动到底部
    nextTick(() => {
      const chatBody = document.querySelector(".chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.floating-assistant {
  position: fixed;
  right: 24px;
  bottom: 0;
  z-index: 1000;

  .assistant-wrapper {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(45%, 20%);

    &.hovered {
      transform: translate(0, 0);
    }

    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
      }
    }
  }

    // 聊天面板
    .chat-panel {
      position: absolute;
      right: 0;
      bottom: 80px;
      width: 300px;
      height: 400px;
    background: var(--main-card-background);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--main-card-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .chat-header {
      padding: 16px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .chat-title {
        font-size: 16px;
        font-weight: 600;
      }

      .close-btn {
        background: transparent;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 4px;
        font-size: 18px;
        opacity: 0.8;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }
      }
    }

    .chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;

      // 空状态
      .empty-state {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--main-font-second-color);
        opacity: 0.5;

        i {
          font-size: 48px;
          margin-bottom: 12px;
        }

        p {
          font-size: 14px;
        }
      }

      .message {
        display: flex;
        animation: fadeIn 0.3s ease;

        &.user {
          justify-content: flex-end;

          .message-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            border-radius: 16px 16px 4px 16px;
            max-width: 80%;
          }
        }

        &.assistant {
          justify-content: flex-start;

          .message-content {
            background: var(--main-card-second-background);
            color: var(--main-font-color);
            border-radius: 16px 16px 16px 4px;
            max-width: 80%;
          }

          &.loading .message-content {
            background: transparent;
            display: flex;
            gap: 4px;
            padding: 12px 16px;

            .typing-dot {
              width: 8px;
              height: 8px;
              background: var(--main-color);
              border-radius: 50%;
              animation: typingBounce 1.4s infinite;

              &:nth-child(2) {
                animation-delay: 0.2s;
              }

              &:nth-child(3) {
                animation-delay: 0.4s;
              }
            }
          }
        }

        .message-content {
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.6;
          word-wrap: break-word;
        }
      }
    }

    .chat-input {
      padding: 12px 16px;
      border-top: 1px solid var(--main-border-color);
      display: flex;
      gap: 8px;

      input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--main-border-color);
        border-radius: 8px;
        background: var(--main-background);
        color: var(--main-font-color);
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: #667eea;
        }
      }

      button {
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  // 移动端隐藏
  @media (max-width: 768px) {
    display: none;
  }
}

// 滑入动画
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

// 消息淡入动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 打字加载动画
@keyframes typingBounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
}
</style>
