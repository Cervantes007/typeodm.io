import { SchemaTypeOpts } from 'mongoose';
import { configProperties, decoratorsUseAsPropsTypes } from '../utils/helpers';
import { schemaSymbol } from '../utils/metadata.keys';

export function required(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ required: true } });
  };
}

export function unique(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ unique: true } });
  };
}

export function index(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ index: true } });
  };
}

export function alias(alias: string, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ alias } });
  };
}

export function validate(validateFn: (value: any) => boolean, message = '') {
  return (target, key) => {
    const validateProp: any = { validator: validateFn };
    message && (validateProp.msg = message);
    decoratorsUseAsPropsTypes(target, key, { validate: validateProp });
  };
}

export function sparse(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ sparse: true } });
  };
}

export function optional(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, config);
  };
}

export function arrayOf(constructor: any, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    const subSchema = constructor[schemaSymbol];
    configProperties(target, key, { ...config, type: [subSchema || constructor] });
  };
}

export function isIn(args: string[], config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, {
      ...config,
      ...{ enum: args },
    });
  };
}

export function defaultValue(value: any, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, {
      ...config,
      ...{ default: value },
    });
  };
}
