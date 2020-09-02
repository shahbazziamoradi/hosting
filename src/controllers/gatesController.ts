import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Gate } from '../models/models';

export default class Gates {
    static async getGates(): Promise<Array<Gate>> {
        return Gate.getGates()
    }

    static async checkConnection(ip: string): Promise<boolean> {
        return Gate.checkConnection(ip);
    }

    static addGate(distId: number, srcId: number, ip: string, title: string): Promise<Gate | void> {
        return Gate.addGate({ distId, srcId, ip, title })
    }

    // static async deleteGate(id: number): Promise<void> {
    //     return Gate.deleteGate(id)
    // }
    // static async addGate(parentId: number, title: string): Promise<void> {
    //     return Gate.addGate(parentId, title);
    // }
}