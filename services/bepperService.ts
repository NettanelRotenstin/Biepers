import newBeeperDTO from "../DTO/beeperDTO"
import statusEnum from "../Enums/StatusEnum"
import Beeper from "../models/beeperModel"
import {getFileData,saveFileData} from '../config/DAL'


const dateAndTime = new Date()

export default class beeperService {

    public static async createNewBeeper(name: string): Promise<boolean> {     
        const beeper: Beeper = new Beeper(name, statusEnum.manufactured, dateAndTime.toLocaleString())
        let beepers: Beeper[]|undefined = await getFileData<Beeper>() as Beeper[]
        if (!beepers) beepers = []
        beepers.push(beeper)
        return await saveFileData<Beeper>(beepers)
    }

    


}