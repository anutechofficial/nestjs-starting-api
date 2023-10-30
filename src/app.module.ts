import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { EmailModule } from './email/email.module';




@Module({
  imports: [ MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestUserDatabase'), UsersModule, AuthModule, ProductsModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
