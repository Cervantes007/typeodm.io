import { Schema } from 'mongoose';
import { metadataKeys, schemaBuilderSymbol, schemaSymbol } from '../utils/metadata.keys';
import { ISchemaOptions } from '../utils/definitions';

export function document(options?: ISchemaOptions) {
  return target => {
    const mongooseSchema = target.prototype[schemaBuilderSymbol];
    if (mongooseSchema) {
      const schema = new Schema(mongooseSchema, options);
      const middlewares = Reflect.getMetadata(metadataKeys.schemaMiddleware, target.prototype);
      if (middlewares) {
        for (const middleware of middlewares) {
          const { name, action, method } = middleware;
          schema[name](action, method);
        }
      }
      const extentions = Reflect.getMetadata(metadataKeys.schemaExtentions, target.prototype);
      if (extentions) {
        for (const extention of extentions) {
          const { name, methodName, method } = extention;
          schema[name][methodName] = method;
        }
      }
      const virtuals = Reflect.getMetadata(metadataKeys.virtuals, target.prototype);
      if (virtuals) {
        for (const item of virtuals) {
          const { propertyName, config } = item;
          config.get && schema.virtual(propertyName).get(config.get);
          config.set && schema.virtual(propertyName).set(config.set);
        }
      }
      target[schemaSymbol] = schema;
    }
  };
}
