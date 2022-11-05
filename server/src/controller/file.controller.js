const uploadFile = require("../middleware/upload");
const dayjs = require("dayjs");
const { db } = require("../../server");
const fs = require("fs").promises;

const upload = async (req, res, next) => {
  try {
    await uploadFile(req, res);

    const date = dayjs(new Date()).unix();
    const newImage = {
      name: req.file.filename,
      created_at: date,
      ttl: date + +req.headers["x-ttl"],
    };

    db.images.save(newImage);
    next();

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
  } catch (err) {
    console.log(err);

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

const download = async (req, res) => {
  const name = req.params.name;
  const directoryPath = __basedir + "/uploads/" + name;
  const noImagePath = __basedir + "/assets/images/no_image.png";
  const image = db.images.findOne({ name: name });
  if (!image || dayjs(new Date()).unix() > image.ttl) {
    res.status(404).sendFile(noImagePath);
  }

  res.sendFile(directoryPath);
};

const remove = async () => {
  const directoryPath = __basedir + "/uploads/";

  const allImages = db.images.find();
  const expiredImages = allImages.filter(
    (image) => image.ttl < dayjs(new Date()).unix()
  );

  const deleteImages = async (imagePath) => {
    try {
      await fs.unlink(imagePath);
    } catch (e) {
      console.log(e);
    }
  };

  const startDeleteFiles = async (files) => {
    for (const file of files) {
      await deleteImages(directoryPath + file.name);
    }
  };

  await startDeleteFiles(expiredImages);
};

module.exports = {
  upload,
  download,
  remove,
};
