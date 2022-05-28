import fs from "fs";
import path from "path";
import process from "process";
import puppeteer from "puppeteer";

const selectors = {
  url: "head link[rel='canonical']",
  manifest: "head link[rel='manifest']",
  title: "head title",
  description: "head meta[name='description']",
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

const doCheck = async (link) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const appInfo = await page.evaluate(async () => {
    const url = document.querySelector("head link[rel='canonical']")?.href ?? window.location.href;

    const manifestUrl = document.querySelector("head link[rel='manifest']")?.href;
    if (!manifestUrl) {
      return {
        url,
        active: false,
        name: document.querySelector("head title")?.text,
        description: document.querySelector("head meta[name='description']")?.content || "",
        icon: document.querySelector("head link[rel='apple-touch-icon']")?.href || "",
        images: [],
        categories: [],
        tags: [],
      };
    }

    const manifest = await (await fetch(manifestUrl)).json();

    const serviceWorkers = await navigator.serviceWorker.getRegistrations();

    const {
      name,
      description = document.querySelector("head meta[name='description']")?.content || "",
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
      document.querySelector("head link[rel='apple-touch-icon']")?.href ||
      "";

    return {
      url,
      active: serviceWorkers.length > 0,
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
  });

  await browser.close();

  return appInfo;
};

const args = process.argv.slice(2);
const filePath = path.resolve("./public/data/en.json");

console.log("args:", args);
(async () => {
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const url of args) {
    let next = { url, active: false };
    try {
      next = await doCheck(url);
    } catch (err) {
      console.error(`Fail fetch ${url} info: ${err}`);
    }

    const prev = db.find((app) => app.url === next.url);

    console.groupCollapsed(`app info for: ${url}`);
    console.log("prev", prev);
    console.log("next", next);
    console.groupEnd();

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
