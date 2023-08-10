import { Schema, isValidObjectId } from "mongoose";
import IProperty from "../interfaces/IProperty";
import AbstractODM from "./AbstractODM";

export default class PropertiesODM extends AbstractODM<IProperty> {
    constructor() {
        const schema = new Schema<IProperty>({
            local: {type: Object, required: true},
            imovel: {type: Object, required: true},
            facilidades: {type: [String], required: false},
            imagem: {type: [String], required: true},
        });
        super(schema, 'Properties');
    }

    public isValidId(id: string | undefined): boolean {
        if (isValidObjectId(id)) {
            return true;
        }
        return false;
    }

    public async create(property: IProperty): Promise<IProperty> {
        return this.model.create({ ...property });
    }

    public async find() {
        return this.model.find({});
    }

    public async findById(id: string) {
        return this.model.findById(id);
    }
}