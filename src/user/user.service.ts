import { Injectable} from "@nestjs/common";
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User} from "./user.model";
import { CreateUserDto } from "./user-dto/create-user.dto";
@Injectable()
export class UserService{
        constructor(@InjectModel('User') private userModel: Model<User>,

    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      }

      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
}