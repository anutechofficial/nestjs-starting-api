import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}

  create(createUserDto: CreateUserDto) {
    const createdUser= this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    const foundUser=await this.userModel.find();
    return `Users Found ${foundUser}`;
  }

   async findOne(id: string) {
    const foundUser=await  this.userModel.findById(id);
    return `User details ${foundUser}`;
  }

   async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser=await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return `Updated User ${updatedUser}`;
  }

  async remove(id: string) {

    const deletedUser=await this.userModel.findByIdAndDelete(id);
    return `Deleted User ${deletedUser}`;
  }
}
