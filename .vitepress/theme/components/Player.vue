<!-- 全局播放器 -->
<template>
  <div v-if="playerShow" :class="['player', { playing: playState, loading: isLoading }]" @click="handlePlayerClick">
    <div ref="playerDom" class="player-content" />
    <div v-if="isLoading" class="loading-overlay">
      <span class="loading-text">加载中...</span>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { getMusicList } from "@/api";
import "aplayer/dist/APlayer.min.css";

const store = mainStore();
const { theme } = useData();
const { enable, url } = theme.value.music;
const { playerShow, playerVolume, playState, playerData, musicPlatform, musicId } = storeToRefs(store);

// APlayer
const player = ref(null);
const playerDom = ref(null);
const isLoading = ref(false);
const isInitialized = ref(false);

// 音乐 API 地址配置（支持多源自动切换）
const musicApiUrls = {
  netease: [
    "https://met.api.xiaoguan.fit/api",
    "https://api.moeyao.cn/meting/",
    "https://api.qijieya.cn/meting/",
  ],
  tencent: [
    "https://meting.mikus.ink/api",
    "https://api.qijieya.cn/meting/",
  ],
};

// 获取播放列表 - 添加重试机制
const getMusicListData = async (retryCount = 0) => {
  try {
    const apiUrls = musicApiUrls[musicPlatform.value] || musicApiUrls.netease;
    const musicList = await getMusicList(apiUrls, musicId.value, musicPlatform.value, "playlist");
    initAPlayer(musicList?.length ? musicList : []);
  } catch (error) {
    console.error("获取播放列表失败:", error);
    if (retryCount < 2) {
      setTimeout(() => getMusicListData(retryCount + 1), 1000);
    } else {
      $message.error("获取播放列表失败，请重试");
      initAPlayer([]);
    }
  }
};

// 初始化播放器 - 优化错误处理和事件绑定
const initAPlayer = async (list) => {
  try {
    if (!list?.length) {
      isLoading.value = false;
      return;
    }

    const { default: APlayer } = await import("aplayer");

    player.value = new APlayer({
      container: playerDom.value,
      volume: playerVolume.value,
      lrcType: 3,
      listFolded: true,
      order: "random",
      audio: list,
    });

    isInitialized.value = true;
    isLoading.value = false;

    // 绑定播放器事件
    const p = player.value;
    p.on("canplay", getMusicData);
    p.on("play", () => { playState.value = true; });
    p.on("pause", () => { playState.value = false; });
    p.on("error", (e) => { console.error("播放器错误:", e); });

    getMusicData();
    window.$player = p;
  } catch (error) {
    console.error("初始化播放器出错:", error);
    isLoading.value = false;
  }
};

// 处理播放器点击
const handlePlayerClick = async () => {
  // 如果正在加载，不处理点击
  if (isLoading.value) return;

  // 如果播放器已初始化，切换播放/暂停
  if (player.value && isInitialized.value) {
    player.value.toggle();
    return;
  }

  // 如果播放器未初始化，先初始化
  if (!isInitialized.value) {
    isLoading.value = true;
    await getMusicListData();
  }
};

// 获取当前播放歌曲信息 - 添加防抖
let mediaTimer = null;
const getMusicData = () => {
  try {
    if (!playerDom.value) return;
    const songInfo = playerDom.value.querySelector(".aplayer-info");
    if (!songInfo) return;

    const titleEl = songInfo.querySelector(".aplayer-title");
    const authorEl = songInfo.querySelector(".aplayer-author");
    if (!titleEl || !authorEl) return;

    const songName = titleEl.textContent || "未知曲目";
    const songArtist = authorEl.textContent?.replace(" - ", "") || "未知艺术家";

    playerData.value = { name: songName, artist: songArtist };

    // 防抖更新媒体会话
    clearTimeout(mediaTimer);
    mediaTimer = setTimeout(() => initMediaSession(songName, songArtist), 100);
  } catch (error) {
    console.error("获取播放信息出错:", error);
  }
};

// 初始化媒体会话控制
const initMediaSession = (title, artist) => {
  if ("mediaSession" in navigator) {
    // 歌曲信息
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist });
    // 按键关联
    navigator.mediaSession.setActionHandler("play", () => {
      player.value?.play();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      player.value?.pause();
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      player.value?.skipBack();
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      player.value?.skipForward();
    });
  }
};

// 监听播放器开启状态
watch(
  () => playerShow.value,
  (val) => {
    if (!val) return false;
    player.value?.destroy();
    getMusicListData();
  },
);

// 监听音乐平台变化
watch(
  () => musicPlatform.value,
  () => {
    if (!playerShow.value || !player.value) return;
    player.value.destroy();
    getMusicListData();
  },
);

// 监听歌单 ID 变化
watch(
  () => musicId.value,
  () => {
    if (!playerShow.value || !player.value) return;
    player.value.destroy();
    getMusicListData();
  },
);

// 监听播放器音量变化
watch(
  () => playerVolume.value,
  (val) => {
    player.value?.volume(val, true);
  },
);

onMounted(() => {
  if (window.innerWidth >= 768 && playerShow.value && enable) getMusicListData();
});

onBeforeUnmount(() => {
  clearTimeout(mediaTimer);
  player.value?.destroy();
  player.value = null;
});
</script>

<style lang="scss" scoped>
.player {
  height: 42px;
  margin-top: 12px;
  transition: transform 0.3s;
  cursor: pointer;
  .player-content {
    margin: 0;
    width: fit-content;
    border-radius: 50px;
    overflow: hidden;
    color: var(--main-font-color);
    font-family: var(--main-font-family);
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    box-shadow: 0 6px 10px -4px var(--main-dark-shadow);
    transition: all 0.3s;
    :deep(.aplayer-body) {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 6px;
      padding-right: 12px;
      pointer-events: none;
      .aplayer-pic {
        width: 30px;
        height: 30px;
        min-width: 30px;
        border-radius: 50%;
        margin-right: 8px;
        outline: 1px solid var(--main-card-border);
        animation: rotate 20s linear infinite;
        animation-play-state: paused;
        z-index: 2;
        .aplayer-button {
          display: none;
        }
      }
      .aplayer-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: auto;
        margin: 0;
        padding: 0;
        border: none;
        .aplayer-music {
          margin: 0;
          padding: 0;
          height: auto;
          display: flex;
          line-height: normal;
          z-index: 2;
          .aplayer-title {
            line-height: normal;
            display: inline-block;
            white-space: nowrap;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .aplayer-author {
            display: none;
          }
        }
        .aplayer-lrc {
          margin: 0;
          opacity: 0;
          margin-left: 12px;
          width: 0;
          z-index: 2;
          transition:
            width 0.3s,
            opacity 0.3s;
          &::before,
          &::after {
            display: none;
          }
          .aplayer-lrc-contents {
            p {
              text-align: center;
              color: var(--main-card-background);
              filter: blur(0.8px);
              transition:
                filter 0.3s,
                opacity 0.3s;
              &.aplayer-lrc-current {
                filter: blur(0);
              }
            }
          }
        }
        .aplayer-controller {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          .aplayer-time {
            display: none;
          }
          .aplayer-bar-wrap {
            margin: 0;
            padding: 0;
            opacity: 0;
            transition: opacity 0.3s;
            .aplayer-bar {
              height: 100%;
              background: transparent;
              .aplayer-loaded {
                display: none;
              }
              .aplayer-played {
                height: 100%;
                background: var(--main-color-white) !important;
                transition: width 0.3s;
              }
            }
          }
        }
      }
      .aplayer-notice,
      .aplayer-miniswitcher {
        display: none;
      }
    }
    :deep(.aplayer-list) {
      display: none;
    }
    &::after {
      content: "播放音乐";
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 14px;
      opacity: 0;
      color: var(--main-card-background);
      background-color: var(--main-color);
      pointer-events: none;
      transition: opacity 0.3s;
      z-index: 3;
    }
    &:hover {
      border-color: var(--main-color);
      box-shadow: 0 8px 16px -4px var(--main-color-bg);
      &::after {
        opacity: 1;
      }
    }
  }
  &.playing {
    .player-content {
      color: var(--main-card-background);
      background-color: var(--main-color);
      border: 1px solid var(--main-color);
      :deep(.aplayer-body) {
        .aplayer-pic {
          animation-play-state: running;
        }
        .aplayer-info {
          .aplayer-lrc {
            opacity: 1;
            width: 200px;
          }
          .aplayer-controller {
            .aplayer-bar-wrap {
              opacity: 1;
            }
          }
        }
      }
      &::after {
        opacity: 0;
      }
    }
  }
  &:active {
    transform: scale(0.98);
  }
  @media (max-width: 768px) {
    display: none;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-card-background);
    border-radius: 50px;
    z-index: 10;

    .loading-text {
      font-size: 12px;
      color: var(--main-font-color);
      white-space: nowrap;
    }
  }

  &.loading {
    cursor: wait;
    .player-content {
      opacity: 0.5;
    }
  }
}
</style>
