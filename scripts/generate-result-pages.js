const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const { SITE_URL } = require(path.join(root, "js/site-config.js"));
const dataContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "js/data.js"), "utf8"), dataContext);
const data = dataContext.window.AI_SHINDAN_DATA;
const outputDir = path.join(root, "result");
fs.mkdirSync(outputDir, { recursive: true });
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
const ga = '    <script async src="https://www.googletagmanager.com/gtag/js?id=G-72VSSQLHS0"></script>\n    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config","G-72VSSQLHS0");</script>';
for (const type of data.resultTypes) {
  const pageUrl = new URL("result/" + type.id + ".html", SITE_URL).toString();
  const imageUrl = new URL("assets/ogp/" + type.id + ".png", SITE_URL).toString();
  const title = type.name + " | あなたの仕事、AIに何%任せられる？";
  const description = type.name + "：" + type.message;
  const range = type.min + "〜" + type.max + "%";
  const html = [
    "<!doctype html>", '<html lang="ja">', "  <head>",
    '    <meta charset="utf-8">', '    <meta name="viewport" content="width=device-width, initial-scale=1">',
    '    <meta name="theme-color" content="#ffd928">', "    <title>" + escapeHtml(title) + "</title>",
    '    <meta name="description" content="' + escapeHtml(description) + '">',
    '    <link rel="canonical" href="' + pageUrl + '">',
    '    <meta property="og:type" content="website">', '    <meta property="og:url" content="' + pageUrl + '">',
    '    <meta property="og:title" content="' + escapeHtml(title) + '">',
    '    <meta property="og:description" content="' + escapeHtml(description) + '">',
    '    <meta property="og:image" content="' + imageUrl + '">',
    '    <meta name="twitter:card" content="summary_large_image">',
    '    <meta name="twitter:title" content="' + escapeHtml(title) + '">',
    '    <meta name="twitter:description" content="' + escapeHtml(description) + '">',
    '    <meta name="twitter:image" content="' + imageUrl + '">',
    '    <link rel="preconnect" href="https://fonts.googleapis.com">',
    '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800;900&display=swap" rel="stylesheet">',
    '    <link rel="stylesheet" href="../css/style.css">', ga, '    <script src="../js/x-follow-tracking.js" defer></script>', "  </head>",
    '  <body class="share-page-body">', '    <main class="share-page-card">',
    '      <p class="share-page-brand">チップ商会診断</p>',
    '      <p class="share-page-kicker">あなたの仕事、AIに任せられるのは…</p>',
    '      <p class="share-page-range">' + range + '</p>',
    "      <h1>" + escapeHtml(type.name) + "</h1>",
    '      <p class="share-page-description">' + escapeHtml(type.message) + '</p>',
    '      <a class="share-page-cta" href="' + SITE_URL + '">あなたも診断する</a>',
    '      <a class="x-follow-link x-follow-link--page" href="https://x.com/chip_shokai" target="_blank" rel="noopener noreferrer" data-x-follow data-follow-placement="result_type_page"><svg class="x-follow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.4 5.4 22H2.3l7.3-8.4L1.8 2h6.4l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z"/></svg><span>@chip_shokai をフォロー</span></a>',
    "    </main>", "  </body>", "</html>"
  ].join("\n") + "\n";
  fs.writeFileSync(path.join(outputDir, type.id + ".html"), html, "utf8");
}
