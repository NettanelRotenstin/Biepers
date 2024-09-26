import { v4 } from "uuid";
import statusEnum from "../Enums/StatusEnum";
import { time } from "console";

 

class Beeper {
    public id: string;
    public status: statusEnum
    public timeCreated: Date
    constructor(
        public name: string, 
        public timeBum?: Date,
        public lat?: number,
        public lon?:number
    ) {
        this.id = v4();
        this.status = statusEnum.manufactured
        this.timeCreated = new Date()
    }
}
export default Beeper
