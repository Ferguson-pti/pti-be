export default ({ env }) => ({
    email: {
        config: {
            provider: "strapi-provider-email-resend",
            providerOptions: {
                apiKey: env("RESEND_API_KEY"), // Required
            },
            settings: {
                defaultFrom: `ICHST 2025 <support@ichst.com>`,
                defaultReplyTo: `ICHST 2025 <support@ichst.com>`,
            },
        },
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
