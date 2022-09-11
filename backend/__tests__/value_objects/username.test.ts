import { Username } from "../../core/value_objects/username"

describe('Validation tests for the username value object', () => {
    test('Email validation test', () => {
        const usernameOrfailure = Username.create('garciajj18@gmail.com');
        expect(usernameOrfailure.err).toBeFalsy();
    })
})