import { Request, Response, NextFunction } from "express";
import { Course } from "../models/";
import { only } from "sanitize-object";

const _sanitizeCourse = (course: Course) => {
    const sanitizer = only("id", "name", "code");
    return sanitizer(course);
}

export let getCourses = (req: Request, res: Response) => {
	Course.findAll({
        attributes: ["id", "name", "code"]
    }).then(function (courses) {
		res.send({
            ok: true,
            data: courses
        });
	});
}

export let getCourse = (req: Request, res: Response) => {
    Course.findById(req.params.id, {
        attributes: ["id", "name", "code"]
    }).then(function (courses) {
        res.send({
            ok: true,
            data: courses
        });
    });
}

export let addCourse = (req: Request, res: Response) => {
    var formData = req.body;

    Course.create({
        name: formData.name,
        code: formData.code,
        universityId: formData.universityId,
        userId: req.user.id,
        status: "pending"
    }).then(function(course) {
        res.send({
            ok: true,
            data: _sanitizeCourse(course.get({ plain: true }))
        })
    }).catch((err) => {
        return res.status(422).json({
            ok: false,
            data: {
                error: "validationError",
                msg: err.errors[0].message
            }
        });
    });
       
}

export let removeCourse = (req: Request, res: Response) => {
    Course.destroy({
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