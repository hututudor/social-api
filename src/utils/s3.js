const AWS = require('aws-sdk');
const uuid = require('uuid');
const fs = require('fs');

const upload = async file => {
  try {
    const s3 = new AWS.S3();
    const fileSource = fs.readFileSync(file.path);
    const targetName = uuid.v4().replace(/-/g, '') + file.originalname;

    console.log(file.mimetype);

    await s3
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: targetName,
        Body: fileSource,
        ContentType: file.mimetype
      })
      .promise();

    fs.unlinkSync(file.path);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${targetName}`;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const remove = async fileName => {
  try {
    const s3 = new AWS.S3();

    const fileKey = fileName.replace(
      `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/`,
      ''
    );

    await s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey
      })
      .promise();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  upload,
  remove
};
