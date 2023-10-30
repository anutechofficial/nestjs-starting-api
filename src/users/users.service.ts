import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}

  async create(createUserDto: CreateUserDto) {
      
    const isUserExist=await this.userModel.findOne({$or:[{username:createUserDto.username},{email:createUserDto.email}]});
      
      if (isUserExist){
        if(createUserDto.username==isUserExist.username){
          throw new BadRequestException('username Already Exists!');
        }
        else if( createUserDto.email==isUserExist.email){
          throw new BadRequestException('Email already Exists!');
        }
      }
        const saltOrRounds = 10;
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        createUserDto.password=hash;
        const createdUser= await this.userModel.create(createUserDto);
        return createdUser;   
  }

  async findAll() {
    try{
      const foundUser=await this.userModel.find();
      return `Users Found ${foundUser}`;
    }catch{
      throw new NotFoundException;
    }
  }

   async findById(id:string) {
    try{
      const foundUser=await  this.userModel.findById(id);
      return `User details ${foundUser}`;
    }catch{
     throw new BadRequestException("No User with this Id");
    } 
  }

   async findOne(username:string) {
    const foundUser=await  this.userModel.findOne({username});
    return `User details ${foundUser}`;
  }

   async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const isExist= await this.userModel.findById(id).exec();
      if(isExist){
        const saltOrRounds = 10;
        const password = updateUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        updateUserDto.password=hash;
        const updatedUser=await this.userModel.findByIdAndUpdate(id, updateUserDto);
        return `Updated User ${updatedUser}`;
      }
      throw new BadRequestException("Somthing Went wrong!");
    } catch
    {
      throw new BadRequestException("No User with this id");
    }
  }

  async remove(id:string) {
    try{
      const isUserExist=await this.userModel.findOne({_id:id});
      if(isUserExist){
        const deletedUser=await this.userModel.findByIdAndDelete(id);
        return `Deleted User ${deletedUser}`;
      }
      throw new BadRequestException("Somthing Went wrong!");
    }catch{
      throw new BadRequestException("No User with this Id!");
    }
  }
}
