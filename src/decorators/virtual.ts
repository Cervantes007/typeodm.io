import { metadataKeys } from '../utils/metadata.keys';

export function virtual(config: { get?: () => any; set?: (value: any) => boolean }) {
  return (target, propertyName) => {
    const virtuals = Reflect.getMetadata(metadataKeys.virtuals, target) || [];
    virtuals.push({ propertyName, config });
    Reflect.defineMetadata(metadataKeys.virtuals, virtuals, target);
  };
}
