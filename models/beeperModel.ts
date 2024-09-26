import { v4 } from "uuid";
import statusEnum from "../Enums/StatusEnum";
import { time } from "console";

const dateAndTime = new Date()

class Beeper {
    public id: string;

    constructor(
        public name: string,
        public status: statusEnum,
        public timeCreated: string,
        public timeBum?: string,
        public lat?: number,
        public lon?:number
    ) {
        this.id = v4();
        this.status = statusEnum.manufactured
        this.timeCreated = dateAndTime.toLocaleString()
    }
}
export default Beeper
