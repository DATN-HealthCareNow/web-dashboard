import AWS from 'aws-sdk';

// Get S3 config from environment variables
function getS3Config() {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
    
  if (!accessKeyId || !secretAccessKey || !bucket) {
    throw new Error(
      'Missing AWS S3 configuration. Please set NEXT_PUBLIC_AWS_ACCESS_KEY_ID, NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY, and NEXT_PUBLIC_AWS_S3_BUCKET in .env.local'
    );
  }

  return { accessKeyId, secretAccessKey, region, bucket };
}

export async function uploadToS3(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const config = getS3Config();

    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
    });

    const s3 = new AWS.S3();

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `articles/${timestamp}-${file.name}`;

    console.log('[v0] Uploading to S3:', { bucket: config.bucket, key: filename });

    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.bucket,
        Key: filename,
        Body: file,
        ContentType: file.type,
      };

      const upload = s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.error('[v0] S3 upload error:', err);
          reject(new Error(`S3 upload error: ${err.message}`));
        } else {
          console.log('[v0] S3 upload success:', data.Location);
          resolve(data.Location);
        }
      });

      // Track upload progress
      upload.on('httpUploadProgress', (progress: any) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
        console.log('[v0] Upload progress:', percentComplete);
        onProgress?.(percentComplete);
      });
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] S3 config error:', errorMessage);
    throw new Error(errorMessage);
  }
}

export function validateS3Config(): boolean {
  try {
    getS3Config();
    return true;
  } catch {
    return false;
  }
}
