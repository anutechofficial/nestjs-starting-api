import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { IntentDto } from './dto/intent.dto';
import { WebhookDto } from './dto/webhook.dto';
import Stripe from 'stripe';


@ApiTags('Payment')
@Controller()
export class StripeController {
  constructor(private stripeService: StripeService) { }
  @Post('/createIntent')
  async createPaymentIntent(@Body() intentDto: IntentDto) {
    return this.stripeService.createIntent(intentDto.amount, intentDto.currency);
  }

  @Post('/webhook')
  async webhook(@Body() body) { 
    return this.stripeService.testwebhook(body);
  }
}