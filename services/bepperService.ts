import newBeeperDTO from "../DTO/beeperDTO"
import statusEnum from "../Enums/StatusEnum"
import Beeper from "../models/beeperModel"
import { getFileData, saveFileData } from '../config/DAL'




export default class beeperService {
    //create new beeper logiv]c
    public static async createNewBeeper(name: string): Promise<boolean> {
        const beeper: Beeper = new Beeper(name)
        let beepers: Beeper[] | undefined = await getFileData<Beeper>() as Beeper[]
        if (!beepers) beepers = []
        beepers.push(beeper)
        return await saveFileData<Beeper>(beepers)
    }

    //get all beepers from db logic
    public static async getAllBeepers(): Promise<Beeper[]> {
        let beepers: Beeper[] = await getFileData<Beeper>() as Beeper[]
        if (!beepers) beepers = []
        return beepers
    }

    //get one beeper by id
    public static async getOneBeeper(id: string): Promise<Beeper | undefined> {
        const beepers: Beeper[] = await this.getAllBeepers()
        const beeper: Beeper | undefined = beepers.find(Bpr => Bpr.id === id)
        return beeper
    }


    //update status of one beeper
    public static async updateStatus(id: string, lat?: number, lon?: number): Promise<Beeper | undefined> {
        const beepers: Beeper[] = await this.getAllBeepers()
        const beeperIndex: number = beepers.findIndex(Bpr => Bpr.id === id)

        if(lat && lon)
        {
            beepers[beeperIndex].lat = lat
            beepers[beeperIndex].lon = lon

        }

        if (beepers[beeperIndex].status < 4) {
            beepers[beeperIndex].status += 1
            await saveFileData(beepers)
        }
        return beepers[beeperIndex]
    }

    //set time out of 10 seconds
    public static async timeOut(bpr:Beeper | undefined): Promise<Beeper | undefined> {
        const beepers: Beeper[] = await this.getAllBeepers()
        const beeperIndex: number = beepers.findIndex(Bpr => Bpr.id === bpr?.id)

        setTimeout(() =>{
            beepers[beeperIndex].status += 1
        },10000)
        await saveFileData(beepers)
        return beepers[beeperIndex]
    }


     //delete one beeper
     public static async deleteOneBeeper(id:string): Promise<void> {
        const beepers: Beeper[] = await this.getAllBeepers()
        const delId: Beeper[] = beepers.filter(Bpr => Bpr.id != id)
        await saveFileData(delId)
    }

    //get beepers by status
    public static async getBeepersByStatus(status:string): Promise<Beeper[]> {
        const beepers: Beeper[] = await this.getAllBeepers()
        const statusBeepers: Beeper[] = beepers.filter(Bpr => statusEnum[Bpr.status] == status)
        return statusBeepers
    }


}