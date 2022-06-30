import { Application } from "express";
import { createLiqueur, listLiqueur, retriveLiqueur, deleteLiqueur, updateLiqueur } from './controllers/liqueur.controller';

export const routes=(app:Application)=>{
    app.post("/liqueurs",createLiqueur);
    app.get("/liqueurs",listLiqueur);
    app.get("/liqueurs/:id",retriveLiqueur);
    app.delete("/liqueurs/:id",deleteLiqueur);
    app.put("/liqueurs/:id",updateLiqueur);
    };
    