import { SessionTimeout } from "../../views/layout/layout";

enum methodTypes {
    POST = 'POST',
    GET = 'GET'
}

export default class dataSource {
    static host() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // return 'http://10.0.2.2:5000'
            return 'http://localhost:62302'
        } else {
            return (true) ? 'http://192.168.1.101:55555' : '';
        }
    }

    static headers(token: string, method: methodTypes) {
        var header_POST = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        var header_GET = {
            'Authorization': `Bearer ${token}`
        }
        return (method == methodTypes.POST) ? header_POST : header_GET
    }
    static getToken() {
        var token = storage.getKey('access_token');
        return (token) ? token : '';
    }

    static setToken(token: string) {
        storage.setKey('access_token', token)
    }

    static async get(url: string, config?: any): Promise<Response> {
        var token = this.getToken();
        var getPromise = fetch(`${this.host()}/${url}`, {
            method: methodTypes.GET,
            headers: this.headers(token, methodTypes.GET),
            // Accept: '*/*'
        });
        getPromise.then((e: Response) => {
            if (e.status == 401) {
                SessionTimeout()
            }
        })
        return getPromise;
    }

    static post(url: string, data?: any) {
        var token = this.getToken();
        var postPromise = fetch(`${this.host()}/${url}`, {
            method: methodTypes.POST,
            headers: this.headers(token, methodTypes.POST),
            body: JSON.stringify({
                "json": JSON.stringify(data)
            })
        });
        postPromise.then((e: Response) => {
            if (e.status == 401) {
                SessionTimeout()
            }
        })
        return postPromise;
    }

    static authentication(username: string, password: string) {

        var postPromise = fetch(`${this.host()}/api/Account/Authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "password": password })
        });

        return postPromise;
    }
}

export class storage {
    static getKey(key: string) {
        return localStorage.getItem(key)
    }
    static setKey(key: string, data: any) {
        localStorage.setItem(key, data)
    }

    static removeKey(key: string) {
        localStorage.removeItem(key)
    }

    static removeKeys(keys: Array<string>) {
        keys.forEach(key => {
            localStorage.removeItem(key)
        });
    }

    static clear() {
        localStorage.clear();
    }
}