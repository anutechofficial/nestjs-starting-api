import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loggedInUser } from 'src/auth/auth.guard';
import { EmailService } from 'src/email/email.service';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>,
  private jwtService:JwtService,
  private emailService:EmailService,
  ){}

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
        const signupPayload={username:createUserDto.username, email:createUserDto.email};
        //Token to verify later
        const signupToken= await this.jwtService.signAsync(signupPayload);
        //Randon number for OTP
        const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
        createUserDto.otp=random4DigitNumber;
        //Mail configuration
        const mailOptions = {
          from: 'anurag.yadav.henceforth@gmail.com',
          to:createUserDto.email,
          subject:'Verify Your Email',
          text:`Welcome @${createUserDto.username} this is Your Verification OTP: ${random4DigitNumber}`,
        };
        //send otp to mail
        await this.emailService.sendEmail(mailOptions)
        const saltOrRounds = 10;
        //Hash password
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        createUserDto.password=hash;
        //save user data to DB
        const createdUser= await this.userModel.create(createUserDto);
        if(createdUser){
          return {message:"OTP send to your email", token:signupToken,}
          //`OTP Send to your email enter to verify. Token :${signupToken}`
        }
        return "somthing went wrong";   
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
  async verifyOtp(userOtp:number){
    const username=loggedInUser.username;
    const userDetails= await this.userModel.findOne({username})

    if(userDetails.isVerified==false){
      const {otp}=userDetails;
      if(userOtp==otp){
       userDetails.isVerified=true;
        const verifyedUser= await this.userModel.findByIdAndUpdate(userDetails._id,userDetails);
        if(verifyedUser){
          return "Email verifyed Successfully!"
        }
        return "Some Internal problem try later!"
      }
      else{
        return "Double check your otp!"
      }
    }
    else{
      return "Email already verifyed!"
    }
  }
}
