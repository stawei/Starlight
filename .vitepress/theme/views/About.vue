<template>
  <div class="about">
    <h1 class="title">关于我</h1>

    <!-- 头像区域 -->
    <div class="author-box">
      <div class="author-tag-left">
        <span v-for="(tag, index) in avatarTags.left" :key="'l' + index" class="author-tag">{{ tag }}</span>
      </div>
      <div class="author-img">
        <img src="/images/avatar.jpg" alt="avatar" />
        <div class="online-status"></div>
      </div>
      <div class="author-tag-right">
        <span v-for="(tag, index) in avatarTags.right" :key="'r' + index" class="author-tag">{{ tag }}</span>
      </div>
    </div>

    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 介绍 -->
      <div class="about-item hello">
        <span class="text1">你好，很高兴认识你👋</span>
        <span class="text2 title2">我是 浅小兮</span>
        <span class="text3">是一名 前端开发工程师、独立开发者、博主</span>
      </div>
      <!-- 追求 -->
      <div class="about-item pursuit">
        <span class="tip">追求</span>
        <span class="title2">源于</span>
        <span class="title2">热爱而去开发</span>
        <span class="title2">优秀的作品</span>
      </div>
    </div>

    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 技能 -->
      <div class="about-item skills">
        <span class="tip">技能</span>
        <span class="title2">开启创造力</span>
        <div class="skills-list">
          <a
            v-for="(item, index) in skillsData"
            :key="index"
            :style="{ '--color': item.color }"
            :href="item.link"
            class="skills-item"
            target="_blank"
          >
            <div class="skills-logo">
              <i :class="`iconfont icon-${item.icon}`"></i>
            </div>
            <span class="skills-name">{{ item.name }}</span>
          </a>
        </div>
      </div>
      <!-- 图片 -->
      <div class="about-item picture image" style="background-image: url(https://pic.netbian.com/uploads/allimg/260812/130117-1786510877f336.jpg)">
        <div class="image-content">
          <span class="tip">图片</span>
          <!-- <span class="title2">精选作品</span>
          <div class="image-desc">
            <span class="left">点击查看更多</span>
          </div> -->
        </div>
      </div>
    </div>

    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 性格 -->
      <div class="about-item character" style="--color: #4298b4">
        <span class="tip">性格</span>
        <span class="title2">主人公</span>
        <span class="title2" style="color: var(--color)">ENFJ</span>
        <span class="more">
          在
          <a href="https://www.16personalities.com/ch/" target="_blank">16personalities</a>
          了解更多关于
          <a href="https://www.16personalities.com/ch/enfj-%E4%BA%BA%E6%A0%BC" target="_blank">主人公</a>
        </span>
        <img
          src="https://www.16personalities.com/static/images/personality-types/avatars/faces/main-enfj-male.svg"
          alt="male"
          class="male"
        />
      </div>
      <!-- 座右铭 -->
      <div class="about-item" style="--color: #f25d8e">
        <span class="tip">座右铭</span>
        <span class="title1" style="margin-top: 20px">多喜乐，常安宁。</span>
        <span class="title2">从相遇的刹那开始就注定了别离！</span>
      </div>
    </div>

    <!-- 游戏 和 生涯 -->
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 游戏（40%宽度） -->
      <div class="about-item game image" style="--color: #575d8b; background-image: url(https://shp.qpic.cn/ishow/2735042818/1682676560_1265602313_48182_sProdImgNo_6.jpg/0)">
        <div class="image-content">
          <span class="tip">最近玩的游戏</span>
          <span class="title2">王者荣耀</span>
          <div class="image-desc">
            <span class="left">UID: 梦归碧落星辰</span>
          </div>
        </div>
      </div>
      <!-- 生涯 -->
      <div class="about-item career">
        <span class="tip">生涯</span>
        <span class="title2">
          <i>无限未来</i>
        </span>
        <div class="list">
          <span class="list-item" style="--color: #357ef5">FE · 前端开发工程师</span>
          <span class="list-item" style="--color: #eb372a">大数据/区块链</span>
        </div>
        <img
          class="career-img"
          src="https://uploadstatic.mihoyo.com/contentweb/20220208/2022020814003845991.png"
          alt="career"
        />
      </div>
    </div>

    <div class="about-content" style="grid-template-columns: 1fr 1fr">
      <div
        class="about-item like image"
        style="
          --color: #0c0e20;
          background-image: url(https://wallpaperaccess.com/full/2997.jpg);
        "
      >
        <div class="image-content">
          <span class="tip">关注偏好</span>
          <span class="title2">艺术</span>
          <div class="image-desc">
            <span class="left">钢琴、阅读，写作，编程</span>
          </div>
        </div>
      </div>
      <!-- 音乐偏好模块：恢复最初版本（原背景图片，无“更多推荐”按钮） -->
      <div
        class="about-item like image"
        style="
          /* --color: #7b3c25; */
          background-image: url(https://pic.netbian.com/uploads/allimg/260819/185039-1787136639e802.jpg);
        "
      >
        <div class="image-content">
          <span class="tip">音乐偏好</span>
          <span class="title2">古风、纯音乐、华语流行</span>
          <div class="image-desc">
            <span class="left">一起欣赏更多音乐</span>
          </div>
        </div>
      </div>
    </div>

    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 数据 -->
      <div
        class="about-item static image"
        style="
          --color: #0f1114;
          background-image: url(https://bu.dusays.com/2023/05/01/644f4b037b930.jpg);
        "
      >
        <div class="image-content">
          <span class="tip">数据</span>
          <span class="title2">访问统计</span>
          <div class="static-data">
            <div v-for="(item, key, index) in statisticsData" :key="index" class="static-item">
              <span class="static-name">{{ key }}</span>
              <span class="static-num">{{ item }}</span>
            </div>
          </div>
          <div class="image-desc opacity">
            <span class="left">
              统计信息来自
              <a href="https://v6.51.la/" target="_blank">51la</a>
            </span>
          </div>
        </div>
      </div>
      <!-- 信息 -->
      <div class="about-item child">
        <div
          class="about-item map image"
          style="background-image: url(https://free.picui.cn/free/907/2026/08/26/6a8e932b5e759.png)"
        >
          <span class="position">我现在住在 <strong>中国，广东省</strong></span>
        </div>
        <div class="about-item info">
          <div class="info-item">
            <span class="info-name">生于</span>
            <span class="info-num" style="--color: #43a6c6">2003</span>
          </div>
          <div class="info-item">
            <span class="info-name">专业</span>
            <span class="info-num" style="--color: #2fac96">计算机与通讯</span>
          </div>
          <div class="info-item">
            <span class="info-name">现在职业</span>
            <span class="info-num" style="--color: #dfac46">前端开发工程师</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 心路历程 -->
    <div class="about-content" style="display: flex">
      <div class="about-item">
        <span class="tip">心路历程</span>
        <span class="title2">为什么建站？</span>
        <p class="text">
          写作对我的<strong>学习和成长</strong>产生了深远的影响。首先，它促使我更加深入地学习和理解我所感兴趣的主题。为了写出一篇有深度的文章，我需要做大量的研究和思考，这个过程极大地丰富了我的知识储备
        </p>
        <p class="text">
          其次，写作帮助我理清思路和巩固记忆。将学到的知识用自己的话写出来，可以让我更好地理解和记住这些概念。这种输出的方式比单纯的阅读或听课更能加深印象。
        </p>
        <p class="text">
          此外，写作也是一种自我反思和自我提升的过程。通过写作，我可以回顾自己的学习历程，发现自己的不足，并设定新的学习目标。同时，它也是自我表达的一种方式，让我能够分享自己的想法和观点，与他人交流。
        </p>
        <p class="text">
          最后，写作让我建立了一个网络社区，在这里我可以与其他热爱学习的人交流和分享。这种社区的支持和鼓励对我是极大的动力，让我在学习和成长的路上不再孤单。
        </p>
        <p class="text">
          总的来说，写作不仅提高了我的学习能力，也促进了我的个人成长。它是我学习旅程中的重要伴侣，帮助我不断前进。
        </p>
      </div>
    </div>

    <!-- 致谢赞赏名单 -->
    <div v-if="rewardList.length > 0" class="about-content" style="display: flex">
      <div class="about-item reward">
        <!-- 电脑端：保持原有右上角充电模块（含管道和人数） -->
        <div class="about-reward">
          <div id="TA-con" @click="showRewardConsole">
            <div id="text-con">
              <div id="linght"><i class="ri-heart-pulse-line"></i></div>
              <div id="TA">为TA充电</div>
            </div>
          </div>
          <div id="tube-con">
            <!-- 基础层（灰色） -->
            <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 77H234.226L307.006 24H790" stroke="#e5e9ef" stroke-width="20" />
              <path d="M0 140H233.035L329.72 71H1028" stroke="#e5e9ef" stroke-width="20" />
              <path d="M1 255H234.226L307.006 307H790" stroke="#e5e9ef" stroke-width="20" />
              <path d="M0 305H233.035L329.72 375H1028" stroke="#e5e9ef" stroke-width="20" />
              <rect y="186" width="236" height="24" fill="#e5e9ef" />
              <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#e5e9ef" />
              <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
              <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#e5e9ef" />
              <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
            </svg>
            <!-- 高亮层（粉色，hover 点亮） -->
            <div id="mask">
              <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 77H234.226L307.006 24H790" stroke="#f25d8e" stroke-width="20" />
                <path d="M0 140H233.035L329.72 71H1028" stroke="#f25d8e" stroke-width="20" />
                <path d="M1 255H234.226L307.006 307H790" stroke="#f25d8e" stroke-width="20" />
                <path d="M0 305H233.035L329.72 375H1028" stroke="#f25d8e" stroke-width="20" />
                <rect y="186" width="236" height="24" fill="#f25d8e" />
                <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#f25d8e" />
                <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
                <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#f25d8e" />
                <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
              </svg>
            </div>
            <!-- 满电层（橙色，按住点亮） -->
            <div id="orange-mask">
              <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 77H234.226L307.006 24H790" stroke="#ffd52b" stroke-width="20" />
                <path d="M0 140H233.035L329.72 71H1028" stroke="#ffd52b" stroke-width="20" />
                <path d="M1 255H234.226L307.006 307H790" stroke="#ffd52b" stroke-width="20" />
                <path d="M0 305H233.035L329.72 375H1028" stroke="#ffd52b" stroke-width="20" />
                <rect y="186" width="236" height="24" fill="#ffd52b" />
                <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#ffd52b" />
                <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
                <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#ffd52b" />
                <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
              </svg>
            </div>
          </div>
          <p id="people">共<b>{{ rewardList.length }}</b>人</p>
        </div>

        <!-- 隐藏的 RewardBtn 用于提供统一的弹窗样式 -->
        <RewardBtn ref="rewardBtnRef" :showJump="false" style="position: absolute; opacity: 0; pointer-events: none" />

        <span class="tip">致谢</span>
        <span class="title2">赞赏名单</span>
        <p class="reward-desc">感谢因为有你们，让我更加有创作的动力。</p>

        <div class="reward-list-all">
          <div v-for="(item, index) in sortedRewardList" :key="index" class="reward-list-item">
            <div class="reward-list-item-name">{{ item.name }}</div>
            <div class="reward-list-bottom-group">
              <div class="reward-list-item-money" :class="{ 'high-amount': item.amount >= 50 }">
                ¥{{ item.amount }}{{ item.suffix || "" }}
              </div>
              <div class="reward-list-item-time">{{ formatDate(item.datatime) }}</div>
            </div>
          </div>
        </div>
        <div class="reward-list-updateDate">
          最新更新时间：<time>{{ formatDate(sortedByDate[0]?.datatime) }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useData } from "vitepress";
import { getStatistics } from "@/api";
import RewardBtn from "../components/RewardBtn.vue";

const { theme } = useData();

// ========== 头像区域配置 ==========
const avatarTags = ref({
  left: ["音乐艺术爱好者", "分享与热心帮助", "设计开发小萌新"],
  right: ["偶尔喜欢瞎折腾", "天马行空的幻想", "团队小组发动机"],
});

// ========== 赞赏弹窗控制 ==========
const rewardBtnRef = ref(null);

// 触发 RewardBtn 点击
const showRewardConsole = () => {
  if (rewardBtnRef.value) {
    // 找到 RewardBtn 内部的 .reward-btn 元素并触发点击
    const btnElement = rewardBtnRef.value.$el?.querySelector('.reward-btn');
    if (btnElement) {
      btnElement.click();
    }
  }
};

// ========== 赞赏名单配置 ==========
const rewardList = ref([
  { name: "张三", amount: 10, datatime: "2024-01-15" },
  { name: "李四", amount: 50, datatime: "2024-01-10" },
  { name: "王五", amount: 20, datatime: "2024-01-05" },
  { name: "赵六", amount: 100, datatime: "2024-01-01" },
]);

// 按赞赏金额从高到低排序
const sortedRewardList = computed(() =>
  [...rewardList.value].sort((a, b) => b.amount - a.amount)
);

// 按赞赏时间从新到旧排序
const sortedByDate = computed(() =>
  [...rewardList.value].sort((a, b) => new Date(b.datatime) - new Date(a.datatime))
);

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 10);
};

// ========== 技能数据 ==========
const skillsData = [
  { name: "JavaScript", color: "#f1e05abd", icon: "javascript", link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" },
  { name: "HTML5", color: "#e34f26", icon: "html5", link: "https://developer.mozilla.org/zh-CN/docs/Web/HTML" },
  { name: "CSS3", color: "#563d7c", icon: "css3", link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS" },
  { name: "Vue", color: "#41b883", icon: "vue", link: "https://cn.vuejs.org/" },
  { name: "React", color: "#149ECA", icon: "react", link: "https://zh-hans.reactjs.org/" },
  { name: "Node.js", color: "#026E00", icon: "nodejs", link: "https://nodejs.org/" },
  { name: "Python", color: "#3776AB", icon: "python", link: "https://www.python.org/" },
  { name: "Docker", color: "#2496f2", icon: "docker", link: "https://www.docker.com/" },
  { name: "Git", color: "#F05032", icon: "git", link: "https://git-scm.com/" },
  { name: "Photoshop", color: "#31A8FF", icon: "photoshop", link: "https://www.adobe.com/cn/lead/creativecloud/business.html" },
  { name: "ChatGPT", color: "#4AA181", icon: "chatgpt", link: "https://chat.openai.com/" },
];

// ========== 站点统计数据 ==========
const statisticsData = ref(null);

const getStatisticsData = async () => {
  const result = await getStatistics(theme.value.tongji["51la"]);
  statisticsData.value = result;
};

onMounted(() => {
  getStatisticsData();
});
</script>

<style lang="scss" scoped>
.about {
  .title {
    font-size: 2.4rem;
    text-align: center;
    border: none;
  }

  // ========== 头像区域 ==========
  .author-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0 2rem;

    .author-tag-left,
    .author-tag-right {
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .author-tag-left {
      align-items: flex-end;

      .author-tag:first-child,
      .author-tag:last-child {
        margin-right: -16px;
      }
    }

    .author-tag-right {
      align-items: flex-start;

      .author-tag:first-child,
      .author-tag:last-child {
        margin-left: -16px;
      }
    }

    .author-tag {
      transform: translate(0, -4px);
      padding: 1px 8px;
      background: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      border-radius: 40px;
      margin-top: 6px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 4px 8px -2px var(--main-border-shadow);
      animation: floating 6s ease-in-out infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.6s;
      }
      &:nth-child(3) {
        animation-delay: 1.2s;
      }
    }

    .author-img {
      margin: 0 30px;
      border-radius: 50%;
      width: 180px;
      height: 180px;
      position: relative;
      background: var(--main-site-background);
      user-select: none;
      transition: 0.3s;

      @media (max-width: 768px) {
        width: 120px;
        height: 120px;
      }

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        transform: scale(1.1);
      }

      .online-status {
        position: absolute;
        width: 30px;
        height: 30px;
        background: #4ade80;
        border-radius: 50%;
        border: 5px solid var(--main-card-background);
        bottom: 5px;
        right: 10px;
        z-index: 2;

        @media (max-width: 768px) {
          bottom: -5px;
          right: -5px;
        }
      }
    }
  }

  .about-content {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    margin-bottom: 20px;

    .about-item {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1.2rem 2rem;
      border-radius: 12px;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      box-shadow: 0 8px 12px -4px var(--main-border-shadow);
      overflow: hidden;

      .tip {
        font-size: 14px;
        opacity: 0.8;
        margin-bottom: 12px;
      }

      .title1 {
        font-size: 36px;
        font-weight: bold;
        opacity: 0.6;
      }

      .title2 {
        font-size: 36px;
        font-weight: bold;
        margin-right: 4rem;
      }

      .text {
        font-size: 18px;
        margin: 0.6rem 0;
      }

      &.child {
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        gap: 20px;

        .about-item {
          height: 100%;
        }
      }

      &.hello {
        justify-content: center;
        padding: 2rem;
        color: #fff;
        background-image: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
        background-size: 200% 200%;
        animation: gradientFlow 6s ease infinite;

        .title2 {
          line-height: 2;
        }
      }

      &.pursuit {
        .title2 {
          line-height: 1.2;

          &:last-child {
            display: inline-block;
            background-size: 100% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
          }
        }
      }
// ========== 性格 ==========
      &.character {
        min-height: 220px;
        cursor: pointer;

        .more {
          margin-top: auto;
          font-size: 14px;
          color: var(--main-color-gray);

          a {
            color: var(--main-color-gray);

            &:hover {
              color: var(--color);
            }
          }
        }

        .male {
          position: absolute;
          top: 20px;
          right: 50px;
          height: 100%;
          width: auto;
          transition: transform 0.5s;
          transform-origin: top center;

          @media (max-width: 768px) {
            height: 80%;
          }
        }

        &:hover {
          .male {
            transform: scale(1.2);
          }
        }
      }
// ========== 技能 ==========
      &.skills {
        .skills-list {
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .skills-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
            padding: 8px 12px 8px 8px;
            border-radius: 40px;
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -2px var(--main-border-shadow);
            transition: background-color 0.3s;
            cursor: pointer;

            .skills-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              margin-right: 8px;
              border-radius: 50%;
              background-color: var(--color);

              .iconfont {
                color: #fff;
              }
            }

            .skills-name {
              font-weight: bold;
              transition: color 0.3s;
            }

            &:hover {
              background-color: var(--main-card-background);
            }
          }
        }
      }
// ========== 生涯 ==========
      &.career {
        .title2 {
          letter-spacing: 0.2rem;
          font-size: 40px;
        }

        .list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;

          .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
            color: var(--main-font-second-color);

            &::before {
              content: "";
              display: block;
              width: 16px;
              height: 16px;
              background-color: var(--color);
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }

        .career-img {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          margin-left: 200px;

          @media (max-width: 768px) {
            position: static;
            display: none;
          }
        }
      }
      // ========== 图片容器 ==========
      &.picture {
        /* 默认桌面端高度可以不设置，或按需设置 */
        @media (max-width: 768px) {
          min-height: 300px; /* 在这里修改您想要的移动端高度 */
        }
      }


      // ========== 游戏卡片 ==========
      &.game {
        min-height: 300px;

        @media (max-width: 768px) {
          min-height: 240px;
        }
      }

      &.like {
        min-height: 400px;

        @media (max-width: 768px) {
          min-height: 300px;
        }
      }

      &.image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        .image-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          color: #fff;

          .image-desc {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;

            &.opacity {
              font-size: 14px;
              color: #eee;
              opacity: 0.8;

              a {
                color: #eee;

                &:hover {
                  color: var(--main-color);
                }
              }
            }
          }
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: inset 0 -70px 204px 10px var(--color);
          z-index: 0;
        }
      }

      &.static {
        .static-data {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr 1fr;
          margin: 20px 0;

          .static-item {
            display: flex;
            flex-direction: column;

            .static-name {
              font-size: 15px;
              opacity: 0.8;
            }

            .static-num {
              font-size: 34px;
              font-weight: bold;
            }
          }
        }
      }

      &.map {
        min-height: 170px;
        background-size: 100%;
        transition: background 1.5s ease-in-out;
        cursor: pointer;

        @media (max-width: 768px) {
          background-size: cover;
          pointer-events: none;
        }

        .position {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 20px 30px;
          color: #fff;
          background-color: #636352;
          font-size: 20px;
          transition: bottom 1s;
        }

        &:hover {
          background-size: 120%;
          background-position-x: 0;
          background-position-y: 36%;

          .position {
            bottom: -80px;
          }
        }
      }

      &.info {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        .info-item {
          display: flex;
          flex-direction: column;
          margin-right: 32px;

          .info-name {
            font-size: 14px;
            margin-bottom: 8px;
            color: var(--main-font-second-color);
          }

          .info-num {
            font-size: 34px;
            font-weight: bold;
            color: var(--color);
          }
        }
      }

      // ========== 赞赏名单 ==========
      &.reward {
        .reward-desc {
          font-size: 16px;
          color: var(--main-font-second-color);
          margin: 0.5rem 0;
        }

        // 电脑端：保持原有右上角充电模块
        .about-reward {
          position: absolute;
          top: 1.2rem;
          right: 2rem;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;

          // 粉色充电按钮（含闪电图标）
          #TA-con {
            flex-shrink: 0;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            background: #f25d8e;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;

            &:hover {
              background: #eb3a7a;
            }

            &:active {
              transform: scale(0.95);
            }

            #text-con {
              display: flex;
              align-items: center;
              gap: 6px;

              #linght {
                font-size: 1.25rem;
                line-height: 1;
              }

              #TA {
                font-size: 1rem;
              }
            }
          }

          // 充电管道（灰色基础 + 粉色高亮 + 橙色满电）
          #tube-con {
            flex-grow: 1;
            position: relative;
            height: 40px;
            overflow: hidden;

            svg {
              display: block;
              width: 100%;
              height: 100%;
            }

            #mask,
            #orange-mask {
              position: absolute;
              inset: 0;
              opacity: 0;
              transition: opacity 0.3s;
              pointer-events: none;

              svg {
                width: 100%;
                height: 100%;
              }
            }

            &:hover {
              #mask {
                opacity: 1;
              }
            }

            &:active {
              #orange-mask {
                opacity: 1;
              }
            }
          }

          // 人数：在管道最右侧
          #people {
            flex-shrink: 0;
            font-size: 0.9rem;
            color: #666;
            white-space: nowrap;
            padding-left: 8px;
            border-left: 1px solid #eee;
          }
        }

        // 移动端："为TA充电"固定在卡片右上角
        @media (max-width: 768px) {
          .about-reward {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 2;

            // 隐藏管道和人数
            #tube-con,
            #people {
              display: none;
            }

            // 简化按钮样式
            #TA-con {
              padding: 0.5rem 1rem;
              border-radius: 12px;
              background: #f25d8e;
              color: #fff;
              font-weight: bold;
              cursor: pointer;
              transition: background-color 0.3s;
              display: flex;
              align-items: center;
              gap: 6px;

              &:hover {
                background: #eb3a7a;
              }

              &:active {
                transform: scale(0.95);
              }

              #text-con {
                display: flex;
                align-items: center;
                gap: 4px;

                #linght {
                  font-size: 1rem;
                  line-height: 1;
                }

                #TA {
                  font-size: 0.9rem;
                }
              }
            }
          }
        }

        .reward-list-all {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          margin: 1rem -0.25rem 0.5rem;

          .reward-list-item {
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid var(--main-card-border);
            width: calc((100% / 5) - 0.5rem);
            margin: 0 0.25rem 0.5rem;
            box-shadow: 0 4px 8px -2px var(--main-border-shadow);
            background: var(--main-card-background);

            @media (max-width: 1200px) {
              width: calc((100% / 3) - 0.5rem);
            }

            @media (max-width: 768px) {
              width: 100%;
            }

            .reward-list-item-name {
              font-size: 1rem;
              font-weight: 700;
              line-height: 1;
              margin-bottom: 0.5rem;
            }

            .reward-list-bottom-group {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .reward-list-item-money {
                padding: 4px;
                background: var(--main-font-color);
                color: var(--main-card-background);
                font-size: 12px;
                line-height: 1;
                border-radius: 4px;
                margin-right: 4px;
                white-space: nowrap;

                &.high-amount {
                  background: #fbbf24;
                  color: #000;
                }
              }

              .reward-list-item-time {
                font-size: 12px;
                color: var(--main-font-second-color);
                white-space: nowrap;
              }
            }
          }
        }

        .reward-list-updateDate {
          color: var(--main-font-second-color);
          font-size: 14px;
          margin-top: 1rem;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
}

// 渐变流动动画
@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 头像标签浮动动画
@keyframes floating {
  0%,
  100% {
    transform: translate(0, -4px);
  }
  50% {
    transform: translate(0, 4px);
  }
}
</style>
