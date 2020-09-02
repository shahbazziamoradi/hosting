import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Place } from '../models/models';

export default class Places {
    static async getPlaces(): Promise<Array<Place>> {
        return Place.getPlaces()
    }
    static async deletePlace(id: number): Promise<void> {
        return Place.deletePlace(id)
    }
    static async addPlace(parentId: number, title: string): Promise<void> {
        return Place.addPlace(parentId, title);
    }
}