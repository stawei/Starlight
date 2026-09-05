/**
 * 获取一言
 * @param {string} [rule="updated"] - 文章的排序规则，可以是 "created" 或 "updated"
 */
export const getHitokoto = async () => {
  const result = await fetch("https://v1.hitokoto.cn");
  const hitokoto = await result.json();
  return hitokoto;
};

/**
 * 获取给定网址的站点图标和描述
 * @param {string} url - 站点 URL
 * @returns {Promise<{iconUrl: string, description: string}>}
 */
export const getSiteInfo = async (url) => {
  const details = {
    iconUrl: null,
    title: null,
    description: null,
  };
  try {
    // 站点数据
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    // 获取页面标题
    const titleElement = doc.querySelector("title");
    details.title = titleElement ? titleElement.textContent : "暂无标题";
    // 获取 icon
    let iconLink =
      doc.querySelector("link[rel='shortcut icon']") || doc.querySelector("link[rel='icon']");
    if (iconLink) {
      details.iconUrl = new URL(iconLink.getAttribute("href"), url).href;
    } else {
      details.iconUrl = new URL("/favicon.ico", url).href;
    }
    // 获取描述
    const metaDescription = doc.querySelector("meta[name='description']");
    details.description = metaDescription ? metaDescription.content : "暂无站点描述";
  } catch (error) {
    console.error("获取站点信息失败：", error);
  }
  return details;
};

/**
 * Meting 音乐 API（支持多源自动切换）
 * @param {string|string[]} url - 单个 API 地址或 API 地址数组
 * @param {string} id - 歌单ID
 * @param {string} server - 服务器类型 (netease/tencent)
 * @param {string} type - 类型 (playlist/song/search)
 * @returns {Promise<Object[]>} - 音乐列表
 */
export const getMusicList = async (url, id, server = "netease", type = "playlist") => {
  // 如果传入的是字符串，转为数组统一处理
  const urls = Array.isArray(url) ? url : [url];

  // 默认备用 API 列表（按平台区分）
  const defaultFallbackApis = {
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

  // 合并用户传入的 URL 和默认备用 API（去重）
  const allUrls = [...new Set([...urls, ...(defaultFallbackApis[server] || [])])];

  let lastError = null;

  // 依次尝试每个 API
  for (const apiUrl of allUrls) {
    try {
      console.log(`🎵 尝试获取音乐数据: ${apiUrl}`);
      const result = await fetch(`${apiUrl}?server=${server}&type=${type}&id=${id}`);

      if (!result.ok) {
        console.warn(`️ API 返回错误状态: ${result.status} - ${apiUrl}`);
        continue;
      }

      const list = await result.json();

      if (!list || !Array.isArray(list) || list.length === 0) {
        console.warn(`⚠️ API 返回空数据: ${apiUrl}`);
        continue;
      }

      console.info(`✅ 成功获取音乐数据 (${list.length}首) from: ${apiUrl}`);

      // 转换数据格式（兼容 Meting API 返回格式）
      return list.map((song) => {
        const { title, author, pic, ...rest } = song;
        return {
          ...rest,
          name: title || song.name || "未知曲目",
          artist: author || song.artist || "未知艺术家",
          cover: pic || song.cover || "",
        };
      });
    } catch (error) {
      console.error(`❌ API 请求失败: ${apiUrl}`, error.message);
      lastError = error;
      continue;
    }
  }

  // 所有 API 都失败
  console.error("❌ 所有音乐 API 均无法获取数据");
  throw new Error(`无法获取音乐数据，已尝试 ${allUrls.length} 个 API 源。最后错误: ${lastError?.message}`);
};

/**
 * 站点统计数据
 */
export const getStatistics = async (key) => {
  const result = await fetch(`https://v6-widget.51.la/v6/${key}/quote.js`);
  const title = [
    "最近活跃",
    "今日人数",
    "今日访问",
    "昨日人数",
    "昨日访问",
    "本月访问",
    "总访问量",
  ];
  const data = await result.text();
  let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g);
  num = num.map((el) => {
    const val = el.replace(/(<\/span><span>)/g, "");
    return val.replace(/(<\/span><\/p>)/g, "");
  });
  const statistics = {};
  for (let i = 0; i < num.length; i++) {
    if (i === num.length - 1) continue;
    statistics[title[i]] = num[i];
  }
  return statistics;
};
