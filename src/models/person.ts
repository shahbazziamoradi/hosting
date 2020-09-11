import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Base } from '../controllers/baseController';
import { User } from './models';

export class Person extends Base {
    constructor(data?: {
        AUSR_ACT_FLG: Boolean,
        AUSR_INS_DTE: Date,
        AUSR_LOCK: boolean,
        AUSR_PPRS_PRS: number,
        AUSR_USERNAME: string,
        AUSR_USR: string,
        PPRS_FST_NAM: string,
        PPRS_LST_NAM: string,
        PPRS_MOB: string,
        PPRS_NAT_ID: string,
        PPRS_PERSON_COD: number,
        PPRS_PRS: number,
        PPRS_AMODS: Array<any>
    }) {
        super()
        if (data) {
            this._AccessModes = data.PPRS_AMODS;
            this._id = data.PPRS_PRS;
            this._firstName = data.PPRS_FST_NAM;
            this._lastName = data.PPRS_LST_NAM;
            this._nationalId = data.PPRS_NAT_ID;
            this._employeeCode = data.PPRS_PERSON_COD;
            this._mobile = data.PPRS_MOB
            this._user = new User();
            if (data.AUSR_USR) {
                this._user = new User({
                    AUSR_ACT_FLG: data.AUSR_ACT_FLG,
                    AUSR_INS_DTE: data.AUSR_INS_DTE,
                    AUSR_LOCK: data.AUSR_LOCK,
                    AUSR_PPRS_PRS: data.AUSR_PPRS_PRS,
                    AUSR_USERNAME: data.AUSR_USERNAME,
                    AUSR_USR: data.AUSR_USR,
                    AUSR_PPRS: this
                })
            }
            if (data.PPRS_AMODS) {
                this._AccessModes = new Array<AccessMode>();
                data.PPRS_AMODS.forEach(element => {
                    this._AccessModes.push(new AccessMode(element));
                });
            }
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _firstName!: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(v: string) {
        this._firstName = v;
    }

    private _lastName!: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(v: string) {
        this._lastName = v;
    }

    private _nationalId!: string;
    public get nationalId(): string {
        return this._nationalId;
    }
    public set nationalId(v: string) {
        this._nationalId = v;
    }

    private _employeeCode!: number;
    public get employeeCode(): number {
        return this._employeeCode;
    }
    public set employeeCode(v: number) {
        this._employeeCode = v;
    }

    private _mobile!: string;
    public get mobile(): string {
        return this._mobile;
    }
    public set mobile(v: string) {
        this._mobile = v;
    }

    private _user!: User;
    public get user(): User {
        return this._user;
    }
    public set user(v: User) {
        this._user = v;
    }

    private _AccessModes!: Array<AccessMode>;
    public get AccessModes(): Array<AccessMode> {
        return this._AccessModes;
    }
    public set AccessModes(v: Array<AccessMode>) {
        this._AccessModes = v;
    }

    createUser(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/Account/CreateUser/${this.id}`).then(async (e) => {
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
                resolve(true)
            }).catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }
        return new Promise(promise);
    }

    addAccessCard(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/Account/CardRegister/${this.id}`).then(async (e) => {
                switch (e.status) {
                    case 200:
                        var result = await e.json();
                        resolve(result);
                        break;
                    case 500:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    case 501:
                        reject({ error: await e.json(), code: e.status })
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
                resolve(true)
            }).catch((e) => {
                reject({ error: { Message: 'خطا در ارتباط با سرور' }, code: e.status })
            })
        }
        return new Promise(promise);
    }
}

export class AccessMode {
    constructor(data: { AMOD_MOD: number, AMOD_TYP: number, AMOD_TTL: string, AMOD_STAT: boolean }) {
        if (data) {
            this._id = data.AMOD_MOD;
            this._title = data.AMOD_TTL;
            this._type = data.AMOD_TYP;
            this._active = data.AMOD_STAT;
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _type!: number;
    public get type(): number {
        return this._type;
    }
    public set type(v: number) {
        this._type = v;
    }

    private _title!: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _active!: boolean;
    public get active(): boolean {
        return this._active;
    }
    public set active(v: boolean) {
        this._active = v;
    }
    toggle(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/account/accessmode/toggle/${this.id}`).then(async (e) => {
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
                resolve(true)
            }).catch((e) => {
            })
        }
        return new Promise(promise);
    }

    delete(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/account/accessmode/delete/${this.id}`).then(async (e) => {
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
                resolve(true)
            }).catch((e) => {
            })
        }
        return new Promise(promise);
    }
}