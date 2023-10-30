import { Injectable, UnauthorizedException,BadRequestException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
constructor(
    @InjectModel(User.name) private userModel:Model<User>,
    private jwtService:JwtService,
    ){}

    async signIn(username:string, pass:string){
        const user = await this.userModel.findOne({username});
         if (!user) {
           throw new BadRequestException("Username not correct!");
          }
    const hash= user.password;
    const isMatch = await bcrypt.compare(pass, hash);
      if(isMatch){
        const payload = { id: user._id, username: user.username };

        return {
         access_token: await this.jwtService.signAsync(payload),
        };
  }
      throw new BadRequestException("Wrong Password!");
  }

    async validateUser(username, password){
        return "";
    }
}
