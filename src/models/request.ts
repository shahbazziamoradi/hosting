import { data } from 'jquery';
import dataSource, { storage } from '../assets/dataSource/dataSource';
import { status } from '../components/cute-ui/elements/basics';
import { Base } from '../controllers/baseController';
import { Person, Place } from './models';

enum requestType {
    in = 1,
    out = 2
}
enum requestStateTypes {
    in = 1,
    out = 2
}

export class Request extends Base {
    constructor(data?: {
        MRQS_COD: number,
        MRQS_DESC: string,
        MRQS_DTE: Date,
        MRQS_GUEST: any,
        MRQS_HOST: any,
        MRQS_INS_DTE: Date,
        MRQS_RQS: number,
        MRQS_RSTPS: Array<any>,
        MRQS_SBJ: string,
        MRQS_ST: number,
        MRQS_UPD_DTE: Date,
        MRQS_YER: number,
        MRQS_TYP: number,
    }) {
        super();

        if (data) {
            this._code = data.MRQS_COD;
            this._description = data.MRQS_DESC;
            this._requestedDate = data.MRQS_DTE;
            this._guest = (data.MRQS_GUEST) ? new Person(JSON.parse(data.MRQS_GUEST)) : new Person();
            this._host = (data.MRQS_HOST) ? new Person(JSON.parse(data.MRQS_HOST)) : new Person();
            this._createDate = data.MRQS_INS_DTE;
            this._subject = data.MRQS_SBJ;
            this._year = data.MRQS_YER;
            this._type = data.MRQS_TYP
            this._states = new Array<RequestState>()
            data.MRQS_RSTPS.forEach(state => {
                this._states.push(new RequestState(state));
            });
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }

    private _subject!: string;
    public get subject(): string {
        return this._subject;
    }
    public set subject(v: string) {
        this._subject = v;
    }

    private _description!: string;
    public get description(): string {
        return this._description;
    }
    public set description(v: string) {
        this._description = v;
    }

    private _year!: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }

    private _code!: number;
    public get code(): number {
        return this._code;
    }
    public set code(v: number) {
        this._code = v;
    }

    private _host!: Person;
    public get host(): Person {
        return this._host;
    }
    public set host(v: Person) {
        this._host = v;
    }

    private _guest!: Person;
    public get guest(): Person {
        return this._guest;
    }
    public set guest(v: Person) {
        this._guest = v;
    }

    private _requestedDate!: Date;
    public get requestedDate(): Date {
        return this._requestedDate;
    }
    public set requestedDate(v: Date) {
        this._requestedDate = v;
    }

    private _acceptedDate!: Date;
    public get acceptedDate(): Date {
        return this._acceptedDate;
    }
    public set acceptedDate(v: Date) {
        this._acceptedDate = v;
    }

    private _type!: requestType;
    public get type(): requestType {
        return this._type;
    }
    public set type(v: requestType) {
        this._type = v;
    }

    private _states!: Array<RequestState>;
    public get states(): Array<RequestState> {
        return this._states;
    }
    public set states(v: Array<RequestState>) {
        this._states = v;
    }

    private _createDate!: Date;
    public get createDate(): Date {
        return this._createDate;
    }
    public set createDate(v: Date) {
        this._createDate = v;
    }

    private _lastState!: RequestState;
    public get lastState(): RequestState {
        if (this._states) {
            return this._states[this._states.length - 1];
        } else {
            return new RequestState();
        }
    }
}

export class RequestState extends Base {
    constructor(data?: { RSTP_STP: number, RSTP_ST_OLD: number, RSTP_ST_OLD_DESC: string, RSTP_ST_NEW: number, RSTP_ST_NEW_DESC: string, RSTP_INS_DTE: Date, RSTP_PPRS: any }) {
        super()
        if (data) {
            this._id = data.RSTP_STP
            this._oldState = data.RSTP_ST_OLD
            this._oldStateDescription = data.RSTP_ST_OLD_DESC
            this._newStateDescription = data.RSTP_ST_NEW_DESC
            this._newState = data.RSTP_ST_NEW
            this._date = data.RSTP_INS_DTE
            this.person = (data.RSTP_PPRS) ? new Person(JSON.parse(data.RSTP_PPRS)) : new Person()
        }
    }

    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _newState!: number;
    public get newState(): number {
        return this._newState;
    }
    public set newState(v: number) {
        this._newState = v;
    }

    private _newStateDescription!: string;
    public get newStateDescription(): string {
        return this._newStateDescription;
    }
    public set newStateDescription(v: string) {
        this._newStateDescription = v;
    }

    private _oldState!: number;
    public get oldState(): number {
        return this._oldState;
    }
    public set oldState(v: number) {
        this._oldState = v;
    }

    private _oldStateDescription!: string;
    public get oldStateDescription(): string {
        return this._oldStateDescription;
    }
    public set oldStateDescription(v: string) {
        this._oldStateDescription = v;
    }

    private _date!: Date;
    public get date(): Date {
        return this._date;
    }
    public set date(v: Date) {
        this._date = v;
    }

    private _person!: Person;
    public get person(): Person {
        return this._person;
    }
    public set person(v: Person) {
        this._person = v;
    }

}