export default class dataSource {
    static host() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return 'http://wst.htsco.ir'
            return 'http://10.0.2.2:5000'
        } else {
            return (false) ? 'http://89.43.7.156:5001' : 'http://172.27.172.29:55555';
        }
    }

    static headers(token) {
        return {
            'Accept': 'application/text',
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        }
    }
    static getToken() {
        return new Promise((resolve, reject) => {
            storage.getItem('access_token').then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }
    static setToken(token) {
        return new Promise((resolve, reject) => {
            storage.setItem('access_token', token).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    static async get(url, config) {
        console.log(`${this.host()}/${url}`)
        var token = await this.getToken();
        var postPromise = fetch(`${this.host()}/${url}`, {
            method: 'GET',
            headers: this.headers(token),
            Accept: '*/*'
        });
        return postPromise;
    }

    static post(url, data) {
        var tokenPromise = this.getToken();
        tokenPromise.then((token) => {
            var postPromise = fetch(`${this.host()}/${url}`, {
                method: 'POST',
                headers: this.headers(token),
                Accept: '*/*',
                body: `json=${JSON.stringify(data)}`
            });
            return postPromise;
        });
        // tokenPromise.catch((error) => { reject(error) });
    }

    static authentication(username, password) {
        console.log(username, password)
        var postPromise = fetch(`${this.host()}/api/Account/Authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            Accept: '*/*',
            body: JSON.stringify({ "username": username, "password": password })
        });
        return postPromise;
    }
}

export class storage {
    static getKey(key) {
        return new Promise((resolve, reject) => {
            localStorage.getItem(key).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }
    static setKey(key, data) {
        return new Promise((resolve, reject) => {
            storage.setItem(key, data).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }
    static removeKey(key) {
        return new Promise((resolve, reject) => {
            storage.removeItem(key).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }
    static removeKeys(keys) {
        return new Promise((resolve, reject) => {
            storage.multiRemove(keys).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }
}