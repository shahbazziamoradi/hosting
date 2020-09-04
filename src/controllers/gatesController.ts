import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Gate, List } from '../models/models';

export default class Gates {
    static async getGates(): Promise<Array<Gate>> {
        return Gate.getGates()
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
        return Gate.addGate(gate)
    }
}