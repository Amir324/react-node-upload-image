const cron = require("node-cron");
const controller = require("./controller/file.controller");

//running cron every mintue
cron.schedule("* * * * *", function () {
  console.log("cron run");
  controller.remove();
});
