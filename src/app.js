(async function main() {
  console.log("hello world!");
  console.log({ dotenv: await require("dotenv").config() });
  await require("./db/db.js").init();
  await require("./http/server.js").init();
  console.log("EVERYTHING OK");
})();
