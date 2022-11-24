import { DomainEventEmitter } from "../../../../../core/interfaces/domain_event_emitter";
import { Username } from "../../../../../core/value_objects/username";
import { AuthenticationUserAggregate } from "../../../../../modules/authentication/_domain/aggregates/authentication_user_aggregate";
import LoginAttemptEvent from "../../../../../modules/authentication/_domain/events/login_attempt_event";
import { PasswordRecoveryEvent } from "../../../../../modules/authentication/_domain/events/password_recovery_event";
import { Password } from "../../../../../modules/authentication/_domain/value_objects/password";

describe("Test for the authentication procedure in the AuthenticationUserAggregate", () => {
  const user = { username: "username", password: "P4ssword" };
  const passwordOrFailure = Password.create(user.password);
  const usernameOrFailure = Username.create(user.username);


  test("Logs in correctly when the login information is correct", () => {
    //Arrange
    const userAggregate = AuthenticationUserAggregate.create(
      usernameOrFailure.val as Username,
      passwordOrFailure.val as Password
    );
    //Act
    const result = userAggregate.authenticate(user.password);
    //Assert
    expect(result).toBeTruthy();
  });

  test("Fails if the password is incorrect", () => {
    //Arrange
    const userAggregate = AuthenticationUserAggregate.create(
      usernameOrFailure.val as Username,
      passwordOrFailure.val as Password
    );
    //Act
    const result = userAggregate.authenticate("otherP4ssword");
    //Assert
    expect(result).toBeFalsy();
  });

  test("Emmits the corresponding event in the DomainEventEmmiter", () => {
    //Arrange
    const userAggregate = AuthenticationUserAggregate.create(
      usernameOrFailure.val as Username,
      passwordOrFailure.val as Password
    );
    DomainEventEmitter.listen<LoginAttemptEvent>(
      LoginAttemptEvent.name,
      (event) => {
        expect(true).toBeTruthy();
      }
    );
    //Act
    const result = userAggregate.authenticate("otherP4ssword");
    userAggregate.dispatchEventsForAggregate()
    //Assert
    expect.assertions(1);
  });
});

describe("Tests for the recovery procedure in AuthenticationUserAggregate", () => {
  test("Emmits the event for recovery through the DomainEventEmmiter", () => {
    //Arrange
    const userAggregate = AuthenticationUserAggregate.create(
      Username.reconstitute("fakeusername"),
      Password.reconstitute({
        passwordHash: "aa",
        passwordSalt: "22",
        encryptionCycles: 0,
      })
    );

    DomainEventEmitter.listen<PasswordRecoveryEvent>(
      PasswordRecoveryEvent.name,
      (event) => {
        expect(event.recoveryToken).toBeTruthy();
        DomainEventEmitter.clearHandlers();
      }
    );

    //Act
    userAggregate.initializeRecoveryProcess();
    userAggregate.dispatchEventsForAggregate();
    //Assert
    expect.assertions(1);
  });

  test("Creats password if the recovery token is the same as the provided", () => {
    //Arrange
    const userAggregate = AuthenticationUserAggregate.create(
      Username.reconstitute("fakeusername"),
      Password.reconstitute({
        passwordHash: "aa",
        passwordSalt: "22",
        encryptionCycles: 0,
      })
    );
    //Act
    userAggregate.initializeRecoveryProcess();
    DomainEventEmitter.listen<PasswordRecoveryEvent>(
      PasswordRecoveryEvent.name,
      (event) => {
        const passwordOrFailure = Password.create("12345678");
        const recoverPasswordResult = userAggregate.recoverPassword({
          token: event.recoveryToken.token,
          newPassword: passwordOrFailure.val as Password,
        });
        expect(recoverPasswordResult.err).toBeFalsy();
        DomainEventEmitter.clearHandlers();
      }
    );
    userAggregate.dispatchEventsForAggregate();
    //Assert
    expect.assertions(1);
  });
});
