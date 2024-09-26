import express, { Router, Request, Response } from 'express'
import newBeeperDTO from '../DTO/beeperDTO'

const router: Router = express.Router()


//create new beeper
router.post("/",async(req: Request<any, any, newBeeperDTO>, res: Response): Promise<void> => {
    
})

//get all beepers
router.get("/",async (req:Request, res:Response): Promise< void> =>{})

//details one beeper
router.get("/:id",async (req:Request, res:Response): Promise< void> =>{})


//update status of one beeper
router.patch("/:id/status")


//delete one beeper
router.delete("/:id")

//get beepers by status
router.get("/status/:status")

export default router  