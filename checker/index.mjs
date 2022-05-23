import fs from "fs";
import path from "path";
import process from "process";
import puppeteer from "puppeteer";

const doCheck = async (link) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const appInfo = await page.evaluate(async () => {
    const url = document.querySelector("head link[rel='canonical']")?.href ?? window.location.href;
    const manifest = document.querySelector("head link[rel='manifest']")?.href;
    const serviceWorkers = await navigator.serviceWorker.getRegistrations();

    return {
      url,
      active: !!manifest && serviceWorkers.length > 0,
      title: document.querySelector("head title")?.text,
      description: document.querySelector("head meta[name='description']")?.content || "",
      icon: document.querySelector("head link[rel='apple-touch-icon']")?.href || "",
      images: [],
      categories: [],
      tags: [],
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
    const next = await doCheck(url);
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

        app.active = app.active || next.active;
        app.title = next.title;
        app.description = next.description;
        app.icon = next.icon;
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
