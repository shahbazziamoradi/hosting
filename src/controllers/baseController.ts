export class Base {
    constructor() {

    }

    toJSON(key: any) {
        let result: any = {}
        for (const key in this) {

            if (Object.prototype.hasOwnProperty.call(this, key)) {
                result[key.substr(1)] = this[key];
            }
        }
        if (key)
            return JSON.stringify(this);
        else
            return result;
    }
}