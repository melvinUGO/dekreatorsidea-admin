import { mongooseConnect } from "@/lib/mongoose";
import { v2 as cloudinary } from "cloudinary";
import { isAdminRequest } from "./auth/[...nextauth]";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
});

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const photo = req.body.photo;
  const photoData = await cloudinary.uploader.upload(photo, {
    folder: "dekreatorsidea",
  });
  res.json(photoData.secure_url);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
