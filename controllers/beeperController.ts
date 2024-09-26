import express, { Router, Request, Response } from 'express'
import newBeeperDTO from '../DTO/beeperDTO'
import beeperService from '../services/bepperService';

const router: Router = express.Router()


//create new beeper
router.post("/",async(req: Request, res: Response): Promise<void> => {
     
    try{
        const result = await beeperService.createNewBeeper(req.body.name);
        if (result) {
            res.json({
                message: "Beeper created soccesfully",
            });
        } else {
            throw new Error("Cant save new Beeper to the file");
        }
    }
    catch{
        res.status(404).json({
            err: true,
            message: "request faild",
        });
    }
})

//get all beepers
router.get("/",async (req:Request, res:Response): Promise< void> =>{
    
})

//details one beeper
router.get("/:id",async (req:Request, res:Response): Promise< void> =>{})


//update status of one beeper
router.patch("/:id/status")


//delete one beeper
router.delete("/:id")

//get beepers by status
router.get("/status/:status")



export default router  