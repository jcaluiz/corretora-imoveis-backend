import { NextFunction, Request, Response, Router } from "express";
// import formidable from 'formidable';
import PropertiesController from "../controllers/PropertiesController";
import ErrorHandler from "../middlewares/ErrorHandler";
const multer = require('multer');
const upload = multer();

const routes = Router();

routes.post(
    '/',
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => new PropertiesController(req, res, next).propertyPublished(),
    ErrorHandler.handle,
);

routes.get(
    '/',
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => new PropertiesController(req, res, next).propertyFind(),
    ErrorHandler.handle,
)

routes.post(
    '/upload',
    upload.any(),
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => new PropertiesController(req, res, next).propertyUpload(),
    ErrorHandler.handle,
)

routes.get(
    '/find-by-id',
    (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => new PropertiesController(req, res, next).findById(),
    ErrorHandler.handle,
)

export default routes;