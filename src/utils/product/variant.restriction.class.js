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
      let state = data.state;
      return restrictions.values.includes(state);
    }
  
    /*
     * @description - Validates a collection of product variants
     * @param {Object} data - Comparison data
     * @param {String} identifer - The key/identifier that returns the item value upon validation
     * @return {Object} - An object of restricted items are returned, if any
     */
  
    validate(data, identifier = 'id') {
      let restrictions = { hasRestrictions: false, items: [] };
      this.items.forEach(item => {
        if (item.restrictions) {
          let restrictionDefinitions = item.restrictions.definitions;
          restrictionDefinitions.forEach(definition => {
            if (
              item.restrictions[definition] &&
              this['restriction.definition.' + definition]
            ) {
              let restrictionCheckResult = this[
                'restriction.definition.' + definition
              ](item.restrictions[definition], data);
              if (restrictionCheckResult) {
                restrictions.hasRestrictions = true;
                restrictions.items.push({
                  definition: definition,  
                  restrictions: item.restrictions[definition],
                  item: item[identifier]
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