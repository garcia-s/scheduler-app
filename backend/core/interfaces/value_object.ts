export default abstract class ValueObject<T> {
  protected _value: T;

  constructor(value: T) {
    this._value = value;
  }



 
}
