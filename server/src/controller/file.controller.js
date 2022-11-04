const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const uuid = require('uuid')
const dayjs = require("dayjs");
const path = require('path')
var db = require('diskdb');

db = db.connect('../../', ['images']);

var article = {
  title : "diskDB rocks",
  published : "today",
  rating : "5 stars"
}
console.log(db.images.save(article))

console.log(db.images.find({rating : "5 stars"}))

const upload = async (req, res, next) => {

  try {
    await uploadFile(req, res);

    const date = dayjs(new Date()).unix()
    db[req.file.filename] = {

    }

    next()

    console.log({db})

    // console.log("req.file", req.file)

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }


  } catch (err) {
    console.log("err", err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

const getListFiles = async (req, res) => {
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = async (req, res) => {
  const pathname = req.pathname
  console.log({pathname})
  console.log(req.params)
  const name = req.params.name
  const directoryPath = __basedir + "/uploads/" + name
  console.log({directoryPath})

  const imageRecord = db[req.params.name]

  console.log({db})


  if(imageRecord){
  console.log(dayjs(new Date()).unix(), imageRecord.ttl)
    if(dayjs(new Date()).unix() > imageRecord.ttl){
      res.status(404)
    }
  }

  // res.status(200).json({path: name});

  res.sendFile(directoryPath)


  //
  // res.download(directoryPath + fileName, fileName, (err) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: "Could not download the file. " + err,
  //     });
  //   }
  // });
};

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
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
};

module.exports = {
  upload,
  getListFiles,
  download,
  remove,
  removeSync,
};
