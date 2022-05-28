/* eslint-disable no-underscore-dangle */
import fs from "file-system";
import jwtDecode from "jwt-decode";
import Image from "../models/image.model";
import User from "../models/user.model";
import Course from "../models/courses.model";

const create = async (req, res, next) => {
  const originalFileName = req.file.originalname.split("-")[0];
  const fileName = req.file.originalname;
  const id = jwtDecode(req.cookies.userJwtToken)._id;
  const courseId = req.file.originalname.split("_")[2].split("-")[0];

  // file size threshold
  const fileSizeLimit = 1024 * 1024 * 10;
  // if no file sent to server report error. This is handled on frontend
  // but wanted to have additional check
  if (!req.file) {
    return res.send({ error: "You forgot to upload file" });
  }

  const image = new Image({
    image: req.file.originalname,
    imageUrl: `http://localhost:5000/images/${req.file.originalname}`,
  });
  // if file size bigger than threshold remove file
  if (req.file.size > fileSizeLimit) {
    fs.fs.unlinkSync(`./${req.file.path}`);
    return res.send({ Error: "Allowed size of image is 10MB" });
  }
  if (
    req.file.mimetype.includes("image/jpeg") ||
    req.file.mimetype.includes("image/png")
  ) {
    image.save((err, result) => {
      if (err) {
        return res.send({ error: "error" });
      }

      // loop through folder images and filter all images that have the same value before
      // -. Than remove all except last added item
      fs.fs
        .readdirSync("./images")
        .filter((item) => item.includes(`${originalFileName}`))
        .map((item) => {
          if (item.includes(courseId)) {
            if (item !== fileName) {
              fs.fs.unlinkSync(`./images/${item}`);
            }
          } else {
            if (item !== fileName) {
              fs.fs.unlinkSync(`./images/${item}`);
            }
          }
        });

      res.send({
        message: "Cover image uploaded successfully",
        imageUrl: `/images/${fileName}`,
      });
    });
  } else {
    // Multer is not preventing user to upload message but reports only error.
    // Code below unlinks file if there is any error (for example wrong file format)
    fs.fs.unlinkSync(`./${req.file.path}`);
    return res.send({ error: "Format of the file must be PNG | JPEG | JPG" });
  }

  if (fileName.includes("course")) {
    const courseId = req.file.originalname.split("_")[2].split("-")[0];
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { courseImage: `/images/${fileName}` }
    );
  } else {
    await User.findOneAndUpdate(
      { _id: id },
      { userImage: `/images/${fileName}` }
    );
  }
};

export default {
  create,
};