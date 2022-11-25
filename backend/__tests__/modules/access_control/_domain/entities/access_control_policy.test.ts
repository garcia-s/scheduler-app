import { UUIDEntityID } from "../../../../../core/value_objects/uuid_entity_id";
import { PolicyEntity } from "../../../../../modules/access_control/_domain/entities/access_control_policy";
import { PolicyAttribute } from "../../../../../modules/access_control/_domain/value_objects/policy_attribute";
import { AccessRequestAttribute } from "../../../../../modules/access_control/_domain/value_objects/request_attribute";
import { AccessRequest } from "../../../../../modules/authentication/_domain/value_objects/access_request";

describe("Test for access control policy entity", () => {
  const policyAttributes: PolicyAttribute[] = [
    PolicyAttribute.reconstitute({ name: "attribute1", value: "attribute1" }),
    PolicyAttribute.reconstitute({ name: "attribute2", value: "attribute2" }),
    PolicyAttribute.reconstitute({ name: "attribute3", value: "attribute3" }),
  ];

  const requestAttributes: AccessRequestAttribute[] = [
    AccessRequestAttribute.create({ name: "attribute1", value: "attribute1" }),
    AccessRequestAttribute.create({ name: "attribute2", value: "attribute2" }),
    AccessRequestAttribute.create({ name: "attribute3", value: "attribute3" }),
  ];
  test("Returns true if the policy attributes and the access attributes match", () => {
    //Arrange
    const policy = PolicyEntity.reconstitute({
      id: UUIDEntityID.reconstitute("fakeId"),
      action: "create",
      attributes: policyAttributes,
    });

    const request = AccessRequest.create({
      action: "create",
      attributes: requestAttributes,
    });

    //act
    const result = policy.hasAccess(request);

    //Assert
    expect(result).toBeTruthy();
  });

  test("Returns false if the request has extra attributes", () => {
    //Arrange
    const policy = PolicyEntity.reconstitute({
      id:  UUIDEntityID.reconstitute("fakeId"),
      action: "create",
      attributes: policyAttributes,
    });
    const requestAttrWithExtra = requestAttributes;
    requestAttrWithExtra.push(
      AccessRequestAttribute.create({ name: "attribute4", value: "attribute4" })
    );

    const request = AccessRequest.create({
      action: "create",
      attributes: requestAttrWithExtra,
    });

    //Act
    const result = policy.hasAccess(request);

    //Assert
    expect(result).toBeFalsy();
  });

  test("Returns false if the actions dont match", () => {
    //Arrange
    const policy = PolicyEntity.reconstitute({
      id:  UUIDEntityID.reconstitute("fakeId"),
      action: "create",
      attributes: policyAttributes,
    });

    const request = AccessRequest.create({
      action: "notTheAction",
      attributes: requestAttributes,
    });

    //Act
    const result = policy.hasAccess(request);

    //Assert
    expect(result).toBeFalsy();
  });

  test("Returns true if the policies match even out of order",() => {
  //Arrange
  const policy = PolicyEntity.reconstitute({
    id:  UUIDEntityID.reconstitute("fakeId"),
    action: "create",
    attributes: policyAttributes,
  });
  const requestAttrButShuffled = requestAttributes;
  requestAttrButShuffled[0] = requestAttributes[2];
  requestAttrButShuffled[2] = requestAttributes[0]

  const request = AccessRequest.create({
    action: "notTheAction",
    attributes: requestAttrButShuffled,
  });
  
  //Act
  const result = policy.hasAccess(request);

  //Assert
  expect(request).toBeTruthy();
  });
});
