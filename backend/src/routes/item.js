import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { addItem, enquireItems, getItems } from "../controller/item.js";

const router = Router();

router.route("/create").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "additionalImages",
      maxCount: 5,
    },
  ]),
  addItem
);

router.route("/").get(getItems);

router.route("/enquire").post(enquireItems);

export default router;
