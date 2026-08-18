import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = "eu-west-2";
const bucket = "test-485291254674-eu-west-2-an";

const client = new S3Client({ region });

export const handler = async ({key}) => {
  const fullKey = "upload/" + key;
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
