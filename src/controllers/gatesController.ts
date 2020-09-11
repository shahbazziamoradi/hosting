import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Gate, List } from '../models/models';

export default class Gates {
    static async getGates(): Promise<Array<Gate>> {
        var resultPromise = (resolve: any, reject: any): Array<Gate> => {
            var result = new Array<Gate>();
            var promise = dataSource.get(`api/Gates/getGates`);

            promise.then(async (e) => {
                if (e.status == 200) {
                    var json = await e.json();
                    json.forEach((element: any) => {
                        result.push(new Gate(element))
                    });
                    resolve(result);
                } else {
                    reject(e)
                }
            })

            promise.catch((e) => {
                reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

            return new Array<Gate>();
        }
        return new Promise(resultPromise);
    }

    static async checkConnection(ip: string): Promise<boolean> {
        return Gate.checkConnection(ip);
    }

    static addGate(destination: number, source: number, ip: string, title: string): Promise<Array<Gate>> {
        var gate = new Gate();
        gate.destination = destination;
        gate.source = source;
        gate.parent = source;
        gate.ip = ip;
        gate.title = title;
        return gate.add()
    }

    static deleteGate(id: number): Promise<void> {
        var gate = new Gate();
        gate.id = id;
        return gate.delete()
    }

    static toggle(id: number): Promise<boolean> {
        var gate = new Gate();
        gate.id = id;
        return gate.toggle()
    }
}