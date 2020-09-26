import { Shield } from 'react-bootstrap-icons';
import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Basic } from '../components/cute-ui/cuteUI';
import { Base } from '../controllers/baseController';

export class Gate extends Base {
    constructor(data?: { AGAT_GAT: number, AGAT_SRC_ZONE: number, SRC_PATH: string, AGAT_DIST_ZONE: number, DIST_PATH: string, AGAT_IP: string, AGAT_TTL: string, AGAT_STAT: Basic.status, AGAT_STAT_DESC: string, AGAT_FHSTS: any }) {
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
            this._history = new Array<FetchHistory>();
            // JSON.parse(data.AGAT_FHSTS)
            if (data.AGAT_FHSTS)
                data.AGAT_FHSTS.forEach((element: { FHST_HST: number; FHST_DTE: Date; FHST_TOT_ROW: number; FHST_AFC_ROW: number; }) => {
                    this._history.push(new FetchHistory(element));
                });
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

    private _modelNo!: string;
    public get modelNo(): string {
        return this._modelNo;
    }
    public set modelNo(v: string) {
        this._modelNo = v;
    }

    private _hardwareVersion!: string;
    public get hardwareVersion(): string {
        return this._hardwareVersion;
    }
    public set hardwareVersion(v: string) {
        this._hardwareVersion = v;
    }

    private _softwareVersion!: string;
    public get softwareVersion(): string {
        return this._softwareVersion;
    }
    public set softwareVersion(v: string) {
        this._softwareVersion = v;
    }

    private _history!: Array<FetchHistory>;
    public get history(): Array<FetchHistory> {
        return this._history;
    }
    public set history(v: Array<FetchHistory>) {
        this._history = v;
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
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
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
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
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
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
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
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }

    save(): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/save/`, this);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }


    getData(): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/gates/getData/${this._id}`);

            promise.then(async (e: Response) => {
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })

        }
        return new Promise(resultPromise);
    }
}


export class FetchHistory {
    constructor(data: { FHST_HST: number, FHST_DTE: Date, FHST_TOT_ROW: number, FHST_AFC_ROW: number }) {
        this._id = data.FHST_HST;
        this._date = data.FHST_DTE;
        this._totalRows = data.FHST_TOT_ROW;
        this._affectedRows = data.FHST_AFC_ROW;
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _date!: Date;
    public get date(): Date {
        return this._date;
    }
    public set date(v: Date) {
        this._date = v;
    }

    private _totalRows!: number;
    public get totalRows(): number {
        return this._totalRows;
    }
    public set totalRows(v: number) {
        this._totalRows = v;
    }

    private _affectedRows!: number;
    public get affectedRows(): number {
        return this._affectedRows;
    }
    public set affectedRows(v: number) {
        this._affectedRows = v;
    }

}