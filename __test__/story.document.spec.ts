import { getter } from './getter';
import { extractSchema } from '../src';
import { Story, storySchema } from './story.document';

const storyObjODM = extractSchema(Story).obj;
const storyObjMongoose = storySchema.obj;

test('Testing @objectId', () => {
  expect(getter(storyObjODM, '_id.type')).toStrictEqual(getter(storyObjMongoose, '_id.type'));
});

test('Testing @sparse', () => {
  expect(getter(storyObjODM, '_id.sparse')).toStrictEqual(getter(storyObjMongoose, '_id.sparse'));
});

test('Testing @match', () => {
  expect(getter(storyObjODM, 'registerId.match')).toStrictEqual(getter(storyObjMongoose, 'registerId.match'));
});

test('Testing @validate', () => {
  expect(getter(storyObjODM, 'value.validate.msg')).toStrictEqual(getter(storyObjMongoose, 'value.validate.msg'));
  expect(typeof getter(storyObjODM, 'value.validate.validator')).toStrictEqual('function');
});

test('Testing @ref in one-to-many', () => {
  expect(getter(storyObjODM, 'author.type')).toStrictEqual(getter(storyObjMongoose, 'author.type'));
  expect(getter(storyObjODM, 'author.ref')).toStrictEqual(getter(storyObjMongoose, 'author.ref'));
});

test(`@length(:minlength, :maxlength) @uppercase() title: string;`, () => {
  expect(getter(storyObjODM, 'title.minlength')).toStrictEqual(getter(storyObjMongoose, 'title.minlength'));
  expect(getter(storyObjODM, 'title.maxlength')).toStrictEqual(getter(storyObjMongoose, 'title.maxlength'));
  expect(getter(storyObjODM, 'title.uppercase')).toStrictEqual(getter(storyObjMongoose, 'title.uppercase'));
});

test(`@lowercase() @length(:minlength) description: string;`, () => {
  expect(getter(storyObjODM, 'description.type')).toStrictEqual(getter(storyObjMongoose, 'description.type'));
  expect(getter(storyObjODM, 'description.minlength')).toStrictEqual(getter(storyObjMongoose, 'description.minlength'));
  expect(getter(storyObjODM, 'title.lowercase')).toStrictEqual(getter(storyObjMongoose, 'title.lowercase'));
});

test(`@lowercase() @length(:minlength) description: string;`, () => {
  expect(getter(storyObjODM, 'description.type')).toStrictEqual(getter(storyObjMongoose, 'description.type'));
  expect(getter(storyObjODM, 'description.minlength')).toStrictEqual(getter(storyObjMongoose, 'description.minlength'));
  expect(getter(storyObjODM, 'title.lowercase')).toStrictEqual(getter(storyObjMongoose, 'title.lowercase'));
});
