import dataSource, { storage } from '../assets/dataSource/dataSource';
import { status } from '../components/cute-ui/elements/basics';
import { Base } from '../controllers/baseController';
import { Person, Place } from './models';

enum listType {
    red = 1,
    black = 2,
    white = 3,
}

export class List extends Base {
    constructor(data?: {
        ALST_INS_DTE: Date,
        ALST_LST: number,
        ALST_TTL: string,
        ALST_TYP: listType,
        ALST_FLG: number,
        PPRSS: Array<any>;
        APLCS: Array<any>;
    }) {
        super();

        if (data) {
            this._id = data.ALST_LST;
            this._title = data.ALST_TTL;
            this._type = data.ALST_TYP;
            this._status = data.ALST_FLG == 1;
            this._persons = new Array<Person>();
            if (data.PPRSS) {
                data.PPRSS.forEach(person => {
                    this._persons.push(new Person(person));
                });
            }
            this._places = new Array<Place>();
            if (data.APLCS) {
                data.APLCS.forEach(person => {
                    this._places.push(new Place(person));
                });
            }
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _title!: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _persons!: Array<Person>;
    public get persons(): Array<Person> {
        return this._persons;
    }
    public set persons(v: Array<Person>) {
        this._persons = v;
    }

    private _places!: Array<Place>;
    public get places(): Array<Place> {
        return this._places;
    }
    public set places(v: Array<Place>) {
        this._places = v;
    }

    private _createDate!: Date;
    public get createDate(): Date {
        return this._createDate;
    }
    public set createDate(v: Date) {
        this._createDate = v;
    }

    private _type!: listType;
    public get type(): listType {
        return this._type;
    }
    public set type(v: listType) {
        this._type = v;
    }

    private _status!: boolean;
    public get status(): boolean {
        return this._status;
    }
    public set status(v: boolean) {
        this._status = v;
    }

    deletePerson(personId: number): Promise<void> {
        var resultPromise = (resolve: any, reject: any): void => {
            var promise = dataSource.post(`api/lists/deletePerson/${personId}/${this.id}`);

            promise.then(async (e: Response) => {
                console.log(e)
                switch (e.status) {
                    case 200:
                        resolve();
                        break;
                    default:
                        reject({ error: await e.json(), code: e.status })
                        break;
                }
            })

            promise.catch((e) => {
                reject(e);
            })
        }
        return new Promise(resultPromise);
    }

}