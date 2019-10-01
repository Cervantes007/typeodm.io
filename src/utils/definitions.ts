import { Schema, SchemaOptions } from 'mongoose';

export interface ISchemaOptions extends SchemaOptions {
  collection?: string;
}

export type Ref<T> = T | Schema.Types.ObjectId;
// tslint:disable-next-line:prefer-array-literal
export type ArrayRef<T> = Array<Ref<T>>;
