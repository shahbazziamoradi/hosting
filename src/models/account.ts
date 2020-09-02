import dataSource, { storage } from '../assets/dataSource/dataSource';

export class User {
    constructor() {
        this._name = '';
        this._password = '';
        this._username = ''
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    private _username: string;
    public get username(): string {
        return this._username;
    }
    public set username(v: string) {
        this._username = v;
    }

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
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
        storage.removeKey('access_token');
    }

    changePassword(oldPassword: string, newPassword: string, confirmPassword: string): any {
    }
}