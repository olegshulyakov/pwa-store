const process = require("process");
const puppeteer = require("puppeteer");

async function doCheck(link) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link);

  const siteData = await page.evaluate(async () => {
    const url = document.querySelector("head link[rel='canonical']")?.href ?? window.location.href;
    const manifest = document.querySelector("head link[rel='manifest']")?.href;
    const serviceWorkers = await navigator.serviceWorker.getRegistrations();

    return {
      url,
      active: !!manifest && serviceWorkers.length > 0,
      title: document.querySelector("head title")?.text,
      description: document.querySelector("head meta[name='description']")?.content,
      icon: document.querySelector("head link[rel='apple-touch-icon']")?.href,
      images: [],
      categories: [],
      tags: [],
    };
  });

  console.log(`${JSON.stringify(siteData)},\n`);

  await browser.close();
}

const args = process.argv.slice(2);

console.log("args:", args);
console.log("\nApps:");

for (const url of args) doCheck(url);
