module.exports = {
  s3: {
    bucket_name: process.env.BUCKET_NAME,
    bucket_region: process.env.BUCKET_REGION,
  },
  aws: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};
