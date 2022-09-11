import { PolicyEntity } from "../../../../../modules/access_control/_domain/entities/access_control_policy";
import { AccessRequest } from "../../../../../modules/authentication/_domain/value_objects/access_request";

describe("Test for access control policy entity", () => {
  const baseRequest = {
    action: "borrar",
    objectOwner: "22",
    objectId: "1",
    objectType: "verde",
  };

  test("Has access for user when everything is wildcard", () => {
    const policy = PolicyEntity.create({
      action: "*",
      objectId: "*",
      objectType: "*",
      objectOwner: "*",
    });
    const request = AccessRequest.create(baseRequest);
    const access = policy.hasAccess("fake", request);
    expect(access).toBeTruthy();
  });

  test("User has access when the action is specified but doesnt when the action is wrong", () => {
    const policy = PolicyEntity.create({
      action: "create",
      objectId: "*",
      objectType: "*",
      objectOwner: "*",
    });
    const truthyRequest = AccessRequest.create({
      ...baseRequest,
      action: "create",
    });
    const falsyRequest = AccessRequest.create({
      ...baseRequest,
      action: "notAnAction",
    });
    const truthy = policy.hasAccess("fake", truthyRequest);
    const falsy = policy.hasAccess("fake", falsyRequest);
    expect(truthy).toBeTruthy();
    expect(falsy).toBeFalsy();
  });


  test("Has access when objectId is equal to the request objectId", () => {
    const policy = PolicyEntity.create({
      action: "*",
      objectId: "33",
      objectType: "*",
      objectOwner: "*",
    });
    const request = AccessRequest.create({ ...baseRequest, objectId: "33" });
    const access = policy.hasAccess("fake", request);
    expect(access).toBeTruthy();
  });


  test("Has access when objectOwner is self and the user matches with the of the request for the request", () => {
    const policy = PolicyEntity.create({
      action: "*",
      objectId: "*",
      objectType: "*",
      objectOwner: "!",
    });
    const request = AccessRequest.create({
      ...baseRequest,
      objectId: "33",
      objectOwner: "333",
    });
    const access = policy.hasAccess("333", request);
    expect(access).toBeTruthy();
  });


  test("Has access when request matches", () => {
    const policy = PolicyEntity.create({
      action: "create",
      objectId: "objectId",
      objectType: "request",
      objectOwner: "!",
    });
    const request = AccessRequest.create({
      action: "create",
      objectId: "objectId",
      objectType: "request",
      objectOwner: "333",
    });
    const access = policy.hasAccess("333", request);
    expect(access).toBeTruthy();
  });
});
