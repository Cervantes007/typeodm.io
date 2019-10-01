import { extractSchema } from '../src';
import userSchema, { User } from './user.document';
import {EmptyDocument} from "./empty.document";

const schema = extractSchema(User);

test(`@pre('save')`, () => {
  expect(typeof schema['virtuals'].usernameUpper.getters[0]).toStrictEqual('function');
  expect(typeof userSchema['virtuals'].usernameUpper.getters[0]).toStrictEqual('function');
  expect(typeof schema['virtuals'].usernameUpper.setters[0]).toStrictEqual('function');
  expect(typeof userSchema['virtuals'].usernameUpper.setters[0]).toStrictEqual('function');
});

test(`empty document`, () => {
  const emptySchema = extractSchema(EmptyDocument);
  expect(emptySchema).toBeUndefined();
});
