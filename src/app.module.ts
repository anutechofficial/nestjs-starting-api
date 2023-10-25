import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';


@Module({
  imports: [ProductModule,UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestUser')],
  controllers: [AppController,UserController],
  providers: [AppService, UserService],
  exports
})
export class AppModule {}
