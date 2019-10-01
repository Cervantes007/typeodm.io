# type-odm ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/type-odm.svg?branch=master)](https://travis-ci.org/Cervantes007/type-odm) [![codecov](https://codecov.io/gh/Cervantes007/type-odm/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/type-odm)

Improve typescript experience using <a href="https://mongoosejs.com" >mongoose</a>  with decorators.

## Features

- `typescript` first class support.
- Build your entire documents with decorators.
- Fully tested (unit and integration test for every line of code).
- Easy to use.
- Nothing new to learn (It's just <a href="https://mongoosejs.com" >mongoose</a> in a decorator way)

## Installation

`npm install type-odm --save`

#### Requirements
Dependencies

`npm install metadata mongoose @types/mongoose --save`

Remember enable decorators in tsconfig.json

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Getting Started
defining simple 'User' document and export model
```typescript
/* user.document.ts */
@document()
export class User {
    @required() username: string;
    @required() password: string;
    @optional() rol: string;
}

export const UserModel = new getModel<User>(User);
```

using UserModel
```typescript
/* Somewhere in your code, basic CRUD operations */

// Get List
UserModel.find();

// Get one
UserModel.findOne();
UserModel.findById(id);

// Save
const user = new UserModel({username: 'charlie', password: 'asd!@#$'});
user.save();

// Update
UserModel.findByIdAndUpdate(id, {username: 'charlie 2'})

// Remove
UserModel.findByIdAndRemove(id)
```
You can find more useful functions for 'UserModel' <a href="https://mongoosejs.com/docs/queries.html" >here</a>




## Document
- [x] `@document`

## Schema Types:

##### All Schema Types
- [x] `@objectId`
- [x] `@required`
- [x] `@optional`
- [x] `@defaultValue` (alias for `default`)
- [x] `@validate`
- [x] `@alias`

##### Indexes
- [x] `@unique`
- [x] `@index`
- [x] `@spare`

##### String
- [x] `@lowercase`
- [x] `@uppercase`
- [x] `@trim`
- [x] `@match`
- [x] `@isIn` (alias for `enum`)
- [x] `@length` (includes `minlength` and `maxlength` ex. `@length(3, 50)`)

##### Number
- [x] `@range` (includes `min` and `max`)

##### Date
- [x] `@range` (includes `min` and `max`)

## Schema

- [x] `@methods`
- [x] `@virtuals`
- [x] `@query` (Not have type support yet, but works fine)
- [x] `@statics` (Not have type support yet, but works fine)


## Use case Post-Comment
A comment only exists and belong to one post, therefore it must be saved as a subdocument, hasn't sense to create a collection to store comments. Example: 
```typescript
@document()
export class Comment {
  // define 'message' property required and set rule minlength(2)
  @required()
  @length(2)
  message: string;

  // define 'author' property optional
  @optional()
  author: string;

  // define 'status' propery to be 'pending' or 'approved'
  @isIn(['pending', 'approved'])
  status: string;
}
```

```typescript
@document()
export class Post {
   // define 'title' as a required property
  @required()
  title: string;

  // define 'content' as property, and set minlength(5) and maxlength(2000) values
  @length(5, 2000)
  content: string;

  // define 'rating' property, with range [1-5]
  @range(1, 5)
  rating: number;

  // define 'comments' property to be a subdocument array of Comment
  @arrayOf(Comment)
  comments: Comment[];
}
```

## Todo:
- [ ] find a way to set correct types for `@query` and `@statics`
- [ ] add `@plugin` decorator
- [ ] improve api doc
- [ ] improve use-case examples






