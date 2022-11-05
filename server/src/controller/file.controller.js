const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const uuid = require('uuid')
const dayjs = require("dayjs");
const path = require('path')
var db = require('diskdb');

db = db.connect('../../', ['images']);

const upload = async (req, res, next) => {

  try {
    await uploadFile(req, res);

    console.log("x-ttl", req.headers["x-ttl"])

    const date = dayjs(new Date()).unix()
    const newImage = {
      name: req.file.filename,
      created_at: date,
      ttl:  date + (+req.headers["x-ttl"])
    }

    db.images.save(newImage)
    console.log(db.images.find())

    next()


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
  const noImagePath =  __basedir + "/assets/images/no_image.png"
  console.log({directoryPath})

  const image = db.images.findOne({name: name})

  console.log({image})

  //
  // if(imageRecord){
  // console.log(dayjs(new Date()).unix(), imageRecord.ttl)
  //   if(dayjs(new Date()).unix() > imageRecord.ttl){
  //     res.status(404)
  //   }
  // }
    console.log(dayjs(new Date()).unix() > image.ttl)
    console.log((dayjs(new Date()).unix()))
    console.log(image.ttl)
  if(!image || (dayjs(new Date()).unix() > image.ttl) ){
    console.log("here")
    res.status(404).sendFile(noImagePath)
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
