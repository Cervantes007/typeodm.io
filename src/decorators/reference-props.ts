import { Schema } from 'mongoose';
import { configProperties } from '../utils/helpers';

export function objectId() {
  return (target, key) => {
    const config = { type: Schema.Types.ObjectId };
    configProperties(target, key, config);
  };
}

export function ref(reference: any, isArray = false) {
  return (target, key) => {
    const config = { type: Schema.Types.ObjectId, ref: typeof reference === 'string' ? reference : reference.name };
    configProperties(target, key, isArray ? [config] : config);
  };
}

// export function arrayRef(reference) {
//   return (target, key) => {
//     configProperties(target, key, [{ type: Schema.Types.ObjectId, ref: reference.name }]);
//   };
// }
