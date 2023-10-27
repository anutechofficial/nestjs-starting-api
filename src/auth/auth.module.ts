import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';


@Module({
  imports:[
  MongooseModule.forFeature([{ name: User.name, schema:UserSchema}]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '8h' },
  }),
UsersModule,
PassportModule,
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {}
