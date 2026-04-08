 export interface IBaseModelAttached {
  /** 
   * An immutable, unique ID of the object.
   * To prevent future compatibility issues, this ID is always of type String.
   */

  readonly id: string;
  readonly createdAt: number; //ISO Date
}