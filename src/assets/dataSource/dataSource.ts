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
            return (false) ? 'http://172.27.172.29:55555';
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
        return getPromise;
    }

    static post(url: string, data?: any) {
        var token = this.getToken();
        var postPromise = fetch(`${this.host()}/${url}`, {
            method: methodTypes.POST,
            headers: this.headers(token, methodTypes.POST),
            body: JSON.stringify({ "json": JSON.stringify(data) })
        });
        return postPromise;
    }

    static authentication(username: string, password: string) {
        console.log(username, password)
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
        return localStorage.removeItem(key)
    }

    static removeKeys(keys: Array<string>) {
        keys.forEach(key => {
            localStorage.removeItem(key)
        });
    }
}