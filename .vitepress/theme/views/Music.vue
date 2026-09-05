<template>
  <div class="heo-music-page">
    <!-- 沉浸式背景 -->
    <div class="immersive-bg" :style="{ backgroundImage: `url(${currentCover})` }"></div>

    <!-- 主播放器区域 -->
    <div class="music-hero">
      <div class="hero-glass">
        <!-- 左侧：照片和歌名 -->
        <div class="left-section">
          <div class="album-wrapper">
            <div class="album-cover" :class="{ 'is-playing': isPlaying }">
              <img :src="currentCover" :alt="currentSong.name" @error="handleCoverError" />
              <div class="vinyl-ring"></div>
            </div>
          </div>
          <div class="song-info-below">
            <h2 class="song-name">{{ currentSong.name }}</h2>
            <p class="song-artist">{{ currentSong.artist }}</p>
          </div>
        </div>
        <!-- 右侧：歌词 -->
        <div class="lyrics-section">
          <div class="lyrics-container" ref="lyricsContainer">
            <div
              v-for="(line, index) in currentLyrics"
              :key="index"
              class="lyrics-line"
              :class="{ 'is-active': currentLyricIndex === index }"
            >
              {{ line.text }}
            </div>
            <div v-if="currentLyrics.length === 0" class="lyrics-empty">
              暂无歌词
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部音乐控制台 -->
    <div class="bottom-control-bar">
      <div class="control-glass">
        <div class="control-left">
          <div class="mini-cover">
            <img :src="currentCover" :alt="currentSong.name" @error="handleCoverError" />
          </div>
          <div class="mini-info">
            <span class="mini-name">{{ currentSong.name }}</span>
            <span class="mini-artist">{{ currentSong.artist }}</span>
          </div>
        </div>
        <div class="control-center">
          <div class="control-buttons">
            <button class="ctrl-btn" @click="prevSong">
              <i class="ri ri-skip-back-fill"></i>
            </button>
            <button class="ctrl-btn play-btn" @click="togglePlay">
              <i :class="['ri', isPlaying ? 'ri-pause-fill' : 'ri-play-fill']"></i>
            </button>
            <button class="ctrl-btn" @click="nextSong">
              <i class="ri ri-skip-forward-fill"></i>
            </button>
          </div>
          <div class="progress-bar">
            <span class="time-current">{{ formatTime(currentTime) }}</span>
            <div class="progress-track" @click="seekTo">
              <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
            </div>
            <span class="time-total">{{ formatTime(duration) }}</span>
          </div>
        </div>
        <div class="control-right">
          <!-- 音量调节滑块 -->
          <div class="volume-slider-container" @mouseenter="showVolumeSlider = true" @mouseleave="handleVolumeMouseLeave">
            <button class="ctrl-btn volume-btn" @click="toggleMute">
              <i :class="['ri', volumeIcon]"></i>
            </button>
            <Transition name="volume-slide">
              <div v-if="showVolumeSlider" class="volume-slider-wrapper" @mouseenter="cancelHideVolume" @mouseleave="handleVolumeMouseLeave">
                <div class="volume-track" @mousedown="startVolumeDrag" @mousemove="onVolumeDrag" @mouseup="stopVolumeDrag" @mouseleave="stopVolumeDrag">
                  <div class="volume-fill" :style="{ height: `${playerVolume * 100}%` }"></div>
                  <div class="volume-thumb" :style="{ bottom: `${playerVolume * 100}%` }"></div>
                </div>
              </div>
            </Transition>
          </div>
          <!-- 播放模式切换按钮 -->
          <button
            class="ctrl-btn mode-btn"
            @click="cyclePlayMode"
            :title="modeLabels[playMode]"
          >
            <i :class="['ri', modeIcons[playMode]]"></i>
          </button>
          <!-- 平台切换胶囊 -->
          <div class="platform-capsule">
            <button
              :class="['capsule-btn', { active: musicPlatform === 'netease' }]"
              @click="switchPlatform('netease')"
            >
              <i class="ri ri-netease-cloud-music-fill"></i>
              <span>网易云</span>
            </button>
            <button
              :class="['capsule-btn', { active: musicPlatform === 'tencent' }]"
              @click="switchPlatform('tencent')"
            >
              <i class="ri ri-qq-fill"></i>
              <span>QQ音乐</span>
            </button>
          </div>
          <button class="ctrl-btn list-btn" @click="showPlaylist = true">
            <i class="ri ri-play-list-2-fill"></i>
            <span class="list-count">{{ playlist.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 右侧歌单弹窗 -->
    <Transition name="playlist-popup">
      <div v-if="showPlaylist" class="playlist-popup-overlay" @click.self="showPlaylist = false">
        <div class="playlist-popup-card">
          <div class="popup-header">
            <h3 class="popup-title">
              <i class="ri ri-music-2-fill"></i>
              播放列表
              <span class="popup-count">{{ playlist.length }} 首</span>
            </h3>
            <button class="close-btn" @click="showPlaylist = false">
              <i class="ri ri-close-line"></i>
            </button>
          </div>
          <div class="popup-body">
            <div
              v-for="(song, index) in playlist"
              :key="index"
              class="popup-song"
              :class="{ 'is-active': currentIndex === index }"
              @click="playSong(index)"
            >
              <div class="song-index">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="song-cover">
                <img :src="song.cover || song.pic" :alt="song.name" loading="lazy" />
              </div>
              <div class="song-info">
                <span class="song-name">{{ song.name }}</span>
                <span class="song-artist">{{ song.artist }}</span>
              </div>
              <div class="song-actions">
                <i class="ri ri-heart-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 隐藏的 APlayer 实例（仅用于音频控制） -->
    <div ref="playerDom" style="display: none;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { getMusicList } from "@/api";
import "aplayer/dist/APlayer.min.css";

const store = mainStore();
const { musicPlatform, musicId } = storeToRefs(store);

const playerDom = ref(null);
const lyricsContainer = ref(null);
const playlist = ref([]);
const currentSong = ref({ name: "加载中...", artist: "请稍候" });
const currentCover = ref("/images/avatar.jpg");
const defaultAvatar = "/images/avatar.jpg";
const currentIndex = ref(0);
const isPlaying = ref(false);
const showPlaylist = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const playMode = ref('random'); // 'list' | 'random' | 'single'
const currentLyrics = ref([]);
const currentLyricIndex = ref(0);
const showVolumeSlider = ref(false);
const playerVolume = ref(0.7);
const isMuted = ref(false);
const isDraggingVolume = ref(false);
let hideVolumeTimer = null;
const modeIcons = {
  list: 'ri-list-unordered',
  random: 'ri-shuffle-fill',
  single: 'ri-repeat-one-fill'
};
const modeLabels = {
  list: '顺序播放',
  random: '随机播放',
  single: '单曲循环'
};
const volumeIcon = computed(() => {
  if (isMuted.value || playerVolume.value === 0) return 'ri-volume-mute-fill';
  if (playerVolume.value < 0.5) return 'ri-volume-down-fill';
  return 'ri-volume-up-fill';
});
let playerInstance = null;

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

// 平台配置
const platformConfig = {
  netease: { name: "网易云音乐", id: 5314875708 },
  tencent: { name: "QQ音乐", id: 1171747653 },
};

// 初始化播放器
const initPlayer = async () => {
  const platform = musicPlatform.value;
  const apis = musicApiUrls[platform];

  try {
    // getMusicList 已内置多源自动切换逻辑，传入 API 数组即可
    const musicList = await getMusicList(apis, musicId.value, platform, "playlist");

    if (!musicList || musicList.length === 0) {
      console.error("未获取到音乐数据");
      return;
    }

    playlist.value = musicList;

    // 设置默认歌曲信息
    if (musicList[0]) {
      currentSong.value = {
        name: musicList[0].name,
        artist: musicList[0].artist,
      };
      currentCover.value = musicList[0].cover || musicList[0].pic || defaultAvatar;
    }

    const module = await import("aplayer");
    const APlayer = module.default;

    playerInstance = new APlayer({
      container: playerDom.value,
      audio: musicList,
      theme: "#d4af37",
      order: "random",
      listFolded: true,
      listMaxHeight: "300px",
      lrcType: 3,
    });

    // 初始化完成后自动播放
    setTimeout(() => {
      playerInstance.play();
    }, 500);

    // 监听播放事件更新封面
    playerInstance.on("canplay", () => {
      updateCurrentSong();
    });

    // 监听播放/暂停状态
    playerInstance.on("play", () => {
      isPlaying.value = true;
    });

    playerInstance.on("pause", () => {
      isPlaying.value = false;
    });

    // 监听时间更新
    playerInstance.on("timeupdate", () => {
      currentTime.value = playerInstance.audio.currentTime;
      duration.value = playerInstance.audio.duration || 0;
      // 尝试获取歌词
      if (playerInstance.lrc && playerInstance.lrc.current) {
        parseLyrics(playerInstance.lrc.current);
      }
      updateLyrics(currentTime.value);
    });

    // 监听歌曲切换时获取歌词
    playerInstance.on("loadeddata", () => {
      if (playerInstance.lrc && playerInstance.lrc.current) {
        parseLyrics(playerInstance.lrc.current);
      }
    });

    // 监听歌曲切换
    playerInstance.on("listswitch", (index) => {
      currentIndex.value = index.index;
      updateCurrentSong();
    });

    console.info(`🎵 音乐馆播放器初始化完成 - ${platformConfig[platform].name}`);
  } catch (error) {
    console.error("初始化音乐播放器失败:", error.message);
  }
};

// 切换音乐平台
const switchPlatform = (platform) => {
  musicPlatform.value = platform;
  musicId.value = platformConfig[platform].id;

  // 销毁旧播放器
  if (playerInstance) {
    playerInstance.destroy();
    playerInstance = null;
  }

  // 重新初始化
  initPlayer();
};

// 更新当前歌曲信息 - 添加防抖优化
let updateTimer = null;
const updateCurrentSong = () => {
  if (!playerInstance) return;
  clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    const index = playerInstance.list.index;
    currentIndex.value = index;
    const song = playlist.value[index];
    if (song) {
      currentSong.value = { name: song.name, artist: song.artist };
      currentCover.value = song.cover || song.pic || defaultAvatar;
    }
    // 重置歌词
    currentLyrics.value = [];
    currentLyricIndex.value = 0;
  }, 50);
};

// 解析歌词
const parseLyrics = (lrcData) => {
  if (!lrcData || !lrcData.length) {
    currentLyrics.value = [];
    return;
  }
  currentLyrics.value = lrcData.map(item => ({
    time: item[0],
    text: item[1] || ''
  })).filter(item => item.text);
};

// 更新当前歌词行
const updateLyrics = (time) => {
  if (!currentLyrics.value.length) return;
  let index = 0;
  for (let i = 0; i < currentLyrics.value.length; i++) {
    if (time >= currentLyrics.value[i].time) {
      index = i;
    } else {
      break;
    }
  }
  if (currentLyricIndex.value !== index) {
    currentLyricIndex.value = index;
    // 滚动到当前歌词
    scrollToLyric(index);
  }
};

// 滚动歌词到当前行
const scrollToLyric = (index) => {
  if (!lyricsContainer.value) return;
  const lines = lyricsContainer.value.querySelectorAll('.lyrics-line');
  if (lines[index]) {
    lines[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

// 点击播放指定歌曲
const playSong = (index) => {
  if (playerInstance) {
    playerInstance.list.switch(index);
    playerInstance.play();
  }
};

// 切换播放/暂停
const togglePlay = () => {
  if (!playerInstance) return;
  if (isPlaying.value) {
    playerInstance.pause();
  } else {
    playerInstance.play();
  }
};

// 上一首
const prevSong = () => {
  if (!playerInstance) return;
  playerInstance.skipBack();
};

// 下一首
const nextSong = () => {
  if (!playerInstance) return;
  playerInstance.skipForward();
};

// 进度条跳转
const seekTo = (e) => {
  if (!playerInstance || !duration.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  playerInstance.seek(percent * duration.value);
};

// 循环切换播放模式 - 使用位运算优化
const cyclePlayMode = () => {
  const modes = ['list', 'random', 'single'];
  const nextIndex = (modes.indexOf(playMode.value) + 1) % modes.length;
  playMode.value = modes[nextIndex];
  if (playerInstance) {
    playerInstance.mode = playMode.value;
  }
};

// 格式化时间 - 使用位运算优化
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = (seconds / 60) | 0;
  const secs = (seconds % 60) | 0;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// 计算进度百分比
const progressPercent = computed(() => {
  if (!duration.value) return 0;
  return (currentTime.value / duration.value) * 100;
});

// 处理封面图片加载失败
const handleCoverError = (e) => {
  e.target.src = defaultAvatar;
};

// 取消隐藏音量滑块
const cancelHideVolume = () => {
  if (hideVolumeTimer) {
    clearTimeout(hideVolumeTimer);
    hideVolumeTimer = null;
  }
};

// 处理音量区域鼠标离开
const handleVolumeMouseLeave = () => {
  if (isDraggingVolume.value) return;
  hideVolumeTimer = setTimeout(() => {
    showVolumeSlider.value = false;
  }, 300);
};

// 开始拖动音量
const startVolumeDrag = (e) => {
  isDraggingVolume.value = true;
  adjustVolumeFromEvent(e);
};

// 拖动中更新音量
const onVolumeDrag = (e) => {
  if (isDraggingVolume.value) {
    adjustVolumeFromEvent(e);
  }
};

// 停止拖动
const stopVolumeDrag = () => {
  isDraggingVolume.value = false;
};

// 从事件调整音量
const adjustVolumeFromEvent = (e) => {
  if (!playerInstance) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = 1 - (e.clientY - rect.top) / rect.height;
  playerVolume.value = Math.max(0, Math.min(1, percent));
  playerInstance.volume(playerVolume.value, true);
  isMuted.value = false;
};

// 切换静音
const toggleMute = () => {
  if (!playerInstance) return;
  isMuted.value = !isMuted.value;
  if (isMuted.value) {
    playerInstance.volume(0, true);
  } else {
    playerInstance.volume(playerVolume.value, true);
  }
};

// 调整音量（点击方式）
const adjustVolume = (e) => {
  adjustVolumeFromEvent(e);
};

onMounted(() => {
  initPlayer();
});

// 监听平台变化
watch(
  () => musicPlatform.value,
  (newPlatform) => {
    if (!playerInstance) return;
    // 销毁旧播放器并重新初始化
    playerInstance.destroy();
    playerInstance = null;
    initPlayer();
  }
);

// 监听歌单 ID 变化
watch(
  () => musicId.value,
  (newId) => {
    if (!playerInstance || !musicPlatform.value) return;
    // 销毁旧播放器并重新初始化
    playerInstance.destroy();
    playerInstance = null;
    initPlayer();
  }
);

onBeforeUnmount(() => {
  clearTimeout(updateTimer);
  playerInstance?.destroy();
  playerInstance = null;
  // 恢复滚动
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.heo-music-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;
  z-index: 100;
  background-color: var(--main-background, #f5f5f5);
  pointer-events: auto;
}

// 沉浸式背景
.immersive-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(40px) brightness(0.45);
  transform: scale(1.3);
  z-index: -1;
  transition: background-image 1.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.06) 100%
    );
    pointer-events: none;
  }
}

// 主播放器区域
.music-hero {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 120px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .hero-glass {
    max-width: 1400px;
    width: 100%;
    height: calc(100% - 2rem);
    max-height: 700px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    border-radius: 32px;
    padding: 3rem;
    display: flex;
    align-items: center;
    gap: 3rem;
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 150%;
      height: 150%;
      background: radial-gradient(
        circle at 70% 30%,
        rgba(255, 215, 0, 0.06) 0%,
        transparent 60%
      );
      pointer-events: none;
    }

    // 左侧区域：照片 + 歌名
    .left-section {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      width: 580px;

      .album-wrapper {
        position: relative;
        z-index: 1;

        .album-cover {
          position: relative;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.25),
            0 0 0 12px rgba(255, 255, 255, 0.4),
            0 0 0 24px rgba(255, 255, 255, 0.2);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            transform: scale(1.03);
          }

          &.is-playing {
            animation: rotate 30s linear infinite;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .vinyl-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%);
            border: 5px solid rgba(255, 215, 0, 0.8);
            box-shadow:
              inset 0 3px 10px rgba(0, 0, 0, 0.15),
              0 0 20px rgba(255, 215, 0, 0.3);
          }
        }
      }

      .song-info-below {
        text-align: center;
        color: #2c3e50;

        .song-name {
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 0.6rem;
          line-height: 1.3;
          color: #1a1a1a;
        }

        .song-artist {
          font-size: 1.5rem;
          opacity: 0.75;
          font-weight: 500;
          color: #4a4a4a;
        }
      }
    }

    // 右侧区域：歌词
    .lyrics-section {
      flex: 1;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;

      .lyrics-container {
        height: 100%;
        max-height: 480px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1rem 1.5rem;
        text-align: center;
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }

        .lyrics-line {
          padding: 1rem 0;
          font-size: 1.4rem;
          color: rgba(44, 62, 80, 0.5);
          transition: all 0.3s ease;
          line-height: 1.8;

          &.is-active {
            font-size: 1.8rem;
            font-weight: 700;
            color: #1a1a1a;
            transform: scale(1.08);
          }
        }

        .lyrics-empty {
          padding: 2rem;
          font-size: 1.3rem;
          color: rgba(44, 62, 80, 0.4);
        }
      }
    }
  }
}

// 底部音乐控制台
.bottom-control-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 1.5rem 1rem;

  .control-glass {
    max-width: 1400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-radius: 24px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      0 -10px 40px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);

    .control-left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      flex: 1;
      min-width: 0;

      .mini-cover {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        overflow: hidden;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .mini-info {
        display: flex;
        flex-direction: column;
        min-width: 0;

        .mini-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a1a1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mini-artist {
          font-size: 0.82rem;
          color: #6b5c4a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .control-center {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .control-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;

        .ctrl-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #4a4a4a;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: rgba(255, 215, 0, 0.15);
            color: #d4af37;
          }

          &.play-btn {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #ffd700, #ffc107);
            color: #fff;
            font-size: 1.4rem;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);

            &:hover {
              transform: scale(1.08);
              box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
            }
          }
        }
      }

      // 播放模式切换
      .play-mode-switcher {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        .mode-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: rgba(107, 92, 74, 0.5);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: rgba(255, 215, 0, 0.1);
            color: #d4af37;
          }

          &.active {
            background: rgba(255, 215, 0, 0.15);
            color: #d4af37;
          }
        }
      }

      .progress-bar {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
        max-width: 400px;

        .time-current,
        .time-total {
          font-size: 0.75rem;
          color: #6b5c4a;
          font-family: 'Courier New', monospace;
          min-width: 36px;
          text-align: center;
        }

        .progress-track {
          flex: 1;
          height: 4px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;

          &:hover {
            height: 6px;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffd700, #ffc107);
            border-radius: 2px;
            transition: width 0.1s linear;
          }
        }
      }
    }

    .control-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;

      // 音量调节滑块容器
      .volume-slider-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 40px;
        height: 40px;

        .volume-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.6);
          color: #6b5c4a;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 215, 0, 0.3);
          position: relative;
          z-index: 2;

          &:hover {
            background: rgba(255, 215, 0, 0.15);
            color: #d4af37;
            transform: scale(1.05);
          }

          i {
            color: #d4af37;
          }
        }

        .volume-slider-wrapper {
          position: absolute;
          bottom: 52px;
          left: 50%;
          transform: translateX(-50%);
          padding: 12px 8px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255, 215, 0, 0.2);
          pointer-events: auto;
          z-index: 10;

          .volume-track {
            width: 6px;
            height: 120px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            position: relative;
            cursor: pointer;

            .volume-fill {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background: linear-gradient(to top, #ffd700, #ffc107);
              border-radius: 3px;
              transition: height 0.1s ease;
            }

            .volume-thumb {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              width: 16px;
              height: 16px;
              background: #fff;
              border: 3px solid #d4af37;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
              transition: bottom 0.1s ease;
            }
          }
        }
      }

      // 播放模式按钮
      .mode-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.6);
        color: #6b5c4a;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 215, 0, 0.3);

        &:hover {
          background: rgba(255, 215, 0, 0.15);
          color: #d4af37;
          transform: scale(1.05);
        }

        i {
          color: #d4af37;
        }
      }

      // 平台切换胶囊
      .platform-capsule {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: 24px;
        padding: 4px;
        backdrop-filter: blur(12px);

        .capsule-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 20px;
          background: transparent;
          color: #6b5c4a;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;

          i {
            font-size: 0.9rem;
            color: #d4af37;
          }

          span {
            font-weight: 500;
          }

          &:hover {
            background: rgba(255, 255, 255, 0.4);
          }

          &.active {
            background: linear-gradient(135deg, #ffd700, #ffc107);
            color: #fff;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);

            i {
              color: #fff;
            }
          }
        }
      }

      .list-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        color: #6b5c4a;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255, 215, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.5);
          color: #4a3f2f;
        }

        .list-count {
          font-size: 0.8rem;
          font-weight: 600;
          color: #d4af37;
        }
      }
    }
  }
}

// 右侧歌单弹窗
.playlist-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1.5rem;

  .playlist-popup-card {
    width: 380px;
    max-width: 85vw;
    height: calc(100vh - 160px);
    max-height: 600px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      -10px 0 50px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    overflow: hidden;

    .popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      flex-shrink: 0;

      .popup-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #2c3e50;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        i {
          color: #d4af37;
          font-size: 1.1rem;
        }

        .popup-count {
          font-size: 0.82rem;
          font-weight: 500;
          color: #8b7355;
          margin-left: 0.3rem;
        }
      }

      .close-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, 0.05);
        color: #6b5c4a;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #2c3e50;
        }
      }
    }

    .popup-body {
      flex: 1;
      overflow-y: auto;
      padding: 0.6rem 0.8rem;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.12);
        border-radius: 2px;
      }

      .popup-song {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.65rem 0.7rem;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.25s ease;
        margin-bottom: 0.2rem;

        &:hover {
          background: rgba(255, 215, 0, 0.08);

          .song-cover img {
            transform: scale(1.05);
          }
        }

        &.is-active {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 193, 7, 0.08));

          .song-index {
            color: #d4af37;
            font-weight: 700;
          }

          .song-name {
            color: #1a1a1a;
            font-weight: 700;
          }
        }

        .song-index {
          width: 26px;
          text-align: center;
          font-size: 0.82rem;
          color: rgba(107, 92, 74, 0.5);
          font-family: 'Courier New', monospace;
          font-weight: 600;
          flex-shrink: 0;
        }

        .song-cover {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
        }

        .song-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;

          .song-name {
            font-size: 0.88rem;
            font-weight: 500;
            color: #2c3e50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .song-artist {
            font-size: 0.76rem;
            color: rgba(107, 92, 74, 0.7);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .song-actions {
          padding: 0.4rem;
          color: rgba(107, 92, 74, 0.4);
          transition: color 0.2s;
          flex-shrink: 0;

          &:hover {
            color: #ff6b9d;
          }
        }
      }
    }
  }
}

// 弹窗过渡动画（从右侧滑入）
.playlist-popup-enter-active,
.playlist-popup-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.playlist-popup-enter-from {
  opacity: 0;

  .playlist-popup-card {
    transform: translateX(100%);
  }
}

.playlist-popup-leave-to {
  opacity: 0;

  .playlist-popup-card {
    transform: translateX(100%);
  }
}

// 音量滑块过渡动画
.volume-slide-enter-active,
.volume-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.volume-slide-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

.volume-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}


// 旋转动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .music-hero {
    padding: 1rem;

    .hero-glass {
      flex-direction: column;
      text-align: center;
      padding: 2rem 1.2rem;
      gap: 1.5rem;
      border-radius: 28px;

      .album-wrapper .album-cover {
        width: 200px;
        height: 200px;
        box-shadow:
          0 25px 60px rgba(0, 0, 0, 0.2),
          0 0 0 10px rgba(255, 255, 255, 0.4),
          0 0 0 20px rgba(255, 255, 255, 0.2);
      }

      .song-details {
        .song-name { font-size: 2rem; }
        .song-artist { font-size: 1.2rem; }
        .song-meta { justify-content: center; }

        .platform-switcher {
          justify-content: center;
          flex-wrap: wrap;

          .platform-btn {
            padding: 0.7rem 1.3rem;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .music-hero .hero-glass {
    padding: 1.5rem 1rem;

    .album-wrapper .album-cover {
      width: 160px;
      height: 160px;
    }

    .song-details {
      .song-name { font-size: 1.6rem; }
      .song-artist { font-size: 1.05rem; }

      .platform-switcher .platform-btn {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
        gap: 0.5rem;
      }
    }
  }
}
</style>
