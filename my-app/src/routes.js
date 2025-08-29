// scripts/generate-sitemap.js

const fs = require("fs");
const path = require("path");

// 站点根地址
const siteRoot = "https://www.pilotseal.com";

// 读取自定义路由配置
let routes = [];

try {
  routes = require("../src/routes");
} catch (err) {
  console.error("❌ 无法加载 routes.js 文件，请确认路径是否正确。");
  process.exit(1);
}

if (!Array.isArray(routes)) {
  console.error("❌ routes.js 文件格式错误，应该导出一个数组。");
  process.exit(1);
}

// 构造 sitemap 条目
const sitemapEntries = routes.map((route) => {
  const loc = `${siteRoot}${route.path}`;
  const changefreq = route.changefreq || "monthly";
  const priority = route.priority || "0.8";

  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

// 生成完整 sitemap 内容
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>`;

// 写入 public/sitemap.xml
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");

console.log(`✅ 站点地图已成功生成：${outputPath}`);