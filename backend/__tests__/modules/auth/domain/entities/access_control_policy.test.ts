import UniqueEntityID from "../../../../../core/domain/value_objects/unique_entity_id"
import { AccessControlPolicyEntity } from "../../../../../modules/auth/domain/entities/access/access_control_policy"
import { AccessRequest } from "../../../../../modules/auth/domain/value_objects/access_request"


describe('Test for access control policy entity',() => {
    const baseRequest = {
        action: 'borrar',
        objectOwner: '22',
        objectId: '1',
        objectType: 'verde',   
    }
    
    test('Has access for user when ',() => {
       const policy = AccessControlPolicyEntity.create({
           action: '*',
           objectId: '*',
           objectType:'*',
           objectOwner: '*'
       })
       const request = AccessRequest.create(baseRequest)
       const access = policy.hasAccess(new UniqueEntityID('fake'),request);
       expect(access).toBeTruthy();
    })
})