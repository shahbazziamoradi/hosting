import { User } from '../models/account';

export default class Account {
    static async login(username: string, password: string): Promise<number> {
        var user = new User();
        user.username = username;
        user.password = password;
        return user.login()
    }

    static async isAuthenticated(): Promise<boolean> {
        var promise = (resolve: any, reject: any) => {
            localStorage.getKey('access_token').then((data: boolean) => {
                if (data) {
                    resolve(true)
                    return;
                } else {
                    resolve(false)
                    return;
                }
            });
        }
        return new Promise(promise);
    }

    static async isInRole(path: string): Promise<boolean> {
        var promise = (resolve: any, reject: any) => {
            resolve(true)
        }
        return new Promise(promise);
    }
}