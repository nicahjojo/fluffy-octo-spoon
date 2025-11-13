import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { file } = req.body; // base64 string

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      // Upload image to Cloudinary
      const uploaded = await cloudinary.v2.uploader.upload(file, {
        folder: "shopify-clone",
      });

      return res.status(200).json({ url: uploaded.secure_url });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
