import {
  document,
  ref,
  Ref,
  length,
  uppercase,
  lowercase,
  required,
  index,
  validate,
  objectId,
  sparse,
  alias,
  match
} from '../src';
import { Person } from './person.document';
import { Schema } from 'mongoose';

const titleMinLength = 3;
const titleMaxLength = 250;
const descriptionMinLength = 5;

@document()
export class Story {
  @objectId()
  @sparse()
  @alias('id')
  _id;

  @ref(Person)
  author: Ref<Person>;

  @index()
  @required()
  person: Person;

  @required({ type: Number })
  @validate((value) => value > 5, 'Too cheap story')
  value: number;

  @length(titleMinLength, titleMaxLength)
  @uppercase()
  title: string;

  @lowercase()
  @length(descriptionMinLength)
  description: string;

  @match('^story-')
  @validate((value: string) => value.startsWith('story-'))
  registerId: string
}

export const storySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, sparse: true, alias: 'id' },
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: { type: String, minlength: titleMinLength, maxlength: titleMaxLength, uppercase: true },
  description: { type: String, lowercase: true, minlength: descriptionMinLength },
  value: {type: Number, required: true, validate: {
      validator: (value) => value > 5,
      msg: 'Too cheap story'
    }},
  registerId: {type: String, match: '^story-', validate: {
    validator: (value: string) => value.startsWith('story-')
    }}
});
