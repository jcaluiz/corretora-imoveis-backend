import IProperty from "../interfaces/IProperty";
import PropertiesODM from "../models/PropertiesODM";
import HttpException from "../utils/HttpException";

export default class PropertiesService {
    private model: PropertiesODM;

    constructor() {
        this.model = new PropertiesODM();
    }

    public async publishedProperty(property: IProperty) {
        const newProperty = await this.model.create(property);
        return newProperty;
    }

    public async propertiesFind() {
        const find = await this.model.find();
        if (!find) throw new HttpException(404, 'Properties not found!');
        return find;
    }

    public async findById(id: string) {
        const find = await this.model.findById(id);
        if (!find) throw new HttpException(404, 'Properties not found!');
        return find;
    }
}