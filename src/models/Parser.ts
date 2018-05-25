import { parseString } from 'xml2js';

export class Parser {
    public static async fromString(str: string) {
        return new Promise((resolve, reject) => {
            try {
                parseString(str, (err: any, result: any) => {
                    if (err) {
                        return reject(err);
                    } 
    
                    return resolve(result);
                });
            } catch (err) {
                return reject(err);
            }
        });
    }
}