# typeodm.io ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/typeodm.io.svg?branch=master)](https://travis-ci.org/Cervantes007/typeodm.io) [![codecov](https://codecov.io/gh/Cervantes007/typeodm.io/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/typeodm.io)

Improve your [mongoose](https://mongoosejs.com) experience by using TypeScript with decorators.

## Features

- First-class TypeScript support.
- Build your entire documents with decorators.
- Full test coverage (unit and integration tests for every line of code).
- Easy to use.
- Nothing new to learn (it's just [mongoose](https://mongoosejs.com) with [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html))

## Installation

`npm install typeodm.io --save`

#### Requirements

Dependencies

`npm install metadata mongoose @types/mongoose --save`

Remember to enable decorators in `tsconfig.json`:

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Getting Started

Define a simple `User` document and export the model:

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

You can now use `UserModel`:

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

You can find more useful functions for 'UserModel' in the [mongoose queries](https://mongoosejs.com/docs/queries.html) documentation.

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
- [x] `@query` (No type support yet, but works fine)
- [x] `@statics` (No type support yet, but works fine)

## Use case: Post with Comments

A comment only exists and belong to one post, therefore it must be saved as a subdocument (it doesn't make sense to create a collection to store comments). Example:

```typescript
@document()
export class Comment {
  // define the 'message' property as required and set rule minlength(2)
  @required()
  @length(2)
  message: string;

  // define the 'author' property as optional
  @optional()
  author: string;

  // define the 'status' propery to be 'pending' or 'approved'
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

## Use case: User and Todos

In almost all applications, resources belong to users. In this, we have `User` and `Todo` documents, where each `Todo` belongs to a user, via a [ref](https://mongoosejs.com/docs/populate.html).

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

Here's how to get a `Todo` list with the user data populated. We'll use a `populate` query to populate the field `Todo.user` with a User objecct, and project only the `username` field (so the query will return only `User._id` and `User.username`):

```typescript
const todos = await TodoModel.find().populate('user', 'username');
```

Now let's see how to save a `Todo` for a `User` we may create, or obtain from the database or an HTTP request.

```typescript
// getting user by creating a new one
const userToSave = new UserModel({ username: 'charlie', password: 'asd!@#$' });
const user = await userToSave.save();

// getting user from a database query
const user = await UserModel.find({ username: 'charlie' });

// getting user from HTTP request
const user = req.user;

// after making sure we have `user._id` form some source, we can save a `Todo` for this user as follows:
const todoToSave = new TodoModel({ title: 'Go to the market for some oranges' });
todoToSave.user = user._id;
const todo = await todoToSave.save();

// in some case you don't now if user._id is an instance of ObjectId; to make sure, run:
const userId = new ObjectId(user._id);
```

## API

### @document

You must annotate a class with `@document` in order to use it as a mongoose schema and to extract a model from it.

`@document(config: SchemaOptions)` you can pass a [SchemaOptions](https://mongoosejs.com/docs/guide.html#options) object as parameter.

## Todo:

- [ ] find a way to set correct types for `@query` and `@statics`
- [ ] add `@plugin` decorator
- [ ] improve api doc
- [ ] improve use-case examples
