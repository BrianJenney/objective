// const voucherifyClient = require('voucherify');
// const voucherify = voucherifyClient({
//   apiUrl: process.env.REACT_APP_VOUCHERIFY_URL,
//   applicationId: process.env.REACT_APP_VOUCHERIFY_APPLICATION_ID,
//   clientSecretKey: process.env.REACT_APP_VOUCHERIFY_SECRET_KEY
// });

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

// export const validatePromoCode = async promoCode => {
//   try {
//     let response = await voucherify.validate(promoCode, {
//       // Need to add data to the metadata object for validation purposes
//       metadata: {
//       }
//     });
//     return response;
//   } catch (e) {
//     return e;
//   }
// };