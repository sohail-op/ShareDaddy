import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  region: 'auto',
  signatureVersion: 'v4',
  ACL: 'public-read',
});


const uploadToR2 = (file) => {
  const params = {
    Bucket: 'files-sharedaddy',
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

export { uploadToR2 };
