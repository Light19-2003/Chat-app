import { v2 as cloud } from "cloudinary";

cloud.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_serct_key,
});

export default cloud;
