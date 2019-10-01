import { defineMiddleware } from '../utils/helpers';

export function post(action: string) {
  return (target, methodName) => {
    defineMiddleware(target, methodName, 'post', action);
  };
}

export function pre(action: string) {
  return (target, methodName) => {
    defineMiddleware(target, methodName, 'pre', action);
  };
}
