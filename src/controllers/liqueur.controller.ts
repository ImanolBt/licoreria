import e, {Request, Response} from 'express';
import { ILiqueur, Licor } from '../models/liqueur.model';
import { IResponse } from '../models/response.model';

//Create a new liqueur in the database
export const createLiqueur= async (req:Request,res:Response)=>{
    
        const {manufacturingDate,fabricationPlace,name, amount,degreeOfAlcohol}:ILiqueur =req.body;
        const response= await new LiqueurController().create({manufacturingDate,fabricationPlace,name, amount,degreeOfAlcohol});
        return res.status(201).json(response);
    
    }

    //Retrive all liqueurs from the database
    export const  retriveLiqueur = async (req:Request,res:Response)=>{
        const docId:String=req.params.id;
        const response=await new LiqueurController().retrive(docId);
     return res.status(200).json(response);

        
    }

    //Update a liqueur in the database
    export const updateLiqueur = async (req:Request,res:Response)=>{
        const docId:String=req.params.id;
        const {manufacturingDate,fabricationPlace,name, amount,degreeOfAlcohol}:ILiqueur =req.body;
        const response=await new LiqueurController().update(docId,{manufacturingDate,fabricationPlace,name, amount,degreeOfAlcohol});
        return res.status(200).json(response);
    }

    //Delete a liqueur from the database
    export const deleteLiqueur= async (req:Request,res:Response)=>{
        const docId : String = req.params.id;
        const response= await new LiqueurController().delete(docId);
        return res.status(200).json(response);
    }

    //List all liqueurs from the database
    export const listLiqueur=async(req:Request,res:Response)=>{
        
         const response= await new LiqueurController().list();
            return res.status(200).json(response);
        
    }

    class LiqueurController{

        //Create a new liqueur in the database
        public async create(payload:ILiqueur): Promise<IResponse> {
            const liqueur = new Licor (payload);
            return liqueur.save().then(data=>{

            return{
                message:"Success: Liqueur added to database", 
                status:201,
                content:liqueur
            }
        }).catch(err=>{
            return{
                message:"Error: Liqueur not added to database",
                status:500,
                content: err
            }
        });
    }
    //Retrive a liqueur from the database
    public async retrive(docId:String):Promise<IResponse>{
        return Licor.findOne({_id:docId}).then(data=>{
            if(data === null){
                return{
                    message:"Error: Liqueur not found",
                    status:404,
                    content:data
                };
            }
        return{
            message:"Success: Liqueur retrive", 
            status:200,
            content: data
        };
    }).catch(err=>{
        return{
            message:"Internal Server Error: "+err.name,
            status:500,
            content:err
        };
    });
}

//Update a liqueur in the database
public async update (docId:String,payload:ILiqueur):Promise<IResponse>{
    return Licor.updateOne({_id:docId}, {$set :{
        dateOfBirth:payload.manufacturingDate,
        placeOfBirth:payload.fabricationPlace,
        name:payload.name,
        heigth:payload.amount,
        tshirt:payload.degreeOfAlcohol
    }}).then(data=>{
        return{
            message: "Ok: Liqueur updated",
            status:200,
            content:data
        }
    }).catch(err=>{
        return{
            message:"Internal Server Error: "+err.name,
            status:500,
            content:err
        }
    }
    );
}
//Delete a liqueur from the database
public async delete(docId:String):Promise<IResponse>{
    return Licor.deleteOne({_id:docId}).then(data=>{
        if (data.deletedCount === 0) {
            return{
                message:"Error: Liqueur not found",
                status:404,
                content:data
            };

        }
        return{
            message:"Succes: Liqueur deleted",
            status:200,
            content:data
        };
    }).catch(err=>{
        return{
            message:"Internal Server Error: "+err.name,
            status:500,
            content:err
        }
    }
    );
}
//List all liqueurs from the database
        public async list(): Promise<IResponse> {
          return  Licor.find({}).then(data=>{
            return{
                message:"Succes: All Liqueurs",
                status:200,
                content:data
            };
        }).catch(err=>{
            return{
                message:"Error:Liqueurs not found",
                status:500,
                content:err
            }
        });
    }
    }