module.exports = {
	STATUS: ['inactive', 'active'],

	USER_STATUS: ['pending', 'active', 'block'],

	ROLES: ['1111', '2222', '9999'], // 1111: user 2222: shop 9999: admin

	STATUS_CODE_REPONSE: {
		FAILDED: 4000,
		SUCCESSED: 2000,
	},

	SALT_NUMBER: 10,

	HEADER: {
		API_KEY: 'x-api-key',
		AUTHORIZATION: 'authorization',
		REQUEST_ID: 'x-request-id',
		CLIENT_ID: 'x-client-id',
		REFRESH_TOKEN: 'x-refresh-token',
	},

	TEMPLATE_NAME: {
		HTML_EMAIL_SEND_TOKEN: 'HTML_EMAIL_SEND_TOKEN',
		HTML_EMAIL_SEND_TEMPORARY_PASSWORD: 'HTML_EMAIL_SEND_TEMPORARY_PASSWORD',
	},

	PERMISSIONS: ['2222', '3333', '4444', '5555'],

	EXPIRED_TIME: {
		VERIFY_EMAIL: '5m',
		ACCESS_TOKEN: '1m',
		REFRESH_TOKEN: '7d',
	},

	STATUS_REDIS: {
		END: 'end',
		RECONNECT: 'reconnecting',
		ERROR: 'error',
	},

	SIZE: ['S', 'M', 'L', 'XL', 'XXL'],

	RATE_LIMIT_MAX_REQUESTS: 10,
	RATE_LIMIT_WINDOW: 60,
}
