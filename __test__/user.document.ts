import {required, document, pre, optional, post, virtual, query, statics, getModel, method, unique} from '../src';
import { Schema, Document, Model } from 'mongoose';

@document({ timestamps: true })
export class User {
  @required()
  @unique()
  username: string;

  @required()
  password: string;

  @optional()
  salt: string;

  @pre('save')
  private async encryptPassword(next) {
    next();
  }

  @post('save')
  private async logSaved(doc, next) {
    next();
  }

  @virtual({
    get: function(): string {
      return this.username.toUpperCase();
    },
    set: (value: string) => {
      this.UpperUsername = value;
      return true;
    },
  })
  usernameUpper: string;

  @query
  byName(name: string) {
    return (this as any).where({ username: new RegExp(name, 'i') });
  }

  @statics
  findByName(name: string) {
    return (this as any).find({ username: new RegExp(name, 'i') });
  }

  @method
  myFindAll(query, projection) {
    const model = (this as any).model(User.name);
    return model.find(query, projection);
  }
}

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
  },
  { timestamps: true }
);

userSchema.pre('save', function encryptPassword(next) {
  next();
});

userSchema.post('save', function logSaved(doc, next) {
  next();
});

userSchema.virtual('usernameUpper').get(function() {
  return this.username.toUpperCase();
});

userSchema.virtual('usernameUpper').set(function(value) {
  this.username = value;
  return true;
});

userSchema.query.byName = function(name) {
  return this.where({ username: new RegExp(name, 'i') });
};

userSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};

userSchema.methods.myFindAll = function() {
  return this.model('User').find();
};

export default userSchema;

export const UserModel = getModel<User>(User);
