import { PolicyAttribute } from "../../../../../modules/access_control/_domain/value_objects/policy_attribute"
import { AccessRequestAttribute } from "../../../../../modules/access_control/_domain/value_objects/request_attribute";

describe('Tests for policy attribute', () => {
    let baseAttribute = {name: "attribute", value:"*"}
    
    test("Returns false if the request attribute is different than expected", () => {
        const policyAttr = PolicyAttribute.create(baseAttribute);
        const requestAttr = AccessRequestAttribute.create({...baseAttribute, name:'notmatched'})
        expect(policyAttr.err).toBeFalsy();
        if(!policyAttr.err) expect(policyAttr.val.hasAccess(requestAttr)).toBeFalsy();
    })

    test("Returns true if the request attribute if the policy has access to all (*)", () => {
        const policyAttr = PolicyAttribute.create(baseAttribute);
        const requestAttr = AccessRequestAttribute.create({...baseAttribute, value:'any'})
        expect(policyAttr.err).toBeFalsy();
        if(!policyAttr.err) expect(policyAttr.val.hasAccess(requestAttr)).toBeTruthy()
    })

    test("Returns true if the value of the request is the same as the one in the policy (*)", () => {
        const policyAttr = PolicyAttribute.create({...baseAttribute, value:'any'});
        const requestAttr = AccessRequestAttribute.create({...baseAttribute, value:'any'})
        expect(policyAttr.err).toBeFalsy();
        if(!policyAttr.err) expect(policyAttr.val.hasAccess(requestAttr)).toBeTruthy()
    })
})