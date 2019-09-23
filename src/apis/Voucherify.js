const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  apiUrl: process.env.REACT_APP_VOUCHERIFY_URL,
  applicationId: process.env.REACT_APP_VOUCHERIFY_APPLICATION_ID,
  clientSecretKey: process.env.REACT_APP_VOUCHERIFY_SECRET_KEY
});

/**
 * Voucherify Documentation
 *
 * https://docs.voucherify.io/docs
 * https://github.com/rspective/voucherify.js
 */
/**
 * This will list all promo codes
let vouchers = await voucherify.list();
console.log(vouchers);
*/

export const validatePromoCode = async promoCode => {
  try {
    let response = await voucherify.validate(promoCode, {
      // Need to add data to the metadata object for validation purposes
      metadata: {
        storeCode: process.env.REACT_APP_STORE_CODE
      }
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const redeemPromoCode = async promoCode => {
  try {
    let response = await voucherify.redeem(promoCode, {
      metadata: {
        storeCode: process.env.REACT_APP_STORE_CODE
      }
    });
    // response.result = SUCCESS
    // response.voucher holds coupon details, including response.voucher.discount (type and percent_off/amount_off | PERCENT|AMOUNT)
    return response;
  } catch (e) {
    // e.code = 400 (coupon exists, but not valid -- e.message will have details)
    // e.code = 404 (coupon does not exist)
    return e;
  }
  /**
   * @todo Implement the rest of the promo code logic - Need to add to cart, calculate discount and update total price
   *
   * Example Codes for Sandbox
   *   voucherify.io-sandbox-07
   *   voucherify.io-expired
   *   voucherify.io-exceeded
   *   voucherify.io-10-unit-off
   *   voucherify.io-10-percent-off
   *   voucherify.io-10-amount-off
   */
};
