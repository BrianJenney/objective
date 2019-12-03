/*
 * @description - Parses restrictions for a collection of product variants
 * @param {Array} items - A collection of product variant
 */

class VariantRestrictions {
  constructor(items) {
    this.items = items;
  }

  /*
   * @description - Validates a location.state restriction definition
   * @param {Object} restrictions - Restriction data
   * @param {Object} data - The comparison data
   * @return {Boolean} - Returns whether or not the comparison data is restricted
   */

  ['restriction.definition.location.state'](restrictions, data) {
    const { state } = data;
    return restrictions.values.includes(state);
  }

  /*
   * @description - Validates a collection of product variants
   * @param {Object} data - Comparison data
   * @param {String} identifer - The key/identifier that returns the item value upon validation
   * @param {String} description - The key/identifier that returns the item value upon validation
   * @return {Object} - An object of restricted items are returned, if any
   */

  validate(data, identifier = 'id', description = 'name') {
    const restrictions = { hasRestrictions: false, items: [] };
    this.items.forEach((item, ind) => {
      if (item.restrictions) {
        const restrictionDefinitions = item.restrictions.definitions;
        restrictionDefinitions.forEach(definition => {
          if (
            item.restrictions[definition] &&
            this[`restriction.definition.${definition}`]
          ) {
            const restrictionCheckResult = this[
              `restriction.definition.${definition}`
            ](item.restrictions[definition], data);
            if (restrictionCheckResult) {
              restrictions.hasRestrictions = true;
              restrictions.items.push({
                definition,
                restrictions: item.restrictions[definition],
                item: item[identifier],
                item_name: item[description],
                key: ind
              });
            }
          }
        });
      }
    });

    return restrictions;
  }
}

export default VariantRestrictions;
