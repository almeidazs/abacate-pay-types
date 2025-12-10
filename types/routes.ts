import type {
	RESTGetCheckQRCodePixStatusQueryParams,
	RESTGetSearchWithdrawQueryParams,
	RESTPostSimulatePaymentQueryParams,
} from './v1/rest';

export const API_BASE_URL = 'https://api.abacatepay.com/';

export const Routes = {
	/**
	 * POST - https://api.abacatepay.com/v1/customer/create
	 */
	createCustomer() {
		return '/customer/create' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/customer/list
	 */
	listCustomers() {
		return '/customer/list' as const;
	},
	/**
	 * POST - https://api.abacatepay.com/v1/billing/create
	 */
	createCharge() {
		return '/billing/create' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/billing/list
	 */
	listCharges() {
		return '/billing/list' as const;
	},
	/**
	 * POST - https://api.abacatepay.com/v1/pixQrCode/create
	 */
	createPIXQRCode() {
		return '/pixQrCode/create' as const;
	},
	/**
	 * POST - https://api.abacatepay.com/v1/pixQrCode/simulate-payment
	 */
	simulatePayment({ id }: RESTPostSimulatePaymentQueryParams) {
		return `/pixQrCode/simulate-payment?id=${id}` as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/pixQrCode/check
	 */
	checkQRCodePIXStatus({ id }: RESTGetCheckQRCodePixStatusQueryParams) {
		return `/pixQrCode/check?id=${id}` as const;
	},
	/**
	 * POST - https://api.abacatepay.com/v1/coupon/create
	 */
	createCoupon() {
		return '/coupon/create' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/coupon/list
	 */
	listCoupons() {
		return '/coupon/list' as const;
	},
	/**
	 * POST - https://api.abacatepay.com/v1/withdraw/create
	 */
	createWithdraw() {
		return '/withdraw/create' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/withdraw/get
	 */
	getWithdraw({ externalId }: RESTGetSearchWithdrawQueryParams) {
		return `/withdraw/get?externalId=${externalId}` as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/withdraw/list
	 */
	listWithdraw() {
		return '/withdraw/list' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/store/get
	 */
	store() {
		return '/store/get' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/public-mrr/mrr
	 */
	getMRR() {
		return '/public-mrr/mrr' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/public-mrr/merchant-info
	 */
	merchant() {
		return '/public-mrr/merchant-info' as const;
	},
	/**
	 * GET - https://api.abacatepay.com/v1/public-mrr/renevue
	 */
	renevue() {
		return '/public-mrr/revenue' as const;
	},
};
