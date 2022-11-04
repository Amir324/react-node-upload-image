const cron = require("node-cron")
const fs = require("fs");

cron.schedule('* * * * *', function() {
    console.log('running a task every minute');
    const directoryPath = __basedir + "/resources/static/assets/uploads/";



    try {
        fs.unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the file. " + err,
        });
    }
});
