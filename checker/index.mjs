import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import process from "process";

const selectors = {
  url: "head link[rel='canonical']",
  manifest: "head link[rel='manifest']",
  title: "head title",
  description: "head meta[name='description']",
  icon: "head link[rel='apple-touch-icon']",
  openGraph: {
    title: "head meta[property='og:title']",
    type: "head meta[property='og:type']",
    image: "head meta[property='og:image']",
    url: "head meta[property='og:url']",
    description: "head meta[property='og:description']",
    name: "head meta[property='og:site_name']",
    locale: "head meta[property='og:locale']",
    localeAlt: "head meta[property='og:locale:alternate']",
  },
};

const doFetch = async (url) => {
  console.debug("fetch: ", url);
  return (await fetch(url)).json();
};

const doWebScrape = async (url, selector, attribute) => {
  if (attribute) {
    const res = await doFetch(
      `https://web.scraper.workers.dev/?url=${url}&` +
        new URLSearchParams({
          selector,
          scrape: "attr",
          attr: attribute,
        })
    );
    if (res.Error) throw new Error(res.Error);
    return res.result;
  }

  const res = await doFetch(
    `https://web.scraper.workers.dev/?url=${url}&` +
      new URLSearchParams({
        selector,
        scrape: "text",
      })
  );
  if (res.Error) throw new Error(res.Error);
  if (!res.result) return undefined;

  return res.result[selector][0];
};

const doCheck = async (link) => {
  const headerTitle = await doWebScrape(link, selectors.title);
  const headerDescription = await doWebScrape(link, selectors.description, "content");
  const headerIcon = await doWebScrape(link, selectors.icon, "href");

  const openGraphTitle = await doWebScrape(link, selectors.openGraph.title, "content");
  const openGraphImage = await doWebScrape(link, selectors.openGraph.image, "content");
  const openGraphUrl = await doWebScrape(link, selectors.openGraph.url, "content");
  const openGraphDescription = await doWebScrape(link, selectors.openGraph.description, "content");
  const openGraphName = await doWebScrape(link, selectors.openGraph.name, "content");

  let url = (await doWebScrape(link, selectors.url, "href")) || openGraphUrl || link;
  url = new URL(url, link).href;

  let manifestUrl = await doWebScrape(link, selectors.manifest, "href");
  if (!manifestUrl || /^\s+$/.test(manifestUrl)) {
    return {
      url,
      isActive: false,
      name: openGraphName || openGraphTitle || headerTitle,
      description: openGraphDescription || headerDescription,
      icon: headerIcon || openGraphImage,
      categories: [],
    };
  }

  if (url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }

  manifestUrl = new URL(manifestUrl, url).href;
  const manifest = await doFetch(manifestUrl);
  const {
    name = openGraphName || openGraphTitle || headerTitle,
    description = openGraphDescription || headerDescription,
    categories = [],
    icons = [],
    lang,
    screenshots = [],
    background_color,
    theme_color,
  } = manifest;

  const icon =
    icons.find((i) => (i.purpose === "any" || !i.purpose) && i.sizes === "192x192")?.src ||
    icons.find((i) => (i.purpose === "any" || !i.purpose) && i.sizes === "512x512")?.src ||
    headerIcon ||
    openGraphImage;
  return {
    url,
    isActive: true,
    name,
    description,
    icon,
    icons,
    lang,
    categories,
    screenshots,
    background_color,
    theme_color,
  };
};

const args = process.argv.slice(2);
const filePath = path.resolve("./src/data/en.json");

console.log("args:", args);
(async () => {
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const url of args) {
    try {
      const next = await doCheck(url);

      const prev = db.find((app) => app.url === next.url);

      // console.groupCollapsed(`app info for: ${url}`);
      // console.log("prev", prev);
      // console.log("next", next);
      // console.groupEnd();

      if (!prev) {
        db.push(next);
      } else {
        db.map((app) => {
          if (app.url !== next.url) {
            return;
          }

          const categories = app.categories || [];
          Object.assign(app, next);
          app.categories = categories.concat(next.categories.filter((i) => categories.indexOf(i) < 0));
        });
      }
    } catch (err) {
      console.error(`fail process ${url}: ${err.message}.\n${err.stack}`);
    }
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      db.sort((prev, next) => prev.url.localeCompare(next.url)),
      undefined,
      2
    )
  );
})();
