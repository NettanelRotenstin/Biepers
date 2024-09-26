import { json } from 'express'
import fs from 'fs/promises'

export const getFileData = async <Beeper>(): Promise<Beeper[] | void> => {
    try {
        const strData: string = await fs.readFile(`${__dirname}/../../data/beepers.json`, `utf-8`)
        const parsedData: Beeper[] = JSON.parse(strData)
        return parsedData
    } catch (error) {
        console.log(error)
    }
}


export const saveFileData = async <Beeper>(data: Beeper[]): Promise<boolean> => {
    try {
        const stringifyData: string = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/../../data/beepers.json`, stringifyData, {
            encoding: `utf8`
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}