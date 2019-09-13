import { pick, pickBy, identity } from 'lodash';

export const getInitialValues = (baseValues, defaultValues) => ({
  ...baseValues,
  ...pickBy(pick(defaultValues, Object.keys(baseValues)), identity)
});

export const getDefaultEntity = entities => {
  if (!entities) {
    return null;
  }

  return entities.find(entity => !!entity.isDefault);
};
