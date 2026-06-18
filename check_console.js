const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`PAGE ERROR: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    console.log(`PAGE EXCEPTION: ${err.toString()}`);
  });

  try {
    await page.goto("http://localhost:3000/providers", { waitUntil: "networkidle2" });
    console.log("Page loaded successfully.");
  } catch (err) {
    console.error("Navigation error:", err);
  } finally {
    await browser.close();
  }
})();
