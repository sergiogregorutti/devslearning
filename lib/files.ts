const S3Client = require("@aws-sdk/client-s3");
const short = require("short-uuid");

const baseUrl = "https://devslearning.s3.us-east-2.amazonaws.com/";

const client = new S3Client.S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFile = async (file: File, path: string) => {
  const fileExtension = file.name.split(".").pop() || "";
  const fileName = `${short.generate()}.${fileExtension}`;

  const key = `${path}${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    Metadata: {
      uuid: "14365123651274",
      tag: "",
    },
    ContentType: file.type,
  };

  const command = new S3Client.PutObjectCommand(params);
  const data = await client.send(command);

  if (data["$metadata"]["httpStatusCode"] !== 200) return Promise.reject(data);
  return Promise.resolve({
    bucket: process.env.AWS_BUCKET_NAME,
    key,
    location: `${baseUrl}${key}`,
    status: 0,
  });
};

export const deleteFile = async (key: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  const deleteCommand = new S3Client.DeleteObjectCommand(params);

  return new Promise((resolve, reject) => {
    client.send(deleteCommand, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "File Deleted Successfully!",
          key: key,
        });
      }
    });
  });
};
