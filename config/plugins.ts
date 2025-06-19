export default ({ env }) => ({
    email: {
        config: {
            provider: 'strapi-provider-email-resend',
            providerOptions: {
                apiKey: env('RESEND_API_KEY'), // Required
            },
            settings: {
                defaultFrom: `${env('RESEND_NAME')} <${env('RESEND_EMAIL')}>`,
                defaultReplyTo: `${env('RESEND_NAME')} <${env('RESEND_EMAIL')}>`,
            },
        }
    },
    "users-permissions": {
        config: {
            register: {
                allowedFields: [
                    "phone",
                    "affiliation",
                    "nationality",
                    "category",
                    "passcode",
                    "paidAt",
                    "transactionRef",
                    "amountPaid"
                ],
            },
        },
    },
});
