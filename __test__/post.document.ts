import {document, required, length, range, arrayOf} from '../src';

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
