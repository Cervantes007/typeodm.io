import mongoose from 'mongoose';
import { UserModel } from './user.document';

describe('insert', () => {
  let connection;
  const databaseName = 'test';

  beforeAll(async () => {
    const url = process.env.MONGO_URL;
    connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  test(`Testing create and virtuals`, async () => {
    const user = new UserModel();
    user.username = `testUser${Date.now()}`;
    user.password = 'secret123';
    const savedUser = await user.save();
    expect(savedUser.username).toStrictEqual(user.username);
    const usernameUpper = user.username.toUpperCase();
    expect(savedUser.usernameUpper).toStrictEqual(usernameUpper);
  });

  test(`Testing methods`, async () => {
    const user = new UserModel();
    const result = await user.myFindAll({}, ['username -_id']);
    expect(Array.isArray(result)).toBe(true);
  });

  test(`Testing query`, async () => {
    const result = await (UserModel as any).find().byName('testUser1569891966573');
    expect(Array.isArray(result)).toBe(true);
  });

  test(`testing static`, async () => {
    const result = await (UserModel as any).findByName('testUser1569891966573');
    expect(Array.isArray(result)).toBe(true);
  });
});
