import { SchemaTypeOpts } from 'mongoose';
import { decoratorsUseAsPropsTypes } from '../utils/helpers';

export function range(min: number, max: number = null, config: SchemaTypeOpts<any> = {}) {
  return (target, key) => {
    decoratorsUseAsPropsTypes(target, key, { ...config, ...{ ...(min && { min }), ...(max && { max }) } });
  };
}
