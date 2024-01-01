import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { WebhookDto } from './dto/webhook.dto';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_...', );
const endpointSecret = 'whsec_ba0913d27f6574455b3cefc2fd28bb08f9ba794f46a2ffaadbc9b7287959ffa6';
@ApiTags('Payment')
@Controller()
export class StripeController {
  @Post('/webhook')
  async handleWebhook(@Body() body: Buffer, @Res() res): Promise<void> {
    const sig = res.get('stripe-signature');

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
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

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
  }
}
