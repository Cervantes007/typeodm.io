import { extendSchema } from '../utils/helpers';

export function method(target, methodName) {
  extendSchema(target, methodName, 'methods');
}

export function query(target, methodName) {
  extendSchema(target, methodName, 'query');
}

export function statics(target, methodName) {
  extendSchema(target, methodName, 'statics');
}
