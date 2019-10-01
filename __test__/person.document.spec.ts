import { extractSchema } from '../src';

import { getter } from './getter';
import { Person, personSchema } from './person.document';

const personObjODM = extractSchema(Person).obj;
const personObjMongoose = personSchema.obj;

test('@index() name: string;', () => {
  expect(getter(personObjODM, 'name.index')).toStrictEqual(true);
});

test('@unique() name: string;', () => {
  expect(getter(personObjODM, 'name.unique')).toStrictEqual(true);
});

test('@required() name: string;', () => {
  expect(getter(personObjODM, 'name.type')).toStrictEqual(getter(personObjMongoose, 'name.type'));
  expect(getter(personObjMongoose, 'name.required')).toStrictEqual(getter(personObjMongoose, 'name.required'));
});

test('@range(:min, :max, {required: true}) age: number;', () => {
  expect(getter(personObjODM, 'age.type')).toStrictEqual(getter(personObjMongoose, 'age.type'));
  expect(getter(personObjODM, 'age.required')).toStrictEqual(getter(personObjMongoose, 'age.required'));
  expect(getter(personObjMongoose, 'age.min')).toStrictEqual(getter(personObjMongoose, 'age.min'));
  expect(getter(personObjMongoose, 'age.max')).toStrictEqual(getter(personObjMongoose, 'age.max'));
});

test('@range(:min) level: number;', () => {
  expect(getter(personObjODM, 'level.type')).toBe(getter(personObjMongoose, 'level.type'));
  expect(getter(personObjMongoose, 'level.min')).toBe(getter(personObjMongoose, 'level.min'));
});

test(`@isIn(['M', 'F']) genre: string;`, () => {
  expect(getter(personObjODM, 'genre.type')).toStrictEqual(getter(personObjMongoose, 'genre.type'));
  expect(getter(personObjMongoose, 'genre.enum')).toStrictEqual(getter(personObjMongoose, 'genre.enum'));
});

test(`@defaultValue(:default) @trim() genre: string;`, () => {
  expect(getter(personObjMongoose, 'genre.default')).toStrictEqual(getter(personObjMongoose, 'genre.default'));
  expect(getter(personObjMongoose, 'genre.trim')).toStrictEqual(getter(personObjMongoose, 'genre.trim'));
});

test(`@arrayOf(String) awards: string[];`, () => {
  expect(getter(personObjODM, 'awards.type')).toStrictEqual(getter(personObjMongoose, 'awards.type'));
});

test(`@ref('Story', true) stories: ArrayRef<Story>;`, () => {
  expect(getter(personObjODM, 'stories')).toStrictEqual(getter(personObjMongoose, 'stories'));
});
