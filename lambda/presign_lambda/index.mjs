import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = "eu-west-2";

const client = new S3Client({ region });

export const handler = async (event) => {
  const bucket = process.env.UPLOAD_BUCKET_NAME;
  if (!event.queryStringParameters || !event.queryStringParameters.key) {
    throw new Error('Key url param is not provided')
  }
  const key = event.queryStringParameters.key;
  const fullKey = "upload/" + key;
  console.log('upload bucket = ',bucket);
  console.log('key = ',key);
  const command = new PutObjectCommand({ Bucket: bucket, Key: fullKey });
  const url = await getSignedUrl(client, command, { expiresIn: 5 });

  return {
    statusCode: 200,
    'content-type': 'application/json',
    isBase64Encoded: false,
    body: {
      url
    }
  };
};
