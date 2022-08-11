export default abstract class ValueObject<T> {
  protected _value: T;

  get value(): T {
    return this._value;
  }

  constructor(value: T) {
    this._value = value;
  }
}
