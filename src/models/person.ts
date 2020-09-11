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
        PPRS_PRS: number
    }) {
        super()
        if (data) {
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
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }
    // public set id(v: number) {
    //     this._id = v;
    // }

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
            })
        }
        return new Promise(promise);
    }
}