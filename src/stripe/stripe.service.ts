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

    async 
}
