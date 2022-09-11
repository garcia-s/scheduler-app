import { string } from "fp-ts";
import { IDomainEvent } from "../../../../core/interfaces/domain_event";

class LoginAttemptEvent extends IDomainEvent {
    private _id: string;
    private _username: string;
    private _success: boolean; 

    constructor(id: string, username: string, success: boolean) {
        super();
        this._id = id;
        this._username = username;
        this._success = success;
    }

    get aggregateId(): string {
        return this._id;
    }

    get username(): string {
       return this._username
    }

    get success(): boolean {
        return this._success
    }
}