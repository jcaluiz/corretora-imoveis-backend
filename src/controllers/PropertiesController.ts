import { NextFunction, Request, Response } from "express";
import PropertiesService from "../services/PropertiesService";
import formidable, { errors as formidableErrors } from "formidable";
import path from "path";
const { google } = require("googleapis");
const stream = require("stream");
const fs = require("fs");
const multer = require("multer");
const upload = multer();

export default class PropertiesController {
  private req: any;
  private res: Response;
  private next: NextFunction;
  private service: PropertiesService;
  private GOOGLE_API_FOLDER_ID: string;
  private URL_GOOGLE_DRIVE_IMAGE: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new PropertiesService();
    this.GOOGLE_API_FOLDER_ID = "1vMwMzHIe4lWwduDqelVs4VHRS8v97dgg";
    this.URL_GOOGLE_DRIVE_IMAGE = "https://drive.google.com/uc?export=view&id=";
  }

  public async propertyPublished() {
    try {
      const newProperty = await this.service.publishedProperty(this.req.body);
      return this.res.status(201).json(newProperty);
    } catch (error) {
      this.next(error);
    }
  }

  public async propertyFind() {
    try {
      const foundProperties = await this.service.propertiesFind();
      return this.res.status(200).json(foundProperties);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
        const {id} = this.req.query;
      const foundProperties = await this.service.findById(id);
      return this.res.status(200).json(foundProperties);
    } catch (error) {
      this.next(error);
    }
  }

  private uploadFile = async (fileObject: any) => {
      const KEYFILEPATH = path.join(__dirname + "/uploadGoogleDrive.json");
      const SCOPES = ["https://www.googleapis.com/auth/drive"];
    
      const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
      });
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const {data} = await google.drive({version: 'v3', auth}).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: [this.GOOGLE_API_FOLDER_ID],
        },
        fields: 'id, name',
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
  }

  public async propertyUpload() {

    try {
        const {body, files} = this.req;
        const dataIds = [];

        for (let i = 0; i < files.length; i++) {
            const newData = await this.uploadFile(files[i]);
            dataIds.push(`${this.URL_GOOGLE_DRIVE_IMAGE}${newData}`);
        }
        this.res.status(200).send({images: dataIds});
    } catch(err) {
        console.log(err);
    }
  }
}
