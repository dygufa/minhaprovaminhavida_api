import { Request, Response, NextFunction } from "express";
import { File, Course, University, User } from "../models/";
import sequelize from "../sequelize";
import * as s3 from "../helpers/s3";
import { only } from "sanitize-object";
import { reqFiltersToQueryWhere } from "../helpers/utils";

const _sanitizeFile = (file: File) => {
    const sanitizer = only("id", "name", "file", "createdAt", "type", "status");
    return sanitizer(file);
}


/**
 * GET /files
 * Retrive files
 */

export let getFiles = (req: Request, res: Response) => {
    File.findAll({
        attributes: ["id", "name", "file", "createdAt", "type"],
        order: [["id", "DESC"]],
        where: reqFiltersToQueryWhere(req, ["universityId", "courseId", "type"]),
        include: [
            { model: Course, attributes: ["id", "name", "code"] },
            { model: University, attributes: ["id", "name", "acronym"] },
            { model: User, attributes: ["id", "name", "avatar"] }
        ]
    }).then((files) => {
		res.json({
            ok: true,
            data: files
        });
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

export let postFile = async (req: Request, res: Response) => {
    const formData = req.body;
    const userId = req.user.id;
    const files = req.files as Express.Multer.File[];
    const json = JSON.parse(req.body.json);

    const fileRecord = File.build({
        name: json.name,
        universityId: json.universityId,
        type: json.type,
        file: null,
        status: "pending",
        courseId: json.courseId,
        userId: userId
    });

    return fileRecord.validate().then(async () => {
        fileRecord.save({
            validate: false
        }).then(async () => {
            const s3File = await s3.upload(files[0]);
            fileRecord.file = s3File.Location;
            fileRecord.save({
                validate: false
            });

            return res.json({
                ok: true,
                data: _sanitizeFile(fileRecord.get({ plain: true }))
            }); 
        }).catch((err) => {
            return res.status(422).json({
                ok: false,
                data: {
                    error: "validationError",
                    msg: "Esse universityId e courseId existem mesmo?"
                }
            });
        });

        
    }).catch(sequelize.ValidationError, (err: any) => {
        return res.status(422).json({
            ok: false,
            data: {
                error: "validationError",
                msg: err.errors[0].message
            }
        });
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
            res.status(404).json({
                "data": {}
            });
        } else {
            res.json({"data": {}});
        }
    });
}