import dataSource, { storage } from '../assets/dataSource/dataSource';

enum gateState {
    active = 1,
    deactive = 0,
}

export class Gate {
    constructor(data?: { AGAT_GAT: number, AGAT_SRC_ZONE: number, SRC_PATH: string, AGAT_DIST_ZONE: number, DIST_PATH: string, AGAT_IP: string, AGAT_TTL: string, AGAT_STAT: gateState, AGAT_STAT_DESC: string }) {
        if (data) {
            this._id = data.AGAT_GAT;
            this._title = data.AGAT_TTL;
            this._ip = data.AGAT_IP;
            this._source = data.AGAT_SRC_ZONE;
            this._distination = data.AGAT_DIST_ZONE;
            this._sourcePath = data.SRC_PATH;
            this._distinationPath = data.DIST_PATH;
            this._state = data.AGAT_STAT
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _title!: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _ip!: string;
    public get ip(): string {
        return this._ip;
    }
    public set ip(v: string) {
        this._ip = v;
    }

    private _distination!: number;
    public get dist(): number {
        return this._distination;
    }
    public set distination(v: number) {
        this._distination = v;
    }

    private _source!: number;
    public get source(): number {
        return this._source;
    }
    public set source(v: number) {
        this._source = v;
    }

    private _sourcePath!: string;
    public get sourcePath(): string {
        return this._sourcePath;
    }
    public set sourcePath(v: string) {
        this._sourcePath = v;
    }

    private _distinationPath!: string;
    public get distinationPath(): string {
        return this._distinationPath;
    }
    public set distinationPath(v: string) {
        this._distinationPath = v;
    }


    private _state!: gateState;
    public get state(): gateState {
        return this._state;
    }
    public set state(v: gateState) {
        this._state = v;
    }

    static getGates(): Promise<Array<Gate>> {
        var resultPromise = (resolve: any, reject: any): Array<Gate> => {
            var result = new Array<Gate>();
            var promise = dataSource.get(`api/Gates/getGates`);

            promise.then(async (e) => {
                if (e.status == 200) {
                    var json = await e.json();
                    console.log(e);
                    json.forEach((element: any) => {
                        result.push(new Gate(element))
                    });
                    resolve(result);
                } else {
                    reject(e)
                }
            })

            promise.catch((e) => {
                reject(e);
            })

            return new Array<Gate>();
        }
        return new Promise(resultPromise);
    }

    static checkConnection(ip: string): Promise<boolean> {
        var resultPromise = (resolve: any, reject: any) => {
            var promise = dataSource.post(`api/Gates/checkConnection/${ip}`);

            promise.then(async (e) => {
                if (e.status == 200) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })

            promise.catch((e) => {
                reject(e);
            })
        }
        return new Promise(resultPromise);
    }

    static addGate(data: { distId: number; srcId: number; ip: string; title: string; }): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/addGate`, data);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject(e);
            })

        }
        return new Promise(resultPromise);
    }
    // static deletePlace(id: number): Promise<void> {
    //     var resultPromise = (resolve: any, reject: any): void => {
    //         var promise = dataSource.post(`api/places/deleteplace/${id}`);

    //         promise.then(async (e: Response) => {
    //             switch (e.status) {
    //                 case 200:
    //                     resolve();
    //                     break;
    //                 default:
    //                     reject(await { error: e.json(), code: e.status })
    //                     break;
    //             }
    //         })

    //         promise.catch((e) => {
    //             reject(e);
    //         })
    //     }
    //     return new Promise(resultPromise);
    // }

    // static addPlace(parent: number, title: string): Promise<void> {
    //     var resultPromise = (resolve: any, reject: any): void => {
    //         var promise = dataSource.post(`api/places/addplace`, { parent, title });

    //         promise.then(async (e: Response) => {
    //             switch (e.status) {
    //                 case 200:
    //                     resolve();
    //                     break;
    //                 default:
    //                     reject({ error: await e.json(), code: e.status })
    //                     break;
    //             }
    //         })

    //         promise.catch((e) => {
    //             reject(e);
    //         })
    //     }
    //     return new Promise(resultPromise);
    // }
}