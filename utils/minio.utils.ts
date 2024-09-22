// Minio
import * as Minio from 'minio';

class MinioClientSingleton {
  private static instance: MinioClientSingleton;
  private client: Minio.Client;

  private constructor() {
    this.client = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT!,
      port: parseInt(process.env.MINIO_PORT!),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY!,
      secretKey: process.env.MINIO_SECRET_KEY!,
    });
  }

  public static getInstance(): MinioClientSingleton {
    if (!MinioClientSingleton.instance) {
      MinioClientSingleton.instance = new MinioClientSingleton();
    }
    return MinioClientSingleton.instance;
  }

  public getClient(): Minio.Client {
    return this.client;
  }
}

export const initializeMinio = async () => {
  const minioClient = MinioClientSingleton.getInstance().getClient();
  try {
    const exists = await minioClient.bucketExists(
      process.env.MINIO_BUCKET_NAME!
    );
    if (!exists) {
      await minioClient.makeBucket(
        process.env.MINIO_BUCKET_NAME!,
        process.env.MINIO_REGION!
      );
      console.log('Bucket created successfully');
    }
  } catch (err) {
    console.error('Error initializing MinIO:', err);
  }
};

export const uploadFiles = async (
  key: string,
  fileBuffer: Buffer,
  mimetype: string,
  size: number
) => {
  const minioClient = MinioClientSingleton.getInstance().getClient();
  try {
    await minioClient.putObject(
      process.env.MINIO_BUCKET_NAME!,
      key,
      fileBuffer,
      size,
      { 'Content-Type': mimetype }
    );
    console.log('Fichier téléchargé avec succès');
    return { success: true, message: 'Fichier téléchargé avec succès' };
  } catch (err) {
    console.error('Erreur lors du téléchargement :', err);
    return {
      success: false,
      message: 'Erreur lors du téléchargement du fichier',
    };
  }
};

export const getPresignedUrl = async (key: string) => {
  const minioClient = MinioClientSingleton.getInstance().getClient();
  try {
    const url = await minioClient.presignedGetObject(
      process.env.MINIO_BUCKET_NAME!,
      key,
    );
    return url;
  } catch (err) {
    console.error('Erreur lors de la génération de l\'URL:', err);
    return '';
  }
}

const minioClient = MinioClientSingleton.getInstance().getClient();
export default minioClient;
