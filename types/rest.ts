import type {
	APICharge,
	APICoupon,
	APICustomer,
	APIStore,
	APIWithdraw,
	CouponDiscountKind,
	PaymentFrequency,
	PaymentMethod,
} from '.';

/**
 * https://api.abacatepay.com/v1/customer/create
 *
 * @reference https://docs.abacatepay.com/pages/client/create
 */
export type RESTPostCreateClientBody = APICustomer['metadata'];

/**
 * https://api.abacatepay.com/v1/billing/create
 *
 * @reference https://docs.abacatepay.com/pages/payment/create
 */
export interface RESTPostCreateNewChargeBody {
	/**
	 * Payment methods that will be used. Currently, only `PIX` is supported, `CARD` is in beta.
	 *
	 * @see {@link PaymentMethod}
	 */
	methods: PaymentMethod[];
	/**
	 * Defines the type of billing frequency. For one-time charges, use `ONE_TIME`. For charges that can be paid more than once, use `MULTIPLE_PAYMENTS`.
	 *
	 * @see {@link PaymentFrequency}
	 */
	frequency: PaymentFrequency;
	/**
	 * List of products your customer is paying for.
	 */
	products: {
		/**
		 * The product id on your system. We use this id to create your product on AbacatePay automatically, so make sure your id is unique.
		 *
		 * @example "prod-1234"
		 */
		externalId: string;
		/**
		 * Product name.
		 *
		 * @example "Assinatura de Programa Fitness"
		 */
		name: string;
		/**
		 * Quantity of product being purchased.
		 *
		 * @example 2
		 */
		quantity: number;
		/**
		 * Price per unit of product in cents. The minimum is 100 (1 BRL).
		 */
		price: number;
		/**
		 * Detailed product description.
		 */
		description?: string;
	}[];
	/**
	 * URL to redirect the customer if they click on the "Back" option.
	 */
	returnUrl: string;
	/**
	 * URL to redirect the customer when payment is completed.
	 */
	completionUrl: string;
	/**
	 * The ID of a customer already registered in your store.
	 */
	customerId?: string;
	/**
	 * /**
	 * Your customer's data to create it.
	 * The customer object is not mandatory, but when entering any `customer` information, all `name`, `cellphone`, `email` and `taxId` fields are mandatory.
	 */
	customer?: APICustomer['metadata'];
	/**
	 * If true coupons can be used in billing.
	 *
	 * @default false
	 */
	allowCoupons?: boolean;
	/**
	 * List of coupons available for resem used with billing (0-50 max.).
	 */
	coupons?: string[];
	/**
	 * If you have a unique identifier for your billing application, completely optional.
	 */
	externalId?: string;
	/**
	 * Optional billing metadata.
	 */
	metadata?: Record<string, unknown>;
}

/**
 * https://api.abacatepay.com/v1/pixQrCode/create
 *
 * @reference https://docs.abacatepay.com/pages/pix-qrcode/create
 */
export interface RESTPostCreateQRCodePixBody
	extends Pick<RESTPostCreateNewChargeBody, 'customer' | 'metadata'> {
	/**
	 * Charge amount in cents.
	 */
	amount: number;
	/**
	 * Billing expiration time in seconds.
	 */
	expiresIn?: number;
	/**
	 * Message that will appear when paying the PIX.
	 */
	description?: string;
}

/**
 * https://api.abacatepay.com/v1/pixQrCode/simulate-payment
 *
 * @reference https://docs.abacatepay.com/pages/pix-qrcode/simulate-payment
 */
export interface RESTPostSimulatePaymentBody {
	/**
	 * QRCode Pix ID.
	 */
	id: string;
}

/**
 * https://api.abacatepay.com/v1/pixQrCode/check
 *
 * @reference https://docs.abacatepay.com/pages/pix-qrcode/check
 */
export interface RESTGetCheckQRCodePixStatusQueryParams {
	/**
	 * QRCode Pix ID.
	 */
	id: string;
}

/**
 * https://api.abacatepay.com/v1/billing/list
 *
 * @reference https://docs.abacatepay.com/pages/payment/list
 */
export interface RESTGetListBillingsData {
	/**
	 * Array of charges.
	 */
	data: APICharge[];
}

/**
 * https://api.abacatepay.com/v1/customer/list
 *
 * @reference https://docs.abacatepay.com/pages/client/list
 */
export interface RESTGetListCustomersData {
	/**
	 * Array of customers.
	 */
	data: APICustomer[];
}

/**
 * https://api.abacatepay.com/v1/coupon/create
 *
 * @reference https://docs.abacatepay.com/pages/coupon/create
 */
export interface RESTPostCreateCouponBody {
	/**
	 * Coupon data.
	 */
	data: {
		/**
		 * Unique coupon identifier.
		 *
		 * @example "DEYVIN_20"
		 */
		code: string;
		/**
		 * Type of discount applied, percentage or fixed.
		 */
		discountKind: CouponDiscountKind;
		/**
		 * Coupon description
		 */
		notes?: string;
		/**
		 * Number of times the coupon can be redeemed. -1 means this coupon can be redeemed without limits.
		 *
		 * @default -1
		 */
		maxRedeems?: number;
		/**
		 * Key value object for coupon metadata.
		 */
		metadata?: Record<string, unknown>;
	};
}

/**
 * https://api.abacatepay.com/v1/withdraw/create
 *
 * @reference https://docs.abacatepay.com/pages/withdraw/create
 */
export interface RESTPostCreateNewWithdrawBody {
	/**
	 * Unique identifier of the withdrawal in your system.
	 */
	externalId: string;
	/**
	 * Withdrawal method available.
	 */
	method: 'PIX';
	/**
	 * Withdrawal value in cents (Min 350).
	 */
	amount: number;
	/**
	 * PIX key data to receive the withdrawal.
	 */
	pix: {
		/**
		 * PIX key type.
		 */
		type: 'CPF' | 'CNPJ' | 'PHONE' | 'EMAIL' | 'RANDOM' | 'BR_CODE';
		/**
		 * PIX key value.
		 */
		key: string;
	};
	/**
	 * Optional description of the withdrawal.
	 */
	description?: string;
}

/**
 * https://api.abacatepay.com/v1/withdraw/get
 *
 * @reference https://docs.abacatepay.com/pages/withdraw/get
 */
export interface RESTGetSearchWithdrawQueryParams {
	/**
	 * Unique identifier of the withdrawal in your system.
	 */
	externalId: string;
}

/**
 * https://api.abacatepay.com/v1/public-mrr/revenue
 *
 * @reference https://docs.abacatepay.com/pages/trustMRR/list
 */
export interface RESTGetRevenueByPeriodQueryParams {
	/**
	 * Period start date (YYYY-MM-DD format).
	 */
	startDate: string;
	/**
	 * Period end date (YYYY-MM-DD format).
	 */
	endDate: string;
}

/**
 * https://api.abacatepay.com/v1/public-mrr/merchant-info
 *
 * @reference https://docs.abacatepay.com/pages/trustMRR/get
 */
export interface RESTGetMerchantData {
	/**
	 * Merchant data.
	 */
	data: {
		/**
		 * Store name.
		 */
		name: string;
		/**
		 * Store website.
		 */
		website: string;
		/**
		 * Store creation date.
		 */
		createdAt: string;
	};
}

/**
 * https://api.abacatepay.com/v1/public-mrr/mrr
 *
 * @reference https://docs.abacatepay.com/pages/trustMRR/mrr
 */
export interface RESTGetMRRData {
	/**
	 * MMR data.
	 */
	data: {
		/**
		 * Monthly recurring revenue in cents. Value 0 indicates that there is no recurring revenue at the moment.
		 */
		mrr: number;
		/**
		 * Total active subscriptions. Value 0 indicates that there are no currently active subscriptions.
		 */
		totalActiveSubscriptions: number;
	};
}

/**
 * https://api.abacatepay.com/v1/store/get
 *
 * @reference https://docs.abacatepay.com/pages/store/get
 */
export interface RESTGetStoreDetailsData {
	/**
	 * Store data.
	 */
	data: APIStore;
}

/**
 * https://api.abacatepay.com/v1/withdraw/list
 *
 * @reference https://docs.abacatepay.com/pages/withdraw/list
 */
export interface RESTGetListWithdrawsData {
	/**
	 * Array of data.
	 */
	data: APIWithdraw[];
}

/**
 * https://api.abacatepay.com/v1/coupon/list
 *
 * @reference https://docs.abacatepay.com/pages/coupon/list
 */
export interface RESTGetListCouponsData {
	/**
	 * Array of coupons.
	 */
	data: APICoupon[];
}
