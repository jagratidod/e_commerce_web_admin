const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret'
});

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce/products',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
};

// Upload multiple images
const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadToCloudinary(file.buffer));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    throw new Error('Error uploading images to Cloudinary');
  }
};

module.exports = { uploadToCloudinary, uploadMultipleImages };

