import { Schema, model } from "mongoose";

export interface ILiqueur {
    manufacturingDate: null |Date;
    fabricationPlace: null|string;
    name:         string;
    amount: number|null;
    degreeOfAlcohol: number;
}
const liqueurSchema = new Schema <ILiqueur>({
    manufacturingDate:{type:Date},
    fabricationPlace:{type:String},
    name:       {type: String},
    amount:     {type:Number},
    degreeOfAlcohol:     {type:Number}
});
const Licor = model<ILiqueur>("Player", liqueurSchema);
export { Licor };