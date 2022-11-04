const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path')
const uuid = require('uuid')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    // console.log({file})
    const ext = path.extname(file.originalname)

    const id = uuid.v4()
    const filePath = `${id}${ext}`
    cb(null, filePath);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
