import { Request, Response, NextFunction } from "express";
import { University } from "../models/";
import { only } from "sanitize-object";

const _sanitizeUniversity = (university: University) => {
    const sanitizer = only("id", "name", "acronym");
    return sanitizer(university);
}

export let getUniversities = (req: Request, res: Response) => {
	University.findAll({
        attributes: ["id", "name", "acronym"]
    }).then(function (universities) {
		res.send({
            ok: true,
            data: universities
        });
	});
}

export let addUniversity = (req: Request, res: Response) => {
    var formData = req.body;

    University.create({
        name: formData.name,
        acronym: formData.acronym,
        userId: req.user.id,
        status: "pending"
    }).then(function(university) {
        university.get
        res.send({
            ok: true,
            data: _sanitizeUniversity(university.get({ plain: true }))
        });
    }).catch((err: any) => {
        return res.status(422).json({
            ok: false,
            data: {
                error: "validationError",
                msg: err.errors[0].message
            }
        });
    });        
}

export let removeUniversity = (req: Request, res: Response) => {
    University.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(deleted) {
        if (deleted === 0) {
            res.status(404).send({
                ok: false,
                data: {}
            });
        } else {
            res.send({
                ok: true,
                data: {}
            });
        }
    });
}