import dataSource, { storage } from '../assets/dataSource/dataSource';
import { Base } from '../controllers/baseController';
import { Person } from './models';

export class User extends Base {
    constructor(data?: {
        AUSR_PPRS: Person,
        AUSR_ACT_FLG: Boolean,
        AUSR_INS_DTE: Date,
        AUSR_LOCK: boolean,
        AUSR_PPRS_PRS: number,
        AUSR_USERNAME: string,
        AUSR_USR: string
    }) {
        super()
        if (data) {
            if (data.AUSR_PPRS) {
                this._person = data.AUSR_PPRS;
            }
            this._id = data.AUSR_USR;
            this._username = data.AUSR_USERNAME;
            this._lock = data.AUSR_LOCK
        }
    }

    private _id!: string;
    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    private _person!: Person;
    public get person(): Person {
        return this._person;
    }
    public set person(v: Person) {
        this._person = v;
    }

    private _username!: string;
    public get username(): string {
        return this._username;
    }
    public set username(v: string) {
        this._username = v;
    }

    private _password!: string;
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
    }

    private _lock !: boolean;
    public get lock(): boolean {
        return this._lock;
    }
    public set lock(v: boolean) {
        this._lock = v;
    }


    isValid(): boolean {
        if (this._username && this._password) {
            return true;
        }
        return false;
    }

    login(): Promise<number> {
        var loginPromise = (resolve: any, reject: any) => {
            if (this.isValid()) {
                storage.removeKey('access_token');
                var promise = dataSource.authentication(this.username, this.password);
                promise.then(async (data: any) => {
                    switch (data.status) {
                        case 200:
                            let jsonData = await data.json();
                            storage.setKey('access_token', jsonData.token)
                            storage.setKey('userId', jsonData.id)
                            storage.setKey('firstName', jsonData.firstName)
                            storage.setKey('lastName', jsonData.lastName)
                            console.log(jsonData);
                            resolve(data.status);
                            return;
                            break;
                        case 401:
                            reject(new Error('نام‌کاربری و کلمه‌عبور نادرست می‌باشد'));
                            return;
                            break;
                        default:
                            reject(new Error('خطا در ارتباط با سرور'));
                            return;
                            break;
                    }
                });

                promise.catch((error: any) => {
                    if (error.message == 'Network request failed') {
                        reject(new Error('لطفا ارتباط با شبکه خود را بررسی کنید'));
                    } else {
                        reject(new Error('خطا در ارتباط با سرور'));
                    }
                    return;
                });
            } else {
                reject(new Error('ورود نام‌کاربری و کلمه‌عبور الزامی می‌باشد'));
                return;
            }
        }
        return new Promise(loginPromise);
    }

    logout() {
        storage.clear();
    }

    changePassword(oldPassword: string, newPassword: string, confirmPassword: string): any {
    }

    resetPassword(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/account/resetPassword/${this.username}`).then(async (e) => {
                switch (e.status) {
                    case 200:
                        console.log(e);
                        console.log(await e.json());
                        resolve(true);
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

    locking(): Promise<boolean> {
        var promise = (resolve: (e: any) => {} | void, reject: (e: any) => {} | void): boolean | any => {
            dataSource.post(`api/account/lock/${this.username}`).then(async (e) => {
                switch (e.status) {
                    case 200:
                        console.log(e);
                        console.log(await e.json());
                        resolve(true);
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