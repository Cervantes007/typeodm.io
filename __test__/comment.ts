import { document, optional, required, length, isIn } from '../src';

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
