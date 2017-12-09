import * as aws from "aws-sdk";
import * as slug from "slug";
import * as mime from "mime-types";
import * as fs from "fs";
import getEnv from "../helpers/env";

const S3_BUCKET = getEnv("S3_BUCKET");

// TODO
export function upload(data: any) {
    const file = data.file;
    const filename = slug(file.originalname.replace(/\.[^/.]+$/, ""));
    const extension = mime.extension(file.mimetype);
    const newFilename = Date.now().toString() + '-' + filename + '.' + extension;

    var fileStream = fs.createReadStream(file.path);

    var s3obj = new aws.S3({
        params: {
            Bucket: S3_BUCKET,
            Key: newFilename,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }
    });

    return new Promise(function (resolve, reject) {
        s3obj.upload({ Body: fileStream, Bucket: S3_BUCKET, Key: "" }).send((err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
    
}