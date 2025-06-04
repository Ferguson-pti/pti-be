export default ({ env }) => ({
    email: {
        config: {
            provider: 'strapi-provider-email-resend',
            providerOptions: {
                apiKey: env('RESEND_API_KEY'), // Required
            },
            settings: {
                defaultFrom: 'Rophi <rophi.chukwu@cyphercrescent.com>',
                defaultReplyTo: 'Rophi <rophi.chukwu@cyphercrescent.com>',
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
