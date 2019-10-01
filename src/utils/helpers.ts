import 'reflect-metadata';
import mongoose, { Document, Model } from 'mongoose';
import { metadataKeys, schemaBuilderSymbol, schemaSymbol } from './metadata.keys';

export function getTypeModel<T extends Document>(target: any): Model<T & Document> {
  return mongoose.connection.model(target.name, extractSchema(target));
}

export function getModel<T>(target: any) {
  return getTypeModel<T & Document>(target);
}

// export function getModel<T extends Document, U extends Model<T>>(target: any): U {
//   return mongoose.connection.model<T, U>(target.name, extractSchema(target));
// }

export const extractSchema = schema => schema[schemaSymbol];

export function defineMiddleware(target, methodName, name: string, action: string) {
  let middlewares = Reflect.getMetadata(metadataKeys.schemaMiddleware, target);
  if (!middlewares) {
    middlewares = [];
  }
  const middleware = { name, action, method: target[methodName] };
  middlewares.push(middleware);
  Reflect.defineMetadata(metadataKeys.schemaMiddleware, middlewares, target);
}

export function extendSchema(target, methodName, name: string) {
  let extentions = Reflect.getMetadata(metadataKeys.schemaExtentions, target);
  if (!extentions) {
    extentions = [];
  }
  const extention = { name, methodName, method: target[methodName] };
  extentions.push(extention);
  Reflect.defineMetadata(metadataKeys.schemaExtentions, extentions, target);
}

export const decoratorsUseAsPropsTypes = (target, key, config) => {
  let fullConfig = config;
  if (!config.type) {
    const type = Reflect.getMetadata(metadataKeys.property, target, key);
    const subSchema = type[schemaSymbol];
    fullConfig = { ...config, type: subSchema ? subSchema : type };
  }
  configProperties(target, key, fullConfig);
};

export const configProperties = (target, key, config) => {
  if (!target[schemaBuilderSymbol]) {
    target[schemaBuilderSymbol] = {};
  }
  target[schemaBuilderSymbol][key] = Array.isArray(config)
    ? config
    : { ...(target[schemaBuilderSymbol][key] || {}), ...config };
};
