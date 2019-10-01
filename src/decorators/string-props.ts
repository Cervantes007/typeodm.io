import { SchemaTypeOpts } from 'mongoose';
import { decoratorsUseAsPropsTypes } from '../utils/helpers';

export function trim(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ trim: true } });
  };
}

export function lowercase(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ lowercase: true } });
  };
}

export function uppercase(config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ uppercase: true } });
  };
}

export function match(pattern: string, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ match: pattern } });
  };
}

export function length(min: number, max: number = null, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, {
      ...config,
      ...{ ...(min && { minlength: min }), ...(max && { maxlength: max }) },
    });
  };
}
