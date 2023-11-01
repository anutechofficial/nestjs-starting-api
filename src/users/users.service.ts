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
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>,
  private productService:ProductsService,
  private jwtService:JwtService,
  private emailService:EmailService,
  private stripeService:StripeService,
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
        //Randon number for OTP
        const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
        createUserDto.otp=random4DigitNumber;
        //Mail configuration
        const mailOptions = {
          from: process.env.OUR_EMAIL,
          to:createUserDto.email,
          subject:'Verify Your Email',
          text:`Welcome @${createUserDto.username} this is Your Verification OTP: ${random4DigitNumber}`,
        };
        //Hash password
        const saltOrRounds = 10;
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        createUserDto.password=hash;
        //Create Stripe Customer id
        const userStripeId= await this.stripeService.createCustomer(createUserDto.name,createUserDto.email);
        createUserDto.userStripeId=userStripeId;
        //send otp to mail
        const isMailSend= await this.emailService.sendEmail(mailOptions)
        //Create customer account
        //save user data to DB
        const createdUser= await this.userModel.create(createUserDto);
        //Token to verify later
        const signupPayload={username:createUserDto.username, email:createUserDto.email};
        const signupToken= await this.jwtService.signAsync(signupPayload);
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

   async findLoggedInProfile(username:string) {
    try{
      const foundUser=await  this.userModel.findOne({username});
      return {
        Name:foundUser.name,
        Username:foundUser.username,
        EmailId:foundUser.email,
        EmailVerified:foundUser.isVerified,
      };
    }catch{
      return "Somthing went wrong!"
    }
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
        return "Some internal problem try later!"
      }
      else{
        return "Double check your otp!"
      }
    }
    else{
      return "Email already verifyed!"
    }
  }

  async changePwd(username:string){
    try{ 
      const isUser= await this.userModel.findOne({username});
      if(isUser){
      const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
      isUser.otp=random4DigitNumber;
      await this.userModel.findOneAndUpdate({username},isUser);
      const forgotpayload={username:username, email:isUser.email}
      const forgotToken= await this.jwtService.signAsync(forgotpayload);
      const mailOptions = {
        from: process.env.OUR_EMAIL,
        to:isUser.email,
        subject:'Reset Your Password',
        text:`Hello @${username} this is Your Verification OTP to Reset Password: ${random4DigitNumber}`,
      };
      await this.emailService.sendEmail(mailOptions);
      return {message:'OTP send to Your Registered Email ID Verify and Enter New Password',Token:forgotToken};
    }
    else{
        return `@${username} Not Found Enter correct @username`
    }
    }catch{
      return "Somthing Went wrong!";
    }
  }

  async enterNewPwd(otp:number,password:string){
    const {username}=loggedInUser;
    const loggedUser= await this.userModel.findOne({username});
    if(loggedUser.otp==otp){
      const saltOrRounds=10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      loggedUser.password=hash;
      await this.userModel.findOneAndUpdate({username},loggedUser);
      return "Password Updated Succesfully!"
    }
    else{
      return "Double Check Your OTP!"
    }
  }

  async verifyUnverifiedEmail(){
    const username= loggedInUser.username;
    const userDetails=await this.userModel.findOne({username}).exec();
    if(userDetails.isVerified==true){
      throw new  BadRequestException('You are already verified!');
    }
    try{
      const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
      userDetails.otp=random4DigitNumber;
      await this.userModel.findOneAndUpdate({username},userDetails);
      const mailOptions = {
        from: process.env.OUR_EMAIL,
        to:userDetails.email,
        subject:'Verify your Email',
        text:`Hello @${username} this is Your Verification OTP to Verify Email: ${random4DigitNumber}`,
      };
      await this.emailService.sendEmail(mailOptions);
      return "Enter OTP to verify Email!"
    }catch{
      return "Somthing Went Wrong!"
    }
  }

  async createStripeAccount(email=loggedInUser.email){
      const account = await this.stripeService.createAccount(email);
      console.log(email);
      return account;
  }

  async byProduct(productId:number,quantity:number){
      const username=loggedInUser.username;
      const userDetails= await this.userModel.findOne({username});
      if(userDetails){
        const {userStripeId}=userDetails;
        const productPriceId= await this.productService.findPriceIdByProductId(productId);
        if(productPriceId){
          const checkoutSession= await this.stripeService.creckoutSession(productPriceId,userStripeId,quantity);
          return checkoutSession.url;
        }
        else{
          return "Product Not found!"
        }
      }
      return 'There are some issue try login again!'
  }
}
