import dataSource from '../assets/dataSource/dataSource';
import { List } from '../models/models';

export default class Lists {
    static addList(list: List): Promise<Array<List>> {
        var promise = (resolve: any, reject: any): Array<List> | void => {
            dataSource.post('api/Lists/add', list).then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        var result = new Array<List>();
                        var data = await e.json();
                        data.forEach((row: any) => {
                            result.push(new List(row));
                        });
                        resolve(result)
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            }).catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }

        return new Promise(promise);
    }

    static async getLists(): Promise<Array<List>> {
        var promise = (resolve: any, reject: any): Array<List> | void => {
            dataSource.get('api/Lists/get').then(async (e) => {
                switch (e.status) {
                    case 200:
                        var result = new Array<List>();
                        var data = await e.json();
                        data.forEach((row: any) => {
                            result.push(new List(row));
                        });
                        resolve(result)
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
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