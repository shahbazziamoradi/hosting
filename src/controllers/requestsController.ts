import { resolveModuleName } from 'typescript';
import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Gate, List, Person, Request } from '../models/models';

export default class Requests {
    static async getRequests(): Promise<Array<Request>> {
        var promise = (resolve: any, reject: any): Array<Request> | void => {
            dataSource.get('api/Requests/get').then(async (e) => {
                switch (e.status) {
                    case 200:
                        var result = new Array<Request>();
                        var data = await e.json();
                        console.log(data)
                        data.forEach((row: any) => {
                            result.push(new Request(row));
                        });
                        resolve(result)
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            }).catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }

        return new Promise(promise);
    }

    static async add(subject: string, description: string, personId: number, date: Date, type: number): Promise<Array<Request>> {
        var promise = (resolve: any, reject: any): Array<Request> | void => {
            dataSource.post('api/requests/set', { subject, description, personId, date, type }).then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve(await e.json());
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            }).catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }

        return new Promise(promise);
    }
    // static async deleteGate(id: number): Promise<void> {
    //     return Gate.deleteGate(id)
    // }
    // static async addGate(parentId: number, title: string): Promise<void> {
    //     return Gate.addGate(parentId, title);
    // }
}