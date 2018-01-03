import { Request } from "express";

export function reqFiltersToQueryWhere(req: Request, filters: string[]) {
    const where: { [key: string]: string | number } = {};

    filters.forEach(filter => {
        if (req.query[filter]) {
            where[filter] = req.query[filter];
        }
    })

    return where;
}