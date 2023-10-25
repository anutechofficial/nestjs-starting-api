import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [ProductModule,UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestUser')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
