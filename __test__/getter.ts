export const getter = (obj, path: string) => {
  const keys = path.split('.');
  let value = { ...obj };
  for (let key of keys) {
    value = value[key];
  }
  return value;
};
