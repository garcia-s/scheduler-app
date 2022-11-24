import { IDomainEvent } from "../../../../core/interfaces/domain_event";
import { UUIDEntityID } from "../../../../core/value_objects/uuid_entity_id";
import { RecoveryToken } from "../value_objects/recovery_token";

export class PasswordRecoveryEvent extends IDomainEvent {
    private _userId: UUIDEntityID;
    private _recoveryToken: RecoveryToken

    constructor(id: UUIDEntityID, token: RecoveryToken) {
        super()
        this._userId = id;
        this._recoveryToken = token;
    }

    get userId() : UUIDEntityID {
        return this._userId
    }

    get recoveryToken(): RecoveryToken {
        return this._recoveryToken;
    }
}