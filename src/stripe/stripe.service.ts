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
        currency:string,
        amount:number,
        produstStripeId:string,

        ){
            const price = await this.stripe.prices.create({
                unit_amount_decimal:`${amount*100}`,
                currency: currency,
                product: produstStripeId,
                billing_scheme:'per_unit',
              });
              return price.id;
    }

    async createProduct(
        productName:string,
        productDescription:string,
        active:boolean, 
        productImages:string[]
        ){
            const product = await this.stripe.products.create({
                name: productName,
                description:productDescription,
                active:active,
                images:productImages
              })
        return product.id;
    }

    async updateProduct(productStripeId:string,stripePriceId:string){
        const product = await this.stripe.products.update(
            productStripeId,
            {default_price:stripePriceId}
          );
            return product;
    }
}
