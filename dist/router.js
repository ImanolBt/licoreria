"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const liqueur_controller_1 = require("./controllers/liqueur.controller");
const routes = (app) => {
    app.post("/liqueurs", liqueur_controller_1.createLiqueur);
    app.get("/liqueurs", liqueur_controller_1.listLiqueur);
    app.get("/liqueurs/:id", liqueur_controller_1.retriveLiqueur);
    app.delete("/liqueurs/:id", liqueur_controller_1.deleteLiqueur);
    app.put("/liqueurs/:id", liqueur_controller_1.updateLiqueur);
};
exports.routes = routes;
