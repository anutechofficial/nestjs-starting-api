import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';


@Injectable()
export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16"
    });
  }
  async createCustomer(name: string, email: string,) {
    const customer = await this.stripe.customers.create({
      name: name, email: email,
    });
    return customer.id;
  }

  async createPriceId(
    currency: string,
    amount: number,
    produstStripeId: string,

  ) {
    const price = await this.stripe.prices.create({
      unit_amount_decimal: `${amount * 100}`,
      currency: currency,
      product: produstStripeId,
      billing_scheme: 'per_unit',
    });
    return price.id;
  }

  async createProduct(
    productName: string,
    productDescription: string,
    active: boolean,
    productImages: string[]
  ) {
    const product = await this.stripe.products.create({
      name: productName,
      description: productDescription,
      active: active,
      images: productImages
    })
    return product.id;
  }

  async updateProduct(productStripeId: string, stripePriceId: string) {
    const product = await this.stripe.products.update(
      productStripeId,
      { default_price: stripePriceId }
    );
    return product;
  }

  async createAccount(email: string,) {
    const account = await this.stripe.accounts.create({


      type: 'custom',
      country: 'US',
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    console.log('chala');
    return account;
  }
  async creckoutSession(priceId: string, customerStripeId: string, quantity: number) {
    const session = await this.stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      line_items: [
        { price: priceId, quantity: quantity },
      ],
      mode: 'payment',
      cancel_url: 'https://example.com/cancel',
      customer: customerStripeId,
    });
    return session;
  }

  async createIntent(amout: number, currency: string,) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amout,
      currency: currency,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }

  async createBankTok(account_number:string,country:string,currency:string,customerId:string) {
    const token = await this.stripe.tokens.create({
      bank_account: {
        country: country,
        account_number: account_number,
        currency:currency
      },
    });
    console.log(token);
    
    const customerSource = await this.stripe.customers.createSource(
        customerId,
      {
        source: token.id,
      }
    );
    return customerSource;
  }

  async webhook(body: any, sig: string, endpointSecret: string) {
    let event: any;

    try {
      event = this.stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return err;
    }
    switch (event.type) {
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  async testwebhook(body: any) {
    try {

      const payload = {
        id: 'evt_test_webhook',
        object: 'event',
      };

      const payloadString = JSON.stringify(payload, null, 2);
      const secret = process.env.STRIPE_WEBHOOK_SECRET_KEY

      const header = this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });




      let event;

      try {
        const event = this.stripe.webhooks.constructEvent(payloadString, header, secret);
        console.log('event', event);

      } catch (err) {
        console.log('event error', err);

      }
      switch (body.type) {
        case 'payment_intent.amount_capturable_updated':
          const paymentIntentAmountCapturableUpdated = event.data.object;

          // Then define and call a function to handle the event payment_intent.amount_capturable_updated
          break;
        case 'payment_intent.canceled':
          const paymentIntentCanceled = event.data.object;
          // Then define and call a function to handle the event payment_intent.canceled
          break;
        case 'payment_intent.created':
          const paymentIntentCreated = event.data.object;
          console.log('paymentIntentCreated', paymentIntentCreated);

          // Then define and call a function to handle the event payment_intent.created
          break;
        case 'payment_intent.partially_funded':
          const paymentIntentPartiallyFunded = event.data.object;
          // Then define and call a function to handle the event payment_intent.partially_funded
          break;
        case 'payment_intent.payment_failed':
          const paymentIntentPaymentFailed = event.data.object;
          // Then define and call a function to handle the event payment_intent.payment_failed
          break;
        case 'payment_intent.processing':
          const paymentIntentProcessing = event.data.object;
          // Then define and call a function to handle the event payment_intent.processing
          break;
        case 'payment_intent.requires_action':
          const paymentIntentRequiresAction = event.data.object;
          // Then define and call a function to handle the event payment_intent.requires_action
          break;
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          console.log('paymentIntentSucceeded', paymentIntentSucceeded);

          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {

    }

  }
}
