import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema }
          ])
    ],
    controllers:[UserController],
    providers:[UserService],
    exports
})
export class UserModule{}