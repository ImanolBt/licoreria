"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLiqueur = exports.deleteLiqueur = exports.updateLiqueur = exports.retriveLiqueur = exports.createLiqueur = void 0;
const liqueur_model_1 = require("../models/liqueur.model");
//Create a new liqueur in the database
const createLiqueur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { manufacturingDate, fabricationPlace, name, amount, degreeOfAlcohol } = req.body;
    const response = yield new LiqueurController().create({ manufacturingDate, fabricationPlace, name, amount, degreeOfAlcohol });
    return res.status(201).json(response);
});
exports.createLiqueur = createLiqueur;
//Retrive all liqueurs from the database
const retriveLiqueur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new LiqueurController().retrive(docId);
    return res.status(200).json(response);
});
exports.retriveLiqueur = retriveLiqueur;
//Update a liqueur in the database
const updateLiqueur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const { manufacturingDate, fabricationPlace, name, amount, degreeOfAlcohol } = req.body;
    const response = yield new LiqueurController().update(docId, { manufacturingDate, fabricationPlace, name, amount, degreeOfAlcohol });
    return res.status(200).json(response);
});
exports.updateLiqueur = updateLiqueur;
//Delete a liqueur from the database
const deleteLiqueur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new LiqueurController().delete(docId);
    return res.status(200).json(response);
});
exports.deleteLiqueur = deleteLiqueur;
//List all liqueurs from the database
const listLiqueur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new LiqueurController().list();
    return res.status(200).json(response);
});
exports.listLiqueur = listLiqueur;
class LiqueurController {
    //Create a new liqueur in the database
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const liqueur = new liqueur_model_1.Licor(payload);
            return liqueur.save().then(data => {
                return {
                    message: "Success: Liqueur added to database",
                    status: 201,
                    content: liqueur
                };
            }).catch(err => {
                return {
                    message: "Error: Liqueur not added to database",
                    status: 500,
                    content: err
                };
            });
        });
    }
    //Retrive a liqueur from the database
    retrive(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return liqueur_model_1.Licor.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "Error: Liqueur not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "Success: Liqueur retrive",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Internal Server Error: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    //Update a liqueur in the database
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return liqueur_model_1.Licor.updateOne({ _id: docId }, { $set: {
                    dateOfBirth: payload.manufacturingDate,
                    placeOfBirth: payload.fabricationPlace,
                    name: payload.name,
                    heigth: payload.amount,
                    tshirt: payload.degreeOfAlcohol
                } }).then(data => {
                return {
                    message: "Ok: Liqueur updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Internal Server Error: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    //Delete a liqueur from the database
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return liqueur_model_1.Licor.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount === 0) {
                    return {
                        message: "Error: Liqueur not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "Succes: Liqueur deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Internal Server Error: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    //List all liqueurs from the database
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return liqueur_model_1.Licor.find({}).then(data => {
                return {
                    message: "Succes: All Liqueurs",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error:Liqueurs not found",
                    status: 500,
                    content: err
                };
            });
        });
    }
}
