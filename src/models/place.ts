import dataSource, { storage } from '../assets/dataSource/dataSource';
import { SessionTimeout } from '../views/layout/layout';
import { List } from './models';

export class Place {
    constructor(data?: { APLC_PLC: number, APLC_TTL: string, APLC_TYP: number, APLC_PTH: string, APLC_PTH_DESC: string, APLC_APLCS: string, APLC_ALST: Array<any> }) {
        if (data) {
            this._id = data.APLC_PLC;
            this._title = data.APLC_TTL;
            this._type = data.APLC_TYP;
            this._path = data.APLC_PTH;
            this._pathText = data.APLC_PTH_DESC;
            if (data.APLC_ALST) {
                this._list = new List(data.APLC_ALST[0]);
            }
            this._childs = new Array<Place>();
            if (data.APLC_APLCS) {
                JSON.parse(data.APLC_APLCS).forEach((aplc: any) => {
                    this._childs.push(new Place(aplc))
                });
            }
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _childs!: Array<Place>;
    public get childs(): Array<Place> {
        return this._childs;
    }
    public set childs(v: Array<Place>) {
        this._childs = v;
    }

    private _title!: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _type!: number;
    public get type(): number {
        return this._type;
    }
    public set type(v: number) {
        this._type = v;
    }

    private _path!: string;
    public get path(): string {
        return this._path;
    }

    private _pathText!: string;
    public get pathText(): string {
        return this._pathText;
    }
    public set pathText(v: string) {
        this._pathText = v;
    }

    private _list!: List;
    public get list(): List {
        return this._list;
    }
    public set list(v: List) {
        this._list = v;
    }


    static getPlaces(): Promise<Array<Place>> {
        var resultPromise = (resolve: any, reject: any): Array<Place> => {
            var result = new Array<Place>();
            var promise = dataSource.get(`api/places/getplaces`);

            promise.then(async (e) => {

                switch (e.status) {
                    case 200:
                        var json = await e.json();
                        json.forEach((element: any) => {
                            result.push(new Place(element))
                        });
                        resolve(result);
                        break;
                    case 401:
                        reject({ error: { Message: 'صفحه منقضی شده است' }, code: e.status });
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

    static deletePlace(id: number): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/places/deleteplace/${id}`);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    case 401:
                        reject({ error: { Message: 'صفحه منقضی شده است' }, code: e.status });
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject(e);
            })
        }
        return new Promise(resultPromise);
    }

    static addPlace(parent: number, title: string): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/places/addplace`, { parent, title });

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    case 401:
                        reject({ error: { Message: 'صفحه منقضی شده است' }, code: e.status });
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject(e);
            })
        }
        return new Promise(resultPromise);
    }
}