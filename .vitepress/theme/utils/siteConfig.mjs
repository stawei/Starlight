// 站点配置工具 - 统一管理域名地址
import { themeConfig } from "../assets/themeConfig.mjs";

/**
 * 获取站点基础 URL
 * @returns {string} 站点基础 URL
 */
export const getSiteUrl = () => {
  return themeConfig.siteMeta.site;
};

/**
 * 构建完整的 URL
 * @param {string} path - 相对路径
 * @returns {string} 完整 URL
 */
export const buildUrl = (path) => {
  const baseUrl = getSiteUrl();
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // 移除 baseUrl 末尾的 / 和 path 开头的 / 重复
  return `${baseUrl.replace(/\/$/, '')}${normalizedPath}`;
};

/**
 * 获取 RSS URL
 * @returns {string} RSS 完整 URL
 */
export const getRssUrl = () => {
  return buildUrl('/rss.xml');
};
