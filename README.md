# typeodm.io ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/typeodm.io.svg?branch=master)](https://travis-ci.org/Cervantes007/typeodm.io) [![codecov](https://codecov.io/gh/Cervantes007/typeodm.io/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/typeodm.io)

Improve typescript experience using <a href="https://mongoosejs.com" >mongoose</a> with decorators.

## Features

- `typescript` first class support.
- Build your entire documents with decorators.
- Fully tested (unit and integration test for every line of code).
- Easy to use.
- Nothing new to learn (It's just <a href="https://mongoosejs.com" >mongoose</a> in a decorator way)

## Installation

`npm install typeodm.io --save`

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
UserModel.findOne({ username: 'charlie' });
UserModel.findById(id);

// Save
const user = new UserModel({ username: 'charlie', password: 'asd!@#$' });
user.save();

// Update
UserModel.findByIdAndUpdate(id, { username: 'charlie 2' });

// Remove
UserModel.findByIdAndRemove(id);
```

You can find more useful functions for 'UserModel' <a href="https://mongoosejs.com/docs/queries.html" >here</a>

## Core:

- [x] [@document](#document)

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
- [x] `@sparse`

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

## Use case User-Todo

In almost all applications the resource are store by user,
in this case we'll see how to create documents 'User' and 'Todo' where each 'Todo' belong to a user.

```typescript
@document()
export class User {
  @required() username: string;
  @required() password: string;
}
```

```typescript
@document()
export class Todo {
  @required()
  title: string;

  @defaultValue(false)
  isComplete: boolean;

  @ref(User)
  user: Ref<User>;
}

export const TodoModel = getModel<Todo>(Todo);
```

Getting a `Todo` list with the user data populated.
Using populate `query` to property 'Todo.user' and projection `username` to return only `User._id` and `User.username`

```typescript
const todos = await TodoModel.find().populate('user', 'username');
```

Now will see how to save a `Todo`

```typescript
// getting user by creating a new one
const userToSave = new UserModel({ username: 'charlie', password: 'asd!@#$' });
const user = await userToSave.save();

// getting user by data base query
const user = await UserModel.find({ username: 'charlie' });

// getting user from request after jwt put it there
const user = req.user;

// after getting the `user._id` no matter what source you can save a `Todo` for this user in the following way:
const todoToSave = new TodoModel({ title: 'Go to market for some oranges' });
todoToSave.user = user._id;
const todo = await todoToSave.save();

// in some case you don't now if user._id if an instance of ObjectId, to be sure do:
const userId = new ObjectId(user._id);
```

## API

### @document

You must annotate a class with `@document` in order to use is as mongoose schema and to can extract a model from it.

`@document(config: SchemaOptions)` you can pass a <a href="https://mongoosejs.com/docs/guide.html#options">SchemaOptions</a> object as parameter.

## Todo:

- [ ] find a way to set correct types for `@query` and `@statics`
- [ ] add `@plugin` decorator
- [ ] improve api doc
- [ ] improve use-case examples
