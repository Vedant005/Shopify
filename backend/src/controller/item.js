import { Item } from "../models/item.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addItem = async (req, res) => {
  const { name, itemType, description } = req.body;

  if ([name, itemType, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  let coverImageLocalPath;
  console.log(req.files);

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  let additionalImageURLs = [];

  if (
    req.files &&
    Array.isArray(req.files.additionalImages) &&
    req.files.additionalImages.length > 0
  ) {
    for (const file of req.files.additionalImages) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) {
        additionalImageURLs.push(uploaded.url);
      }
    }
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(400, "Image not uploaded");
  }

  const item = await Item.create({
    name,
    itemType,
    description,
    coverImage: coverImage.url,
    additionalImages: additionalImageURLs,
  });

  const createdItem = await Item.findById(item._id);

  if (!createdItem) {
    throw new ApiError(500, "Something went wrong while creating the itme");
  }

  res
    .status(200)
    .json(new ApiResponse(201, item, "Item created successfully!"));
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(new ApiResponse(200, items, "Items fetched!"));
  } catch (error) {
    res.status(400).json(new ApiError(401, "Unable to get Items"));
  }
};

const enquireItems = async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item)
      return res.status(404).json(new ApiError(401, "Item does not exist"));

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "vedantkanekar909@gmail.com",
      subject: `Enquiry for ${item.name}`,
      html: `<h3>Item Enquiry</h3><p>Name: ${item.name}</p><p>Type:
       ${item.itemType}</p>`,
    });

    if (!info) {
      throw new ApiError(500, "Unable to enquire");
    }

    res.status(200).json(new ApiResponse(201, "Email sent!"));
  } catch (error) {
    console.log(error);

    res.status(400).json(new ApiError(400, "Unable to enquire the item"));
  }
};

export { addItem, getItems, enquireItems };
