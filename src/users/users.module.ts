import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema} from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { EmailModule } from 'src/email/email.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema:UserSchema}]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '8h' },
  }),
  EmailModule,
  StripeModule,
  ProductsModule,

],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
