const process = require("process");
const https = require("https");
const cheerio = require("cheerio");

const selector = {
  title: "title",
  description: "meta[name='description']",
  url: "link[rel='canonical']",
  icon: "link[rel='apple-touch-icon']",
  manifest: "link[rel='manifest']",
};

function doRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        port: 443,
        method: "GET",
      },
      function (response) {
        response.setEncoding("utf8");
        response.on("data", function (body) {
          resolve(body);
        });
        response.on("error", function (err) {
          console.error(`Could fetch: ${url}\n${err}`);
          reject(err);
        });
      }
    );
  });
}

function doCheck(url) {
  doRequest(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const root = $("html");
      const head = root.find("head").first();

      const siteData = {
        url: url,
        active: false,
        title: undefined,
        description: undefined,
        icon: undefined,
        images: [],
        categories: [],
        tags: [],
      };

      if (head.find(selector.title).length > 0) {
        siteData.title = head.find(selector.title).first().text();
      }

      if (head.find(selector.description).length > 0) {
        siteData.description = head.find(selector.description).first().attr("content");
      }

      if (head.find(selector.url).length > 0) {
        siteData.url = `${head.find(selector.url).find().attr("href")}`;
      }

      if (head.find(selector.icon).length > 0) {
        siteData.icon = `${siteData.url.replace(/\/$/, "")}${head.find(selector.icon).first().attr("href")}`;
      }

      if (head.find(selector.manifest).length > 0) {
        siteData.active = true;
      }

      console.log(siteData);
    })
    .catch((err) => console.error(`Could parse: ${url}\n${err}`));
}

const args = process.argv.slice(2);

for (const url of args) doCheck(url);
