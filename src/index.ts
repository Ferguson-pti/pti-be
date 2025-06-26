import type { Core } from '@strapi/strapi';
import { readFile } from 'fs/promises';
import { join } from 'path';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      async afterCreate(event) {
        const { data, where, select, populate } = event.params;

        if (event.model.uid!=="plugin::users-permissions.user") return
        
        const email_template = await readFile( join(__dirname, '..', '..', 'email_templates', 'account_creation.html' ), { encoding: 'utf-8' })

        //console.log(event)
        //console.log(event.params.data)
        const { category, username, email, passcode, amountPaid } = event.params.data

        //console.log(category, username, email, passcode, amountPaid)
        //console.log(`${process.env.RESEND_NAME} <${process.env.RESEND_EMAIL}>`)
        const formatted_template = email_template
          .replace(/{{ category }}/g, category)
          .replace('{{ name }}', username)
          .replace('{{ price }}', amountPaid)
          .replace('{{ email }}', email)
          .replace('{{ password }}', passcode)

        //console.log(formatted_template)
        try {
          await strapi.plugins['email'].services.email.send({
            to: email,
            from: `ICHST 2025 <support@ichst.com>`,//already set in the config/plugins.ts file
            subject: 'Payment Received for ICHST ticket.',
            html: 'Just a string'//formatted_template,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`Failed to send email: ${error.message}`);
        }
      },
    });
  },
};
