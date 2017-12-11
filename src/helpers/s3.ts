import * as aws from "aws-sdk";
import * as slug from "slug";
import * as mime from "mime-types";
import * as fs from "fs";
import getEnv from "../helpers/env";

const S3_BUCKET = getEnv("S3_BUCKET");
const s3 = new aws.S3();

// TODO
export function upload(data: any) {
    const file = data.file;
    const filename = slug(file.originalname.replace(/\.[^/.]+$/, ""));
    const extension = mime.extension(file.mimetype);
    const newFilename = Date.now().toString() + '-' + filename + '.' + extension;

    const fileStream = fs.createReadStream(file.path);
    
    return new Promise(function (resolve, reject) {        
        const params = {
            Bucket: S3_BUCKET,
            Key: newFilename,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: fileStream
        };
        
        s3.upload(params).send((err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
    
}