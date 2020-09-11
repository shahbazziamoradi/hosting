import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Place } from '../models/models';

export default class Places {
    static getTraffic(placeId: number): Promise<Array<any>> {
        var resultPromise = (resolve: any, reject: any): Array<any> => {
            var result = new Array<Place>();
            var promise = dataSource.get(`api/places/getTraffic/${placeId}`);

            promise.then(async (e) => {
                switch (e.status) {
                    case 200:
                        var json = await e.json();
                        // json.forEach((element: any) => {
                        //     result.push(new Place(element))
                        // });
                        resolve(json);
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject(e);
            })

            return new Array<Place>();
        }
        return new Promise(resultPromise);
    }
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