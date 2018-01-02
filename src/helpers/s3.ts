import * as aws from "aws-sdk";
import * as slug from "slug";
import * as mime from "mime-types";
import * as fs from "fs";
import getEnv from "../helpers/env";
import { ManagedUpload } from "aws-sdk/clients/s3";

const S3_BUCKET = getEnv("S3_BUCKET");
const s3 = new aws.S3();

export async function upload(file: Express.Multer.File){
    const filename = slug(file.originalname.replace(/\.[^/.]+$/, ""));
    const extension = mime.extension(file.mimetype);
    const newFilename = Date.now().toString() + '-' + filename + '.' + extension;

    const fileStream = fs.createReadStream(file.path);
    
    return <Promise<ManagedUpload.SendData>> new Promise((resolve, reject) => {     
        s3.upload({
            Bucket: S3_BUCKET,
            Key: newFilename,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: fileStream
        }).send((err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
    
}