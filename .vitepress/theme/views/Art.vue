<template>
  <div class="art-exhibition">
    <!-- 遍历每个艺术分类 -->
    <template v-for="(category, catIndex) in data" :key="catIndex">
      <!-- 顶部横幅卡片 -->
      <Banner
        type="page"
        :title="category.class_name"
        :desc="category.description"
        :footer="category.tip"
        :image="category.top_background"
      >
        <template #footer-slot>
          <a
            v-if="isValidLink(category.buttonLink)"
            class="to-link"
            :href="category.buttonLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ category.buttonText }}</span>
          </a>
        </template>
      </Banner>

      <!-- 作品分组列表 -->
      <div
        v-for="(group, groupIndex) in category.artworks"
        :key="groupIndex"
        class="artwork-section"
      >
        <h2 class="artwork-group-title">{{ group.title }}</h2>
        <p class="artwork-group-description">{{ group.description }}</p>

        <div class="artworks-grid">
          <div
            v-for="(artwork, artIndex) in group.artworks"
            :key="artIndex"
            class="artwork-card"
            @click="handleCardClick(artwork)"
          >
            <div class="artwork-cover">
              <img
                :src="artwork.image"
                :alt="artwork.name"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
            <div class="artwork-info">
              <div class="artwork-name" :title="artwork.name">{{ artwork.name }}</div>
              <div class="artwork-artist">{{ artwork.artist }}</div>
              <div class="artwork-description">{{ artwork.description }}</div>
              <div class="artwork-toolbar">
                <a
                  v-if="isValidLink(artwork.link)"
                  class="artwork-link"
                  :href="artwork.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                >
                  详情
                </a>
                <a
                  v-else
                  class="artwork-link"
                  :href="artwork.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                >
                  查看文章
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue"

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 默认占位图（Base64 SVG）
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" x="50%25" y="50%25" text-anchor="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E'

/**
 * 验证链接是否为有效的外部链接
 */
const isValidLink = (link) => {
  return !!(link && (link.startsWith('https://') || link.startsWith('http://')))
}

/**
 * 图片加载失败时的降级处理
 */
const handleImageError = (event) => {
  const img = event.target
  if (img.src !== PLACEHOLDER_IMAGE) {
    img.src = PLACEHOLDER_IMAGE
  }
}

/**
 * 卡片点击事件 - 跳转到作品详情页
 */
const handleCardClick = (artwork) => {
  if (artwork.link) {
    window.open(artwork.link, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style lang="scss" scoped>
.art-exhibition {
  padding: 1rem 0;

  // Banner 组件内的按钮样式（与 Project.vue 一致）
  :deep(.banner-page) {
    .to-link {
      height: 40px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      color: #fff;
      background-color: var(--main-dark-opacity);
      backdrop-filter: blur(20px);
      transition:
        color 0.3s,
        background-color 0.3s;

      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
      }
    }
  }

  // ========== 作品分组区域 ==========
  .artwork-section {
    margin-bottom: 3rem;

    .artwork-group-title {
      font-size: 24px;
      font-weight: bold;
      margin: 1rem 0 0.5rem;
      line-height: 1;
      color: var(--main-font-color);
    }

    .artwork-group-description {
      font-size: 14px;
      color: var(--main-font-second-color);
      margin-bottom: 1.5rem;
    }
  }

  // ========== 作品网格 ==========
  .artworks-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -6px;

    .artwork-card {
      width: calc(25% - 12px);
      border-radius: 12px;
      border: 1px solid var(--main-card-border);
      overflow: hidden;
      margin: 6px;
      background: var(--main-card-background);
      box-shadow: 0 4px 12px -2px var(--main-border-shadow);
      min-height: 400px;
      position: relative;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px -4px var(--main-border-shadow);
      }

      @media (max-width: 1200px) {
        width: calc(50% - 12px);
      }

      @media (max-width: 768px) {
        width: calc(100% - 12px);
      }

      .artwork-cover {
        width: 100%;
        height: 200px;
        background: var(--main-card-second-background);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        img {
          object-fit: cover;
          height: 100%;
          width: 100%;
          transition: transform 0.3s;

          &:hover {
            transform: scale(1.05);
          }
        }
      }

      .artwork-info {
        padding: 12px 16px 16px;

        .artwork-name {
          font-size: 18px;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--main-font-color);
          transition: color 0.3s;

          .artwork-card:hover & {
            color: var(--main-color);
          }
        }

        .artwork-artist {
          font-size: 12px;
          color: var(--main-font-second-color);
          line-height: 16px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artwork-description {
          line-height: 20px;
          color: var(--main-font-second-color);
          height: 60px;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-align: 3;
          -webkit-box-orient: vertical;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .artwork-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .artwork-link {
            font-size: 12px;
            background: var(--main-card-second-background);
            padding: 4px 12px;
            border-radius: 8px;
            color: var(--main-font-color);
            text-decoration: none;
            transition: all 0.3s;

            &:hover {
              background: var(--main-color);
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
