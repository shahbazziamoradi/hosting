import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Basic } from '../components/cute-ui/cuteUI';
import { Base } from '../controllers/baseController';

export class Gate extends Base {
    constructor(data?: { AGAT_GAT: number, AGAT_SRC_ZONE: number, SRC_PATH: string, AGAT_DIST_ZONE: number, DIST_PATH: string, AGAT_IP: string, AGAT_TTL: string, AGAT_STAT: Basic.status, AGAT_STAT_DESC: string }) {
        super();
        if (data) {
            this._id = data.AGAT_GAT;
            this._title = data.AGAT_TTL;
            this._ip = data.AGAT_IP;
            this._source = data.AGAT_SRC_ZONE;
            this._parent = data.AGAT_SRC_ZONE;
            this._destination = data.AGAT_DIST_ZONE;
            this._sourcePath = data.SRC_PATH;
            this._destinationPath = data.DIST_PATH;
            this._state = data.AGAT_STAT
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _parent!: number;
    public get parent(): number {
        return this._parent;
    }
    public set parent(v: number) {
        this._parent = v;
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

    private _destination!: number;
    public get destination(): number {
        return this._destination;
    }
    public set destination(v: number) {
        this._destination = v;
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

    private _destinationPath!: string;
    public get destinationPath(): string {
        return this._destinationPath;
    }
    public set destinationPath(v: string) {
        this._destinationPath = v;
    }

    private _state!: Basic.status;
    public get state(): Basic.status {
        return this._state;
    }
    public set state(v: Basic.status) {
        this._state = v;
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
                reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }
        return new Promise(resultPromise);
    }

    add(): Promise<Array<Gate>> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/addGate`, this);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        var result = new Array<Gate>();
                        var json = await e.json();
                        json.forEach((element: any) => {
                            result.push(new Gate(element))
                        });
                        resolve(result);
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
                reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }

    delete(): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/delete/${this.id}`);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        var result = new Array<Gate>();
                        var json = await e.json();
                        json.forEach((element: any) => {
                            result.push(new Gate(element))
                        });
                        resolve(result);
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
                reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }

    toggle(): Promise<boolean> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/toggle/${this.id}`);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        var result = await e.json();
                        resolve(result);
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
                reject({ error: { message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }
}