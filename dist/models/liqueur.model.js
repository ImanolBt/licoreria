"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Licor = void 0;
const mongoose_1 = require("mongoose");
const liqueurSchema = new mongoose_1.Schema({
    manufacturingDate: { type: Date },
    fabricationPlace: { type: String },
    name: { type: String },
    amount: { type: Number },
    degreeOfAlcohol: { type: Number }
});
const Licor = (0, mongoose_1.model)("Player", liqueurSchema);
exports.Licor = Licor;
