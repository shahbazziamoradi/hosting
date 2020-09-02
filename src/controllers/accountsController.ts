import { storage } from '../assets/dataSource/dataSource';
import { User } from '../models/models';

export default class Accounts {
    static async login(username: string, password: string): Promise<number> {
        var user = new User();
        user.username = username;
        user.password = password;
        return user.login()
    }

    static logout() {
        var user = new User();
        user.logout()
    }

    static async isAuthenticated(): Promise<boolean> {
        var promise = (resolve: any, reject: any) => {
            if (storage.getKey('access_token')) {
                resolve(true)
                return;
            } else {
                resolve(false)
                return;
            }
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