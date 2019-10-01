import {
  document,
  range,
  required,
  isIn,
  arrayOf,
  optional,
  defaultValue,
  trim,
  ArrayRef,
  ref,
  index,
  unique
} from '../src';
import { Schema } from 'mongoose';
import { Story } from './story.document';

// TODO: solve proble with circular dependencies.

const ageMin = 4;
const ageMax = 120;
const levelMin = 1;
const genreEnum = ['F', 'M'];

@document()
export class Person {
  @required()
  @index()
  @unique()
  name: string;

  @range(ageMin, ageMax, { required: true }) age: number;

  @range(levelMin)
  @optional()
  level: number;

  @isIn(genreEnum)
  @defaultValue(genreEnum[0])
  @trim()
  genre: string;

  @arrayOf(String) awards: string[];

  @ref('Story', true) stories: ArrayRef<Story>;
}

export const personSchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  age: { type: Number, min: ageMin, max: ageMax, required: true },
  level: { type: Number, min: levelMin },
  genre: { type: String, enum: genreEnum, default: genreEnum[0], trim: true },
  awards: { type: [String] },
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});
