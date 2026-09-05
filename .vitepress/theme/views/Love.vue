<template>
  <div class="love-page">
    <!-- 头像和名字展示 -->
    <div class="couple-section">
      <div class="person">
        <div class="avatar-wrapper">
          <img v-if="config.avatar1" :src="config.avatar1" :alt="config.name1" class="avatar">
          <div v-else class="avatar-placeholder">{{ config.name1.charAt(0) }}</div>
        </div>
        <span class="name-item">{{ config.name1 }}</span>
      </div>

      <span class="heart-icon">❤️</span>

      <div class="person">
        <div class="avatar-wrapper">
          <img v-if="config.avatar2" :src="config.avatar2" :alt="config.name2" class="avatar">
          <div v-else class="avatar-placeholder">{{ config.name2.charAt(0) }}</div>
        </div>
        <span class="name-item">{{ config.name2 }}</span>
      </div>
    </div>

    <!-- 恋爱天数 -->
    <div class="love-days-section">
      <p class="days-text">这是我们走过的第 <span class="days-number">{{ loveDays }}</span> 天</p>
    </div>
    
    <!-- 重要日期卡片 -->
    <div class="important-dates">
      <div class="date-card s-card hover">
        <div class="date-label">周年纪念日</div>
        <div class="date-value">{{ config.anniversaryDate }}</div>
      </div>
      
      <div class="date-card s-card hover">
        <div class="date-label">相遇的那天</div>
        <div class="date-value">{{ config.meetDate }}</div>
      </div>
      
      <div class="date-card s-card hover">
        <div class="date-label">{{ config.label1 }}</div>
        <div class="date-value">{{ config.birthday1 }}</div>
      </div>
      
      <div class="date-card s-card hover">
        <div class="date-label">{{ config.label2 }}</div>
        <div class="date-value">{{ config.birthday2 }}</div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';

// 默认配置
const DEFAULT_CONFIG = {
  name1: '不羡明月知',
  name2: '祈雨',
  qq1: '2963286491',
  qq2: '3992236937',
  avatar1: '',
  avatar2: '',
  startDate: '2025-05-26T00:00:00',
  anniversaryDate: '2025-06-01',
  meetDate: '2025-05-26',
  label1: '不羡的生日',
  birthday1: '2004-06-13',
  label2: '祈雨的生日',
  birthday2: '2007-09-13'
};

const config = reactive({...DEFAULT_CONFIG});

// 恋爱天数
const loveDays = ref(0);

// 从 QQ 号获取头像 URL
function getQQAvatar(qq) {
  if (!qq) return '';
  return `http://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=640&img_type=jpg`;
}

// 从 QQ 空间获取昵称（JSONP 方式）
function fetchQQName(qq) {
  return new Promise((resolve) => {
    if (!qq) {
      resolve('');
      return;
    }

    const callbackName = `qq_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement('script');
    script.src = `https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}&callback=${callbackName}`;

    window[callbackName] = (data) => {
      try {
        // 数据格式: {"qq号":[,,"昵称",...]}
        const qqData = data[qq];
        if (qqData && qqData[2]) {
          resolve(qqData[2]);
        } else {
          resolve('');
        }
      } catch (e) {
        resolve('');
      }
      // 清理
      delete window[callbackName];
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };

    script.onerror = () => {
      resolve('');
      delete window[callbackName];
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };

    document.body.appendChild(script);
  });
}

// 加载时获取头像和名称
async function loadQQInfo() {
  if (config.qq1) {
    config.avatar1 = getQQAvatar(config.qq1);
    const name1 = await fetchQQName(config.qq1);
    if (name1) config.name1 = name1;
  }
  if (config.qq2) {
    config.avatar2 = getQQAvatar(config.qq2);
    const name2 = await fetchQQName(config.qq2);
    if (name2) config.name2 = name2;
  }
}

// 计算恋爱天数
function updateDays() {
  const startDate = new Date(config.startDate).getTime();
  const now = new Date().getTime();
  loveDays.value = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
}

onMounted(() => {
  loadQQInfo();
  updateDays();
});
</script>

<style lang="scss" scoped>
.love-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.couple-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;

  .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--main-card-border);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--main-color), var(--main-color-bg));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    border: 4px solid var(--main-card-border);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .name-item {
    font-size: 1.2rem;
    color: var(--main-font-color);
    font-weight: 600;
  }

  .heart-icon {
    font-size: 3rem;
    animation: heartbeat 1.5s ease-in-out infinite;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.love-days-section {
  text-align: center;
  margin-bottom: 60px;

  .days-text {
    font-size: 2.5rem;
    color: var(--main-font-color);
    display: flex;
    align-items: baseline;
    justify-content: center;

    .days-number {
      font-size: 2.5rem;
      color: var(--main-color);
      font-weight: bold;
      margin: 0 5px;
      line-height: 1;
    }
  }
}

// 深色模式
:root.dark {
  .love-days-section .days-text {
    color: #fff;
  }

  .name-item {
    color: #fff !important;
  }

  .date-card .date-label,
  .date-card .date-value {
    color: #fff;
  }

  .countdown-label {
    color: #fff;
  }
}

.important-dates {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.date-card {
  padding: 1.5rem;
  text-align: center;

  .date-label {
    font-size: 1.65rem;
    color: var(--main-font-second-color);
    margin-bottom: 10px;
  }

  .date-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--main-font-color);
  }
}

@media (max-width: 768px) {
  .love-page {
    padding: 40px 15px;
  }

  .couple-section {
    gap: 15px;

    .person {
      gap: 8px;
      max-width: 120px;
    }

    .avatar-wrapper {
      width: 80px;
      height: 80px;
    }

    .avatar-placeholder {
      font-size: 2rem;
    }

    .name-item {
      font-size: 1rem;
    }

    .heart-icon {
      font-size: 2rem;
    }
  }

  .love-days-section .days-text {
    font-size: 1.1rem;

    .days-number {
      font-size: 2rem;
    }
  }

  .important-dates {
    grid-template-columns: 1fr;
  }
}
</style>
