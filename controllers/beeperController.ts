import express, { Router, Request, Response } from 'express'
import newBeeperDTO from '../DTO/beeperDTO'
import beeperService from '../services/bepperService';
import Beeper from '../models/beeperModel';
import { create } from 'domain';
import statusEnum from '../Enums/StatusEnum';

const router: Router = express.Router()


//create new beeper
router.post("", async (req: Request, res: Response): Promise<void> => {

    try {
        const result = await beeperService.createNewBeeper(req.body.name);
        if (result) {
            res.json({
                message: "Beeper created soccesfully",
            });
        } else {
            throw new Error("Cant save new Beeper to the file");
        }
    }
    catch {
        res.status(404).json({
            err: true,
            message: "request faild",
        });
    }
})

//get all beepers
router.get("", async (req: Request, res: Response): Promise<void> => {
    try {
        const beepers = await beeperService.getAllBeepers();
        if (beepers) {
            res.json({
                message: "all beepers in DB",
                beepers
            })
        } else {
            throw new Error("Cant get all from the file");
        }
    } catch {
        res.status(400).json({
            err: true,
            message: `request faild`
        })
    }
})

//details one beeper
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper: Beeper | undefined = await beeperService.getOneBeeper(req.params.id)
        res.json({
            name: beeper?.name,
            create_time: beeper?.timeCreated,
            status: statusEnum[beeper?.status || 0],
            bumTime: beeper?.timeBum
        })
    } catch {
        res.status(400).json({
            message: `request faild`,
        })
    }
})



//update status of one beeper
router.patch("/:id/status", async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper: Beeper | undefined = await beeperService.updateStatus(req.params.id, req.body.lat, req.body.lon)
        if (beeper?.status! < 3)
            res.json({
                name: beeper?.name,
                create_time: beeper?.timeCreated,
                status: statusEnum[beeper?.status || 0],
                bumTime: beeper?.timeBum
            })
        if (beeper?.status! == 3) {
            if (!req.body) {
                res.json({
                    message: `you have to send locations in constructe of lat and lon`
                })
            }
            else {
                beeperService.timeOut(beeper)
                res.json({
                    name: beeper?.name,
                    create_time: beeper?.timeCreated,
                    status: statusEnum[beeper?.status || 0],
                    bumTime: beeper?.timeBum
                })
            }
        } else {
            res.json({
                message: `already completed :)`
            })
        }


    } catch {
        res.status(400).json({
            message: `request faild`,
        })
    }
})


//delete one beeper
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        await beeperService.deleteOneBeeper(req.params.id)
        res.json({
            message: `deleted soccessfully`
        })
    }
    catch {
        res.json({ message: `req is faild` })
    }
})

//get beepers by status
router.get("/status/:status", async (req: Request, res: Response): Promise<void> => {
    try {
        const statusBeepers = await beeperService.getBeepersByStatus(req.params.status)
        res.json({
            statusBeepers
        })
    }
    catch {
        res.json({
            message: `req faild`
        })
    }
})



export default router  