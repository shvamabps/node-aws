const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { s3, aws } = require("../config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = s3.bucket_name;
const bucketRegion = s3.bucket_region;
const accessKey = aws.ACCESS_KEY;
const secretKey = aws.SECRET_KEY;

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

exports.s3Upload = async (file) => {
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);
  return { message: "File uploaded" };
};

exports.seGet = async (name) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: name,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 10 });
  return url;
};
