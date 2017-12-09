import { Request, Response, NextFunction } from "express";
import { File, Course, University, User } from "../models/";
import sequelize from "../sequelize";
import { Transaction } from "sequelize";
import * as s3 from "../helpers/s3";

/**
 * GET /files
 * Retrive files
 */

export let getFiles = (req: Request, res: Response) => {
	File.findAll({
        attributes: ['id', 'name', 'file', 'createdAt', 'type'],
        order: [['id', 'DESC']],
        include: [
            {model: Course, attributes: ['id', 'name']},
            {model: University, attributes: ['id', 'name', 'acronym']},
            {model: User, attributes: ['id', 'name']}
        ]
    }).then((files) => {
		res.send(JSON.stringify({'data': files}));
	});
}

/**
 * GET /files/:id
 * Retrieve one file 
 */

export let getFile = (req: Request, res: Response) => {

}

/**
 * POST /files
 * Add new file 
 */

export let postFile = (req: Request, res: Response) => {
    const formData = req.body;
    // TODO
    const userId = 1;
    const files = req.files;

    sequelize.transaction((t: Transaction) => {
        const fileData = {
            name: formData.name,
            universityId: formData.universityId,
            status: 1,
            type: formData.typeId,
            createdBy: userId,
            file_raw: files,
            courseId: null
        };

        // TODO
        const createFile = (fileData: any, options: any) => {
            return File.build(fileData).validate({
                skip: options.skipValidation
            })
            .then((validationError) => {
                if (validationError) {
                    throw validationError;
                }

                // TODO files as any
                return s3.upload({
                    file: (files as any)[0] // first file
                });
            })
            .then((fileS3) => {
                // TODO
                fileData.file = (fileS3 as any).Location;

                return File.create(fileData, {
                    transaction: t,
                    validate: false
                });
            });
        }

        if (formData.courseId != 0) {
            fileData.courseId = formData.courseId;

            return createFile(fileData, {
                skipValidation: []
            });
        }

        return Course.create({
            name: formData.courseName,
            code: formData.code
        }, {transaction: t}).then((courseEntry) => {
            fileData.courseId = courseEntry.id;

            return createFile(fileData, {
                skipValidation: ['courseId']
            });
        });
    })
    // TODO
    .then((fileEntry: any) => {
        res.status(200).send(JSON.stringify({'data': fileEntry})); 
    })
    .catch(sequelize.ValidationError, (err: any) => {
        return res.status(422).send({error: err.errors});
    })
    .catch((err: any) => {
        return res.status(400).send({error: err});
    });       
}

/**
 * DELETE /file/:id
 * Remove file
 */

export let deleteFile = (req: Request, res: Response) => {
    File.destroy({
        where: {
            id: req.params.id
        }
    }).then((deleted) => {
        if (deleted === 0) {
            res.status(404).send(JSON.stringify({'data': {}}))
        } else {
            res.send(JSON.stringify({'data': {}}))
        }
    });
}