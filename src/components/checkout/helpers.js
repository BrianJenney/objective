export const getDefaultEntity = entities => {
  if (!entities) {
    return null;
  }

  return entities.find(entity => !!entity.isDefault);
};
